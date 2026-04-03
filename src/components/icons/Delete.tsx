import type { IconProps } from "../../types";

export const Delete = ({ color, height, width }: IconProps) => {
	return (
		<svg
			stroke={color}
			fill="none"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke-linecap="round"
			stroke-linejoin="round"
			height={height}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title id="delete">Delete</title>
			<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path>
			<path d="m12 9 6 6"></path>
			<path d="m18 9-6 6"></path>
		</svg>
	);
};
