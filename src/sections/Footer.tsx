import { ContentContainer } from "@/components/ContentContainer";
import {
  Button,
  Column,
  Inline,
  styled,
  Text,
  useInvertedThemeClassName,
} from "junoblocks";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";

export const Footer = () => {
  const invertedThemeClassName = useInvertedThemeClassName();
  useSetNavigationPanelTheme({
    elementId: "footer",
    themeKind: "inverted",
  });
  return (
    <Wrapper id="footer">
      <ContentContainer
        className={invertedThemeClassName}
        css={{ padding: "$16 0" }}
      >
        <Inline justifyContent="space-between" align="flex-start">
          <Button as="a" variant="secondary" href="/terms">
            Terms & Conditions
          </Button>

          <Column gap={4}>
            <Text variant="symbol">Trifan Universe LLC</Text>
            <Text variant="symbol">
              Austin TX 78741
              <br />
              2028 E Ben White Blvd
            </Text>
          </Column>
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
