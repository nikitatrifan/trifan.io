import { createRef, useLayoutEffect } from "react";
import { styled } from "junoblocks";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";

const backgroundRef = createRef<HTMLDivElement>();

export const useAppBackgroundRef = () => {
  // useLayoutEffect(() => {
  //   let active = true;
  //   function instantiate() {
  //     if (active) {
  //       requestAnimationFrame(instantiate);
  //     }
  //     console.log(backgroundRef.current?.style.background);
  //   }
  //   instantiate();
  //   return () => {
  //     active = false;
  //   };
  // }, []);
  return backgroundRef;
};

export const AppBackground = () => <BackgroundElement ref={backgroundRef} />;

const BackgroundElement = styled("div", {
  position: "fixed",
  opacity: 1,
  pointerEvents: "none",
  zIndex: "$1",
  overflow: "hidden",
  width: "100vw",
  minHeight: "fill-available",
  height: getViewportHeightCssValue(100),
  left: 0,
  top: 0,
  background: "$dark",
  willChange: "background",
});
