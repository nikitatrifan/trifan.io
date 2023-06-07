import { useWindowHeight } from "@react-hook/window-size/throttled";
import { useLayoutEffect } from "react";

export const FixMobileViewportHeightBounce = () => {
  const height = useWindowHeight();

  useLayoutEffect(() => {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    const vh = height * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [height]);

  return null;
};

export function getViewportHeightCssValue(vhValue: number) {
  return `calc(var(--vh, 1vh) * ${vhValue})`;
}
