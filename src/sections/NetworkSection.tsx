import { ShowcaseSearchRequestStrategies } from "@/sections/ShowcaseSearchRequestStrategies";
import { ShowcasePreloadStrategies } from "@/sections/ShowcasePreloadStrategies";
import { media, styled, Text, useMedia } from "junoblocks";

export const NetworkSection = () => {
  const mobile = useMedia("sm");

  return (
    <section>
      <ShowcaseSearchRequestStrategies />
      <ShowcasePreloadStrategies />
      <LabelWrapper>
        <Text
          kind="symbol"
          variant="hero"
          align="center"
          css={{ [media.sm]: { fontSize: "3.5rem", lineHeight: "4rem" } }}
        >
          World Class
        </Text>
      </LabelWrapper>
    </section>
  );
};

const LabelWrapper = styled("div", {
  position: "relative",
  margin: "0 auto 0",
  paddingTop: "$16",
  width: "95%",
  height: 0,
  zIndex: "$2",
  bottom: 0,
  mixBlendMode: "exclusion",
  "*": {
    transform: "translateY(-50%)",
  },
});
