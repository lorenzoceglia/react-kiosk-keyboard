import { useCallback, useRef } from "react";

export const useLongPress = (callback: (key: string) => void) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const start = useCallback(
		(key: string) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			if (intervalRef.current) clearInterval(intervalRef.current);

			callback(key);

			timerRef.current = setTimeout(() => {
				intervalRef.current = setInterval(() => {
					callback(key);
				}, 100);
			}, 500);
		},
		[callback],
	);

	const stop = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	return { start, stop };
};
