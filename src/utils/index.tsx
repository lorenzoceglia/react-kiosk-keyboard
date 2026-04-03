import type React from "react";
import { CapsLock } from "../components/icons/CapsLock";
import { Delete } from "../components/icons/Delete";
import { Enter } from "../components/icons/Enter";
import { Shift } from "../components/icons/Shift";
import { ThrashCan } from "../components/icons/ThrashCan";
import { SPECIAL_KEYS } from "../layouts";
import type { KeyboardTheme, SpecialKeyStyles } from "../types";

export const isSpecialKey = (key: string) => SPECIAL_KEYS.includes(key);

export const getKeyLabel = (
	key: string,
	isShiftActive: boolean,
	isCapsActive: boolean,
) => {
	switch (key) {
		case "DELETE":
			return "DEL";
		case "ENTER":
			return "ENTER";
		case "SHIFT":
			return "SHIFT";
		case "CAPS":
			return "CAPS";
		case "SPECIAL":
			return "#+=";
		case "BACK":
			return "BACK";
		case "EMOJI":
			return "😆";
		case "SPACE":
			return " ";
		case "CLEAR":
			return "CLEAR";
		default:
			return isShiftActive || isCapsActive ? key.toUpperCase() : key;
	}
};

export const isIconButton = (key: string) =>
	["SHIFT", "ENTER", "DELETE", "CAPS", "CLEAR"].includes(key);

export const renderIconButton = (
	key: string,
	active: boolean,
	locked: boolean,
	height: number,
	width: number,
	color: React.CSSProperties["color"],
) => {
	switch (key) {
		case "SHIFT":
			return (
				<Shift width={width} color={color} active={active} height={height} />
			);
		case "CAPS":
			return (
				<CapsLock width={width} color={color} locked={locked} height={height} />
			);
		case "ENTER":
			return <Enter width={width} color={color} height={height} />;
		case "DELETE":
			return <Delete width={width} color={color} height={height} />;
		case "CLEAR":
			return <ThrashCan width={width} color={color} height={height} />;
	}
};

export const getKeyFlex = (key: string): number => {
	if (key === "SPACE") return 1;
	if (key === "CLEAR") return 1.6;
	if (["DELETE", "ENTER", "SHIFT", "CAPS", "EMOJI"].includes(key)) return 1.3;
	return 1;
};

export const getKeyFontSize = (key: string, baseFontSize: number) => {
	const smallKeys = [
		"CLEAR",
		"ENTER",
		"DELETE",
		"SHIFT",
		"CAPS",
		"SPECIAL",
		"BACK",
	];
	return smallKeys.includes(key) ? baseFontSize * 0.75 : baseFontSize;
};

export const getHorizontalPadding = (keyWidth: number) => {
	return Math.max(4, Math.min(12, keyWidth * 0.15));
};

export const rowStyle = (gap: number): React.CSSProperties => ({
	display: "flex",
	flexDirection: "column",
	gap: `${gap}px`,
	paddingLeft: "8px",
	paddingRight: "8px",
});

export const keyboardStyle = (theme: KeyboardTheme): React.CSSProperties => ({
	backgroundColor: theme.colors.background,
	borderColor: theme.colors.accent,
	maxHeight: "60vh",
	paddingLeft: "12px",
	paddingRight: "12px",
	paddingTop: "12px",
	paddingBottom: "12px",
});

export const buttonStyle = ({
	baseStyle,
	overrideStyle,
	flexGrow,
	minWidth,
	maxWidth,
	height,
	fontSize,
	isSpace,
	horizontalPadding,
}: {
	baseStyle: React.CSSProperties;
	overrideStyle: React.CSSProperties;
	flexGrow: number;
	minWidth: number;
	maxWidth: number;
	height: number;
	fontSize: number;
	isSpace: boolean;
	horizontalPadding: number;
}): React.CSSProperties => ({
	...baseStyle,
	flex: `${flexGrow} 1 0`,
	minWidth: `${minWidth}px`,
	maxWidth: `${maxWidth}px`,
	height: `${height}px`,
	fontSize: `${fontSize}px`,
	borderRadius: isSpace ? "999px" : "12px",
	padding: `0 ${horizontalPadding}px`,
	...overrideStyle,
});

export const getSpecialKeyStyles = ({
	theme,
	isShiftActive,
	isCapsActive,
	isSpecialActive,
}: {
	theme: KeyboardTheme;
	isShiftActive: boolean;
	isCapsActive: boolean;
	isSpecialActive: boolean;
}): SpecialKeyStyles => ({
	DELETE: { backgroundColor: theme.colors.destructive, color: "white" },
	ENTER: { backgroundColor: theme.colors.destructive, color: "white" },
	SPACE: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.text,
	},
	CLEAR: { backgroundColor: theme.colors.destructive, color: "white" },
	SPECIAL: {
		backgroundColor: isSpecialActive
			? theme.colors.accent
			: theme.colors.primary,
		color: isSpecialActive ? theme.colors.foreground : theme.colors.text,
	},
	CAPS: {
		backgroundColor: isCapsActive ? theme.colors.accent : theme.colors.primary,
		color: isCapsActive ? theme.colors.foreground : theme.colors.text,
	},
	SHIFT: {
		backgroundColor: isShiftActive ? theme.colors.accent : theme.colors.primary,
		color: isShiftActive ? theme.colors.foreground : theme.colors.text,
	},
});
