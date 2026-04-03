import type React from "react";
import { useEffect, useRef, useState } from "react";
import { KeyboardContext } from "./KeyboardContext";

export const KeyboardProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [activeInputId, setActiveInputId] = useState<string | null>(null);

	const fieldsRef = useRef<
		Record<
			string,
			{
				value: string;
				onSubmit?: () => void;
				ref: HTMLInputElement | HTMLTextAreaElement | null;
			}
		>
	>({});

	const register = (id: string, onSubmit?: () => void) => {
		if (!fieldsRef.current[id]) {
			fieldsRef.current[id] = {
				value: "",
				ref: null,
				onSubmit,
			};
		}

		const field = fieldsRef.current[id];

		return {
			name: id,
			value: field.value,
			ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
				field.ref = el;
			},
			onFocus: () => {
				setActiveInputId(id);
				setIsVisible(true);
			},
			onChange: (
				e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
			) => {
				field.value = e.target.value;
			},
			inputmode: "none",
		};
	};

	const getValue = (id: string) => {
		return fieldsRef.current[id]?.value ?? "";
	};

	const getOnSubmit = (id: string) => {
		return fieldsRef.current[id]?.onSubmit;
	};

	const setValue = (id: string, value: string) => {
		if (!fieldsRef.current[id]) return;
		fieldsRef.current[id].value = value;

		if (fieldsRef.current[id].ref) {
			fieldsRef.current[id].ref.value = value;
			fieldsRef.current[id].ref.focus();
		}
	};

	const setValueForActive = (value: string) => {
		if (!activeInputId) return;
		setValue(activeInputId, value);
	};

	useEffect(() => {
		if (isVisible && activeInputId) {
			fieldsRef.current[activeInputId]?.ref?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [isVisible, activeInputId]);

	const openKeyboard = (id: string) => {
		setActiveInputId(id);
		setIsVisible(true);
	};

	const closeKeyboard = () => {
		setActiveInputId(null);
		setIsVisible(false);
	};

	return (
		<KeyboardContext.Provider
			value={{
				isVisible,
				activeInputId,
				register,
				openKeyboard,
				closeKeyboard,
				getValue,
				getOnSubmit,
				setValue,
				setValueForActive,
			}}
		>
			{children}
		</KeyboardContext.Provider>
	);
};
