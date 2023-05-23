import { Text, styled, Inline, useMedia, media, useColors } from "junoblocks";
import { ContentContainer } from "@/components/ContentContainer";
import { useEffect } from "react";
import { gsap } from "gsap";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { useAppBackgroundRef } from "@/components/AppBackground";

export const SmoothFrameSpeed = () => {
  const mobile = useMedia("sm");

  const appBackgroundRef = useAppBackgroundRef();
  const colors = useColors();

  // fade in timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const backgroundNode = document.querySelector(
        "#how-to-qualify-background"
      );
      const contentNode = document.querySelector("#how-to-qualify-content");

      const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: "#how-to-qualify",
          start: "top bottom",
          end: "top 100px",
          scrub: 0.35,
          // markers: true,
        },
        defaults: {
          ease: "none",
          duration: 1,
        },
      });

      timeline.fromTo(
        contentNode,
        {
          opacity: 0,
          y: mobile ? "15%" : "-30%",
          scale: 0.85,
          duration: 0.75,
        },
        {
          opacity: 1,
          y: "0%",
          scale: 1,
          // duration: 0.1,
        }
      );

      timeline.fromTo(
        backgroundNode,
        {
          clipPath: mobile ? "circle(0%)" : "ellipse(0% 0% at 50% 50%)",
          duration: 0.35,
        },
        {
          clipPath: mobile ? "circle(50%)" : "ellipse(40% 40% at 50% 50%)",
        },
        0
      );
      timeline.fromTo(
        backgroundNode,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.15,
        },
        0
      );
      timeline.fromTo(
        backgroundNode,
        {
          scale: 0,
        },
        {
          scale: 2,
          duration: 0.15,
        },
        0
      );
      timeline.fromTo(
        appBackgroundRef.current,
        {
          background: colors.dark,
          duration: 0.5,
        },
        {
          background: colors.white,
        },
        0.15
      );
    });

    return () => {
      ctx.revert();
    };
  }, [appBackgroundRef, colors.dark, colors.white, mobile]);

  useSetNavigationPanelTheme({
    elementId: "how-to-qualify",
    themeKind: "default",
  });

  const annotationText = <Text variant="body">***</Text>;

  return (
    <>
      <Wrapper id="how-to-qualify">
        <GridContentContainer id="how-to-qualify-content" mobile={mobile}>
          <div>
            <Text variant="body" css={{ paddingBottom: "$10" }}>
              ***
            </Text>
            <Text kind="symbol" variant="title">
              ***
            </Text>
            {!mobile && (
              <Inline css={{ padding: "$24 0" }}>{annotationText}</Inline>
            )}
          </div>
          <Text
            kind="symbol"
            variant="body"
            css={mobile ? { paddingTop: "$16" } : undefined}
          >
            1
            <br />
            <br />
            2 <br />
            <br />
            3 <br />
            <br />
            4 <br />
            <br />
            5 <br />
            <br />6{" "}
          </Text>
          {mobile && (
            <Inline css={{ paddingTop: "$12" }}>{annotationText}</Inline>
          )}
        </GridContentContainer>
        <BackgroundWrapper>
          <Background id="how-to-qualify-background" />
        </BackgroundWrapper>
      </Wrapper>
      <LabelWrapper>
        <Text
          kind="symbol"
          variant={mobile ? "title" : "hero"}
          align={mobile ? "center" : "left"}
        >
          First Class
        </Text>
      </LabelWrapper>
    </>
  );
};

const Wrapper = styled("div", {
  minHeight: getViewportHeightCssValue(100),

  position: "relative",
  zIndex: "$2",
  padding: "120px 0",
  [media.sm]: { padding: "60px 0" },

  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

const LabelWrapper = styled("div", {
  position: "relative",
  margin: "0 auto 0",
  width: "95%",
  height: 0,
  zIndex: "$2",
  bottom: 0,
  mixBlendMode: "exclusion",
  "*": {
    transform: "translateY(-50%)",
  },
});

const BackgroundWrapper = styled("div", {
  position: "absolute",
  zIndex: "$1",
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

const Background = styled("div", {
  backgroundColor: "$colors$white",
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  clipPath: "circle(0%)",
  transformOrigin: "50% 25%",
  pointerEvents: "none",
});

const GridContentContainer = styled(ContentContainer, {
  zIndex: "$3",
  position: "relative",
  variants: {
    mobile: {
      true: {},
      false: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "max(min(10%, 200px), 24px)",
        alignItems: "center",
      },
    },
  },
});
