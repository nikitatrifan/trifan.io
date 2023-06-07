import { styled, media } from "junoblocks";

export const ShowcaseGrid = styled("div", {
  padding: "$8 0",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "$8",
  rowGap: "$8",
  [media.sm]: {
    gridTemplateColumns: "1fr",
  },
});
