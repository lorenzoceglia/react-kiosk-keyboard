import { createContext } from "react";
import type { KeyboardContextType } from "../types";

export const KeyboardContext = createContext<KeyboardContextType | undefined>(
	undefined,
);
