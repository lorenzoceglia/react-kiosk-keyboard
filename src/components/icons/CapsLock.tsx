import type { IconProps } from "../../types";

export const CapsLock = ({
	color,
	height,
	width,
	locked,
}: IconProps & { locked: boolean }) => {
	return (
		<>
			{locked ? (
				<svg
					stroke={color}
					fill={color}
					stroke-width="0"
					viewBox="0 0 24 24"
					height={height}
					width={width}
					xmlns="http://www.w3.org/2000/svg"
				>
					<title id="caps-lock">Caps Lock</title>
					<g id="Lock">
						<g>
							<path d="M17.44,9.33h-1.1V6.4a4.34,4.34,0,0,0-8.68,0V9.33H6.56a2.5,2.5,0,0,0-2.5,2.5v7.61a2.507,2.507,0,0,0,2.5,2.5H17.44a2.507,2.507,0,0,0,2.5-2.5V11.83A2.5,2.5,0,0,0,17.44,9.33ZM8.66,6.4a3.34,3.34,0,0,1,6.68,0V9.33H8.66ZM18.94,19.44a1.511,1.511,0,0,1-1.5,1.5H6.56a1.511,1.511,0,0,1-1.5-1.5V11.83a1.5,1.5,0,0,1,1.5-1.5H17.44a1.5,1.5,0,0,1,1.5,1.5Z"></path>
							<path d="M13,14.95a.984.984,0,0,1-.5.86v1.5a.5.5,0,0,1-1,0v-1.5a.984.984,0,0,1-.5-.86,1,1,0,0,1,2,0Z"></path>
						</g>
					</g>
				</svg>
			) : (
				<svg
					stroke={color}
					fill={color}
					stroke-width="0"
					viewBox="0 0 24 24"
					height={height}
					width={width}
					xmlns="http://www.w3.org/2000/svg"
				>
					<title id="caps-lock">Caps Lock</title>
					<g id="Unlock">
						<g>
							<path d="M17.44,9.33h-1.1c0-.97.01-1.95,0-2.92A4.343,4.343,0,0,0,8.36,4.04c-.36.53.51,1.03.87.5a3.365,3.365,0,0,1,5.23-.39c1.04,1.11.88,2.57.88,3.96V9.33H6.56a2.5,2.5,0,0,0-2.5,2.5v7.61a2.507,2.507,0,0,0,2.5,2.5H17.44a2.507,2.507,0,0,0,2.5-2.5V11.83A2.5,2.5,0,0,0,17.44,9.33Zm1.5,10.11a1.511,1.511,0,0,1-1.5,1.5H6.56a1.511,1.511,0,0,1-1.5-1.5V11.83a1.5,1.5,0,0,1,1.5-1.5H17.44a1.5,1.5,0,0,1,1.5,1.5Z"></path>
							<path d="M13,14.95a.984.984,0,0,1-.5.86v1.5a.5.5,0,0,1-1,0v-1.5a.984.984,0,0,1-.5-.86,1,1,0,0,1,2,0Z"></path>
						</g>
					</g>
				</svg>
			)}
		</>
	);
};
