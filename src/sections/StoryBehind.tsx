import { ContentContainer } from "@/components/ContentContainer";
import {
  Text,
  useColors,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";
import { useEffect } from "react";
import { useAppBackgroundRef } from "@/components/AppBackground";
import { gsap } from "gsap";

export const StoryBehind = () => {
  const invertedThemeClassName = useInvertedThemeClassName();

  const mobile = useMedia("sm");

  useSetNavigationPanelTheme({
    elementId: "story-behind",
    themeKind: "inverted",
  });

  const colors = useColors();

  const appBackgroundRef = useAppBackgroundRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.set(appBackgroundRef.current, {
              background: colors.dark,
            });
          }
        });
      },
      {
        threshold: 1.0,
        rootMargin: "100%",
      }
    );

    observer.observe(document.querySelector("#story-behind") as Element);

    return () => {
      observer.disconnect();
    };
  }, [appBackgroundRef, colors.dark]);

  return (
    <ContentContainer
      id="story-behind"
      size="small"
      css={{ padding: "10vh 0", position: "relative", zIndex: "$2" }}
      className={invertedThemeClassName}
    >
      <Text
        align={mobile ? "center" : "left"}
        color="secondary"
        css={{ paddingBottom: "$12" }}
      >
        Story behind
      </Text>
      <Text
        variant={mobile ? "primary" : "header"}
        align={mobile ? "center" : "left"}
        kind="symbol"
      >
        {new Array(666)
          .fill(null)
          .map(() => "*story behind here*")
          .join(" ")}
      </Text>
    </ContentContainer>
  );
};
