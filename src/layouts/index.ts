import type { KeyboardLayout } from "../types";

const COMMON_SPECIAL: string[][] = [
	["»", "§", "^", "ì", "ò", "ù", "@", "#", "€", "%", "&"],
	["/", "(", ")", "[", "]", "{", "}", "?", "!", ":", ";"],
	["'", '"', "_", "-", "+", "=", "*", "°", "<", ">", "«"],
	["\\", "|", "~", "`", "©", "®", "™", "±", "÷", "×", "¶"],
	["BACK"],
];

const COMMON_EMOJI: string[][] = [
	["😀", "😂", "🤣", "😊", "😉", "😍", "🥰", "😘", "😅", "😎", "🙂"],
	["😭", "😢", "😡", "🤬", "🤯", "😱", "🤔", "😴", "🤤", "🤢", "😇"],
	["👍", "👎", "👏", "🙏", "👌", "🤌", "🤞", "🤙", "💪", "🤝", "✌️"],
	["❤️", "💔", "💖", "✨", "🔥", "⭐", "⚡", "💯", "🎉", "🎵", "💻"],
	["BACK"],
];

export const KEYBOARD_LAYOUTS: Record<
	KeyboardLayout,
	{ main: string[][]; special?: string[][]; emoji?: string[][] }
> = {
	qwerty: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l", "ENTER"],
			["SHIFT", "z", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	azerty: {
		main: [
			["&", "é", '"', "'", "(", "-", "è", "_", "ç", "à", "DELETE"],
			["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
			["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "ENTER"],
			["SHIFT", "w", "x", "c", "v", "b", "n", ",", ";", ":", "!"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	chinese: {
		main: [
			["一", "二", "三", "四", "五", "六", "七", "八", "九", "零", "DELETE"],
			["你", "我", "他", "她", "是", "在", "不", "有", "这", "那"],
			["的", "了", "吗", "吧", "很", "都", "和", "就", "还", "也", "ENTER"],
			["SHIFT", "爱", "想", "能", "说", "看", "去", "来", "给", "做", "想"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	qwertz: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "ENTER"],
			["SHIFT", "y", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	spanish: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "ENTER"],
			["SHIFT", "z", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	japanese: {
		main: [
			["ぬ", "ふ", "あ", "う", "え", "お", "や", "ゆ", "よ", "わ", "DELETE"],
			["た", "て", "い", "す", "か", "ん", "な", "に", "ら", "せ"],
			["ち", "と", "し", "は", "き", "く", "ま", "の", "り", "れ", "ENTER"],
			["SHIFT", "つ", "さ", "そ", "ひ", "こ", "み", "も", "ね", "る", "ろ"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	russian: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
			["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ENTER"],
			["SHIFT", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	italian: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l", "ENTER"],
			["SHIFT", "z", "x", "c", "v", "b", "n", "m", "à", "è", "é"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},

	dvorak: {
		main: [
			["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "DELETE"],
			["'", ",", ".", "p", "y", "f", "g", "c", "r", "l"],
			["a", "o", "e", "u", "i", "d", "h", "t", "n", "s", "ENTER"],
			["SHIFT", ";", "q", "j", "k", "x", "b", "m", "w", "v", "z"],
			["SPECIAL", "EMOJI", "SPACE", "CLEAR", "CAPS"],
		],
		special: COMMON_SPECIAL,
		emoji: COMMON_EMOJI,
	},
};

export const SPECIAL_KEYS = [
	"DELETE",
	"ENTER",
	"CAPS",
	"SHIFT",
	"SPACE",
	"CLEAR",
];
