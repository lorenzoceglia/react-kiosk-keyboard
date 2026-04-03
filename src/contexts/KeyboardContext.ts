import { createContext } from "react";
import type { KeyboardContextType } from "../types/misc.ts";

export const KeyboardContext = createContext<KeyboardContextType | undefined>(
	undefined,
);
