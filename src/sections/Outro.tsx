import { ContentContainer } from "@/components/ContentContainer";
import {
  Column,
  Inline,
  Text,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";

export const Outro = () => {
  const invertedThemeClassName = useInvertedThemeClassName();
  const mobile = useMedia("sm");

  useSetNavigationPanelTheme({
    elementId: "outro",
    themeKind: "inverted",
  });

  return (
    <ContentContainer
      id="outro"
      className={invertedThemeClassName}
      css={{ padding: "$32 0", position: "relative", zIndex: "$2" }}
    >
      <Column justifyContent="space-between"></Column>
    </ContentContainer>
  );
};
