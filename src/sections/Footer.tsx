import { ContentContainer } from "@/components/ContentContainer";
import { Inline, styled, Text, useInvertedThemeClassName } from "junoblocks";

export const Footer = () => {
  const invertedThemeClassName = useInvertedThemeClassName();

  return (
    <Wrapper id="footer">
      <ContentContainer
        className={invertedThemeClassName}
        css={{ padding: "$16 0" }}
      >
        <Inline justifyContent="center" align="center">
          <Text variant="header" align="center">
            If this is resonating with you in any way, reach out at
            nikita@trifan.io
          </Text>
        </Inline>
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  backgroundColor: "$colors$dark",
  position: "relative",
  zIndex: "$2",
});
