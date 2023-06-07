import { styled, keyframes, useMedia, media } from "junoblocks";
import { CSS } from "@stitches/react";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";

const noiseAnimation = keyframes({
  "0%": {
    transform: "translate(0, 0)",
  },

  "10%": {
    transform: "translate(-5vw, -5vh)",
  },

  "20%": {
    transform: "translate(-10vw, 5vh)",
  },

  "30%": {
    transform: "translate(5vw, -10vh)",
  },

  "40%": {
    transform: "translate(-5vw, 15vh)",
  },

  "50%": {
    transform: "translate(-10vw, 5vh)",
  },

  "60%": {
    transform: "translate(15vw, 0vh)",
  },

  "70%": {
    transform: "translate(0vw, 10vh)",
  },

  "80%": {
    transform: "translate(-15vw, 0vh)",
  },

  "90%": {
    transform: "translate(10vw, 5vh)",
  },

  "100%": {
    transform: "translate(5vw, 0vh)",
  },
});

const StyledDiv = styled("div", {
  position: "fixed",
  opacity: 0.85,
  pointerEvents: "none",
  mixBlendMode: "multiply",
  zIndex: 9999,
  overflow: "hidden",
  width: "200vw",
  height: getViewportHeightCssValue(200),
  left: "-50vw",
  top: getViewportHeightCssValue(-50),
  background: "rgba(0,0,0,0) repeat 0 0",
  animation: `${noiseAnimation} .2s steps(2) infinite`,
  transition: "opacity 1s",
  willChange: "transform",
  [media.sm]: {
    display: "none",
  },
});

export const BackgroundNoise = ({ css, id }: { css?: CSS; id?: string }) => {
  const noiseImageSrc = "/images/noise-light.png";
  const mobile = useMedia("sm");
  return mobile ? (
    <></>
  ) : (
    <StyledDiv
      data-image-src={noiseImageSrc}
      data-image-type="bg"
      data-image-load="instant"
      style={{ backgroundImage: `url("${noiseImageSrc}")` }}
      css={css}
      id={id}
    />
  );
};
