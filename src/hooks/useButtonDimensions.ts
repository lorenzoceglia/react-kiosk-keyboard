import { useEffect, useState } from "react";
import { ButtonDimensions } from "../types";

export const useButtonDimensions = (
  keyboardRows: string[][],
): ButtonDimensions => {
  const [dimensions, setDimensions] = useState<ButtonDimensions>({
    width: 100,
    height: 100,
    gap: 8,
  });

  useEffect(() => {
    const calculateDimensions = () => {
      if (typeof window === "undefined") return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const horizontalPadding = screenWidth < 768 ? 40 : 40;
      const maxRowWidth = screenWidth - horizontalPadding;
      const maxHeight = screenHeight * 0.5;

      const getRowWeight = (row: string[]) => {
        return row.reduce((sum, key) => {
          if (key === "SPACE") return sum + 1;
          if (key === "CLEAR") return sum + 1.6;
          if (["DELETE", "ENTER", "SHIFT", "CAPS"].includes(key))
            return sum + 1.3;
          return sum + 1;
        }, 0);
      };

      const maxRowWeight = Math.max(...keyboardRows.map(getRowWeight));
      const maxKeysInRow = Math.max(...keyboardRows.map((row) => row.length));

      const gap = screenWidth < 768 ? 4 : 8;
      const gapWidth = gap * (maxKeysInRow - 1);

      const buttonWidth = Math.floor((maxRowWidth - gapWidth) / maxRowWeight);
      const buttonHeight = Math.floor(maxHeight / keyboardRows.length);

      const minSize = screenWidth < 768 ? 36 : 48;
      const side = Math.max(Math.min(buttonWidth, buttonHeight), minSize);

      setDimensions({ width: side, height: side, gap });
    };

    calculateDimensions();

    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [keyboardRows]);

  return dimensions;
};
