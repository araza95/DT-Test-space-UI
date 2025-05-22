import { Roboto, Titillium_Web } from "next/font/google";
import { useMemo } from "react";

export const useTheme = () => {
  const fonts = useMemo(
    () => ({
      roboto: Roboto({ subsets: ["latin"], weight: ["300", "400"] }),
      titillium: Titillium_Web({ subsets: ["latin"], weight: "600" }),
    }),
    []
  );

  return { fonts };
};
