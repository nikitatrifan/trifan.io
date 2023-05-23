import { styled } from "junoblocks";

export const ContentContainer = styled("div", {
  maxWidth: "1608px",
  width: "95%",
  margin: "0 auto",
  position: "relative",
  zIndex: "$2",
  variants: {
    size: {
      medium: {
        maxWidth: "1325px",
      },
      small: {
        maxWidth: "1260px",
      },
    },
  },
});
