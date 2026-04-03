import { useContext } from "react";
import { KeyboardContext } from "../contexts/KeyboardContext";

export const useKeyboard = () => {
	const context = useContext(KeyboardContext);
	if (context === undefined) {
		throw new Error("useKeyboard must be used within KeyboardProvider");
	}
	return context;
};
