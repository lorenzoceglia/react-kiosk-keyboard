import type React from "react";

// =====================
// General Types
// =====================

export type KeyboardLayout =
	| "qwerty"
	| "qwertz"
	| "azerty"
	| "dvorak"
	| "italian"
	| "spanish"
	| "russian"
	| "japanese"
	| "chinese";

export type ThemeColor = {
	primary: string;
	secondary: string;
	accent: string;
	background: string;
	foreground: string;
	destructive: string;
	text: string;
};

export type KeyboardTheme = {
	id: string;
	name: string;
	colors: ThemeColor;
};

// =====================
// Icons
// =====================

export type IconProps = {
	color: React.CSSProperties["color"];
	height: number;
	width: number;
};

// =====================
// Dimensions & Styles
// =====================

export interface ButtonDimensions {
	width: number;
	height: number;
	gap: number;
}

export interface SpecialKeyStyles {
	DELETE: React.CSSProperties;
	ENTER: React.CSSProperties;
	SPACE: React.CSSProperties;
	CLEAR: React.CSSProperties;
	SPECIAL: React.CSSProperties;
	CAPS: React.CSSProperties;
	SHIFT: React.CSSProperties;
}

// =====================
// Hook return type
// =====================

export interface UseKeyboardReturn {
	isVisible: boolean;
	activeInputId: string | null;
	getValue: (id: string) => string;
	setValue: (id: string, value: string) => void;
	getOnSubmit?: (id: string) => (() => void) | undefined;
	closeKeyboard: () => void;
}

// =====================
// Hook props
// =====================

export interface UseKeyboardActionsProps {
	keyboard: UseKeyboardReturn;
}

// =====================
// Context type
// =====================

export interface KeyboardContextType {
	isVisible: boolean;
	register: (
		id: string,
		onSubmit?: () => void,
	) => {
		name: string;
		value: string;
		ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
		onFocus: () => void;
		onChange: (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => void;
	};
	activeInputId: string | null;
	openKeyboard: (inputId: string) => void;
	closeKeyboard: () => void;
	getValue: (id: string) => string;
	getOnSubmit?: (id: string) => (() => void) | undefined;
	setValue: (id: string, v: string) => void;
	setValueForActive: (v: string) => void;
}
