import { ContentContainer } from "@/components/ContentContainer";
import {
  Text,
  useColors,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { useEffect } from "react";
import { useAppBackgroundRef } from "@/components/AppBackground";
import { gsap } from "gsap";

export const StoryBehind = () => {
  const invertedThemeClassName = useInvertedThemeClassName();

  const mobile = useMedia("sm");

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
        A key to fluidity
      </Text>
      <Text
        variant="hero"
        align={mobile ? "center" : "left"}
        css={Object.assign(
          { fontWeight: "400" },
          mobile
            ? { fontSize: "2rem", lineHeight: "2.5rem" }
            : {
                fontSize: "3.5rem",
                lineHeight: "4.5rem",
              }
        )}
      >
        A natural consequence of a fluid interface —
        <br />
        <br />
        Playfulness. <br />
        <br />
        Only happens when you nail everything.
        <br />
        <br />
        When the interface is responding instantly and satisfyingly.
        <br />
        <br />
        When it’s redirectable and forgiving.
        <br />
        <br />
        When the motions and gestures are smooth.
        <br />
        <br />
        The interface starts to feel in sync with you.
        <br />
        <br />
        Something magical happens.
      </Text>
    </ContentContainer>
  );
};
