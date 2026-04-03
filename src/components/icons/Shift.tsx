import { IconProps } from "../../types";

export const Shift = ({
	color,
	height,
	width,
	active,
}: IconProps & { active: boolean }) => {
	return (
		<>
			{active ? (
				<svg
					stroke={color}
					fill={color}
					strokeWidth="0"
					viewBox="0 0 16 16"
					height={height}
					width={width}
					xmlns="http://www.w3.org/2000/svg"
				>
					<title id="shift">Shift</title>
					<path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"></path>
				</svg>
			) : (
				<svg
					stroke={color}
					fill={color}
					strokeWidth="0"
					viewBox="0 0 16 16"
					height={height}
					width={width}
					xmlns="http://www.w3.org/2000/svg"
				>
					<title id="shift">Shift</title>
					<path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1z"></path>
				</svg>
			)}
		</>
	);
};
