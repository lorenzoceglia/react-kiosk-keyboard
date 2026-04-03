import { useCallback, useState } from "react";
import type { UseKeyboardActionsProps } from "../types";

export const useKeyboardActions = ({ keyboard }: UseKeyboardActionsProps) => {
	const { activeInputId, getValue, setValue, getOnSubmit } = keyboard;

	const [isShiftActive, setIsShiftActive] = useState(false);
	const [isCapsActive, setIsCapsActive] = useState(false);
	const [isSpecialActive, setIsSpecialActive] = useState(false);
	const [isEmojiActive, setIsEmojiActive] = useState(false);

	const executeKeyAction = useCallback(
		(key: string) => {
			if (!activeInputId) return;
			const current = getValue(activeInputId);

			const actionMap: Record<string, () => void> = {
				DELETE: () => setValue(activeInputId, current.slice(0, -1)),
				ENTER: () => getOnSubmit?.(activeInputId)?.(),
				SHIFT: () => setIsShiftActive((prev) => !prev),
				CAPS: () => setIsCapsActive((prev) => !prev),
				SPACE: () => setValue(activeInputId, current + " "),
				CLEAR: () => {
					setValue(activeInputId, "");
					setIsShiftActive(false);
				},
				SPECIAL: () => setIsSpecialActive((prev) => !prev),
				BACK: () => {
					if (isSpecialActive) setIsSpecialActive(false);
					if (isEmojiActive) setIsEmojiActive(false);
				},
				EMOJI: () => setIsEmojiActive((prev) => !prev),
			};

			if (actionMap[key]) {
				actionMap[key]();
			} else {
				const charToAdd =
					isShiftActive || isCapsActive ? key.toUpperCase() : key.toLowerCase();
				setValue(activeInputId, current + charToAdd);
				if (isShiftActive && !isCapsActive) setIsShiftActive(false);
			}
		},
		[
			activeInputId,
			getValue,
			setValue,
			getOnSubmit,
			isShiftActive,
			isCapsActive,
			isSpecialActive,
			isEmojiActive,
		],
	);

	return {
		executeKeyAction,
		isShiftActive,
		setIsShiftActive,
		isCapsActive,
		setIsCapsActive,
		isSpecialActive,
		setIsSpecialActive,
		isEmojiActive,
		setIsEmojiActive,
	};
};
