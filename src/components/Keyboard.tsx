import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { useButtonDimensions } from "../hooks/useButtonDimensions.js";
import { useKeyboard } from "../hooks/useKeyboard.js";
import { useKeyboardActions } from "../hooks/useKeyboardActions.js";
import { useLongPress } from "../hooks/useLongPress.js";
import { KEYBOARD_LAYOUTS } from "../layouts/index.js";
import type { KeyboardLayout, KeyboardTheme } from "../types/index.js";
import {
	buttonStyle,
	getHorizontalPadding,
	getKeyFlex,
	getKeyFontSize,
	getKeyLabel,
	getSpecialKeyStyles,
	isIconButton,
	isSpecialKey,
	keyboardStyle,
	renderIconButton,
	rowStyle,
} from "../utils/index.js";

export const Keyboard = ({
	theme,
	layout,
}: {
	theme: KeyboardTheme;
	layout: KeyboardLayout;
}) => {
	const keyboardRef = useRef<HTMLDivElement>(null);

	const keyboardRows = KEYBOARD_LAYOUTS[layout].main;
	const keyboardRowsSpecial = KEYBOARD_LAYOUTS[layout].special;
	const keyboardRowsEmoji = KEYBOARD_LAYOUTS[layout].emoji;

	const {
		isVisible,
		getOnSubmit,
		closeKeyboard,
		activeInputId,
		getValue,
		setValue,
	} = useKeyboard();

	const {
		executeKeyAction,
		isShiftActive,
		isCapsActive,
		isSpecialActive,
		isEmojiActive,
	} = useKeyboardActions({
		keyboard: {
			isVisible,
			activeInputId,
			getValue,
			setValue,
			getOnSubmit,
			closeKeyboard,
		},
	});

	const { start: startLongPress, stop: stopLongPress } =
		useLongPress(executeKeyAction);

	const buttonDimensions = useButtonDimensions(keyboardRows);
	const gap = buttonDimensions.gap;

	const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const longPressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);

	const specialKeyStyles = useMemo(
		() =>
			getSpecialKeyStyles({
				theme,
				isShiftActive,
				isCapsActive,
				isSpecialActive,
			}),
		[theme, isShiftActive, isCapsActive, isSpecialActive],
	);
	const renderKey = (
		key: string,
		idx: number,
		overrideStyle: React.CSSProperties = {},
	) => {
		const baseStyle = isSpecialKey(key)
			? specialKeyStyles[key as keyof typeof specialKeyStyles]
			: {
					backgroundColor: theme.colors.primary,
					color: theme.colors.text,
				};

		const flexGrow = getKeyFlex(key);

		const minWidth = Math.max(32, buttonDimensions.width * 0.8);
		const maxWidth = buttonDimensions.width * 1.2;
		const height = Math.max(36, buttonDimensions.height * 0.9);
		const isSpace = key === "SPACE";

		const baseFontSize = Math.min(
			buttonDimensions.width / 3,
			buttonDimensions.height / 2,
		);

		const fontSize = getKeyFontSize(key, baseFontSize);

		const horizontalPadding = getHorizontalPadding(buttonDimensions.width);

		const eventProps: React.ButtonHTMLAttributes<HTMLButtonElement> =
			key === "DELETE"
				? {
						onPointerDown: () => startLongPress(key),
						onPointerUp: stopLongPress,
						onPointerCancel: stopLongPress,
						onPointerLeave: stopLongPress,
					}
				: { onClick: () => executeKeyAction(key) };

		return (
			<button
				key={`${key}-${idx}`}
				{...eventProps}
				disabled={key === "SHIFT" && isCapsActive}
				className="font-bold transition-all active:scale-95 rounded-lg flex items-center justify-center whitespace-nowrap"
				style={buttonStyle({
					flexGrow,
					minWidth,
					maxWidth,
					height,
					fontSize,
					horizontalPadding,
					isSpace,
					baseStyle,
					overrideStyle,
				})}
			>
				{isIconButton(key)
					? renderIconButton(
							key,
							isShiftActive,
							isCapsActive,
							fontSize + 10,
							fontSize + 10,
							baseStyle.color,
						)
					: getKeyLabel(key, isShiftActive, isCapsActive)}
			</button>
		);
	};

	useEffect(() => {
		return () => {
			if (longPressTimerRef.current) {
				clearTimeout(longPressTimerRef.current);
				longPressTimerRef.current = null;
			}
			if (longPressIntervalRef.current) {
				clearInterval(longPressIntervalRef.current);
				longPressIntervalRef.current = null;
			}
		};
	}, []);

	return (
		<>
			{isVisible && (
				<>
					<div style={{ height: keyboardRef.current?.offsetHeight || 0 }} />
					{/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: overlay close button */}
					<div className="fixed inset-0 z-40" onClick={closeKeyboard} />
				</>
			)}

			<div
				className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}
				style={{ backgroundColor: theme.colors.background }}
			>
				<div
					ref={keyboardRef}
					className="border-t-4 border-t-black overflow-hidden"
					style={keyboardStyle(theme)}
				>
					<div style={rowStyle(gap)}>
						{(isSpecialActive && keyboardRowsSpecial
							? keyboardRowsSpecial
							: isEmojiActive && keyboardRowsEmoji
								? keyboardRowsEmoji
								: keyboardRows
						).map((row: string[]) => {
							const spaceIndex = row.indexOf("SPACE");
							if (spaceIndex !== -1) {
								return (
									<div
										key={`row-${row.join("-")}`}
										className="flex items-center justify-center"
										style={{
											gap: `${gap}px`,
										}}
									>
										{row.map((key: string, index: number) => {
											if (key === "SPACE") {
												return renderKey(key, index, {
													flex: "2 1 auto",
													maxWidth: "60%",
												});
											}
											if (key === "CLEAR") {
												return renderKey(key, index, {
													flex: "1 1 auto",
												});
											}
											return renderKey(key, index);
										})}
									</div>
								);
							}

							return (
								<div
									key={`row-${row.join("-")}`}
									className="flex items-center justify-center"
									style={{
										gap: `${gap}px`,
									}}
								>
									{row.map((key: string, index: number) =>
										renderKey(key, index),
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};
