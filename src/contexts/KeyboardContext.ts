import { createContext } from "react";
import { KeyboardContextType } from "../types";

export const KeyboardContext = createContext<KeyboardContextType | undefined>(
  undefined,
);
