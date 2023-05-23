import { ContentContainer } from "@/components/ContentContainer";
import {
  Inline,
  media,
  styled,
  Text,
  useColors,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { ThemeModelAtom } from "@/components/ThemeModel/ThemeModelInterface";
import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { useAppBackgroundRef } from "@/components/AppBackground";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { useRecoilValue } from "recoil";
import { useInitiateScrollBind } from "@/utils/useInitiateScrollBind";

export const WhyNotPrerecorded = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const themeModel = useRecoilValue(ThemeModelAtom);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const appBackgroundRef = useAppBackgroundRef();

  const mobile = useMedia("sm");
  const colors = useColors();

  /* bonkers; this timeline ruins the initial state of the theme modal on the first load */
  /* will set it up when the user is either nearing the section or scrolled passed it */
  const onAnimationSetUp = useCallback(() => {
    const ctx = gsap.context(() => {
      const { interfaceRef, rendererRef: modelRendererRef } = themeModel;
      const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: wrapperRef.current,
          start: "top+=10% bottom",
          end: "center 50%",
          scrub: 0.35,
          // preventOverlaps: true,
        },
        defaults: {
          ease: "none",
          duration: 1,
        },
      });

      if (!mobile) {
        timeline.fromTo(
          contentContainerRef.current,
          {
            opacity: 0,
            duration: 0.1,
          },
          {
            opacity: 1,
          },
          0.45
        );
      }

      timeline.fromTo(
        contentContainerRef.current,
        {
          scale: 0.95,
          duration: 0.3,
        },
        {
          scale: 1,
        },
        0.65
      );

      timeline.set(
        appBackgroundRef.current,
        {
          background: colors.white,
        },
        0
      );

      timeline.to(
        appBackgroundRef.current,
        {
          background: colors.dark,
        },
        0.35
      );

      if (
        modelRendererRef.current &&
        interfaceRef.current?.model &&
        interfaceRef.current.camera
      ) {
        const modelTimeline = gsap.timeline({
          scrollTrigger: {
            scroller: "#scroller",
            trigger: wrapperRef.current,
            start: "top+=10% bottom",
            end: "bottom-=35% 50%",
            scrub: 0.35,
            preventOverlaps: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
          defaults: {
            ease: "none",
            duration: 1,
          },
        });

        const startingPoint = 0;

        modelTimeline.fromTo(
          interfaceRef.current.model.position,
          { x: 0, y: -2.45, z: 0 },
          mobile ? { x: 0, y: -1.5, z: 0 } : { x: 0, y: -1.35, z: 0 },
          startingPoint
        );

        modelTimeline.fromTo(
          interfaceRef.current.camera.position,
          {
            x: 0,
            y: 1.75,
            z: 1.45,
            duration: 0.5,
          },
          mobile
            ? {
                x: 0,
                y: 1,
                z: 2.5,
              }
            : {
                x: 0,
                y: 0.75,
                z: 2,
              },
          startingPoint
        );

        modelTimeline.fromTo(
          interfaceRef.current.model.scale,
          { x: 0.5, y: 0.5, z: 0.5 },
          { x: 1, y: 1, z: 1 },
          startingPoint
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [themeModel, mobile, appBackgroundRef, colors.white, colors.dark]);

  const prepareThemeModel = useCallback(() => {
    const { interfaceRef, rendererRef } = themeModel;
    if (interfaceRef.current) {
      interfaceRef.current.rendering = true;
      gsap.set(rendererRef.current, {
        display: "block",
      });
    }
  }, [themeModel]);

  const disableThemeModel = useCallback(
    (direction: "up" | "down") => {
      const { interfaceRef, rendererRef } = themeModel;

      if (interfaceRef.current && direction !== "down") {
        interfaceRef.current.rendering = false;
        gsap.set(rendererRef.current, {
          display: "none",
        });
      }
    },
    [themeModel]
  );

  /* fade in */
  useInitiateScrollBind({
    wrapperRef,
    enablePassedScrollPointInitiate: true,
    observeNodeSelection: "previous",
    onEnter: prepareThemeModel,
    onInitiate: onAnimationSetUp,
    onExit: disableThemeModel,
    observerOptions: {
      threshold: 0,
      rootMargin: "0px",
    },
  });

  useSetNavigationPanelTheme({
    elementId: "why-this-way",
    themeKind: "inverted",
  });

  const invertedThemeClassName = useInvertedThemeClassName();

  const contents = (
    <Text kind="symbol" variant="body">
      Aligning interfaces to the way we think and the way we move. Interfaces
      are just like our minds and bodies that are constantly in a state of
      dynamic change.
      <br /> <br />
      Playfulness is a key and is a natural consequence of a fluid interface.
      Only happens when you nail everything. When the interface is responding
      instantly and satisfyingly.
      <br /> <br />
      When it’s redirectable and forgiving. When the motions and gestures are
      smooth. The interface starts to feel in sync with you. Something magical
      happens.
    </Text>
  );

  return (
    <Wrapper
      id="why-this-way"
      className={invertedThemeClassName}
      ref={wrapperRef}
    >
      <ContentContainer
        size="medium"
        ref={contentContainerRef}
        css={{ position: "relative", zIndex: "$2" }}
      >
        <Grid mobile={mobile}>
          <div>
            <Text
              variant="body"
              color="tertiary"
              css={{ paddingBottom: "$10" }}
            >
              Essence of what makes an interface truly great
            </Text>
            <Text kind="symbol" variant="title">
              Truly great interfaces feel like an extension of natural world. An
              extension of human mind.
            </Text>
            {mobile && (
              <Inline
                css={{
                  paddingTop: "$16",
                }}
              >
                {contents}
              </Inline>
            )}
          </div>
          {!mobile && (
            <Inline
              css={{
                marginTop: "150px",
                maxWidth: "390px",
                marginLeft: "auto",
              }}
            >
              {contents}
            </Inline>
          )}
        </Grid>
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  minHeight: getViewportHeightCssValue(65),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "155px 0",
  position: "relative",
  zIndex: "$2",
  [media.sm]: {
    padding: "64px 0",
  },
});

const Grid = styled("div", {
  variants: {
    mobile: {
      true: {
        flexDirection: "column",
      },
      false: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "max(min(200px, 20vw), 16px)",
        alignItems: "flex-start",
      },
    },
  },
});
