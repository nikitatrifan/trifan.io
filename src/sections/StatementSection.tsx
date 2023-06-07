import { ContentContainer } from "@/components/ContentContainer";
import {
  Inline,
  media,
  styled,
  Text,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { ThemeModelAtom } from "@/components/ThemeModel/ThemeModelInterface";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { useRecoilValue } from "recoil";
import { IntroTimelineAtom } from "@/sections/IntroSection";

export const StatementSection = () => {
  const themeModel = useRecoilValue(ThemeModelAtom);
  const introSectionTimeline = useRecoilValue(IntroTimelineAtom);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const mobile = useMedia("sm");

  /* bonkers; this timeline ruins the initial state of the theme modal on the first load */
  /* will set it up when the user is either nearing the section or scrolled passed it */
  const bindScrollTrigger = useCallback(() => {
    const ctx = gsap.context(() => {
      const { interfaceRef, rendererRef: modelRendererRef } = themeModel;
      const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: "#statement-section",
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

      if (
        modelRendererRef.current &&
        interfaceRef.current?.model &&
        interfaceRef.current.camera
      ) {
        const modelTimeline = gsap.timeline({
          scrollTrigger: {
            scroller: "#scroller",
            trigger: "#statement-section",
            start: "top+=10% bottom",
            end: "bottom-=35% 50%",
            scrub: 0.35,
            preventOverlaps: false,
            invalidateOnRefresh: false,
            immediateRender: false,
            onUpdate(ppp) {
              console.log(ppp.progress);
            },
          },
          defaults: {
            ease: "none",
            duration: 1,
          },
        });

        window.modelTimeline = modelTimeline;

        const cleanUpModel = () => {
          if (interfaceRef.current) {
            interfaceRef.current.rendering = false;
          }
          gsap.set(modelRendererRef.current, {
            display: "none",
            visibility: "hidden",
          });
          if (interfaceRef.current?.model && interfaceRef.current?.camera) {
            gsap.set(interfaceRef.current.model.position, {
              x: 0,
              y: -2.45,
              z: 0,
            });
            gsap.set(interfaceRef.current.camera.position, {
              x: 0,
              y: 1.75,
              z: 1.45,
            });
          }
        };

        const prepareModel = () => {
          if (interfaceRef.current) {
            interfaceRef.current.rendering = true;
          }
          gsap.set(modelRendererRef.current, {
            display: "block",
            visibility: "visible",
          });
        };

        cleanUpModel();

        modelTimeline.call(cleanUpModel, undefined, 0);
        modelTimeline.call(cleanUpModel, undefined, 0.035);
        modelTimeline.call(prepareModel, undefined, "+=0.05");

        const startingPoint = 0.035;

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
  }, [themeModel, mobile]);

  useEffect(() => {
    let cleanup: undefined | (() => void);
    const instantiate = () => {
      if (!cleanup) {
        cleanup = bindScrollTrigger();
      }
    };

    if (introSectionTimeline && introSectionTimeline.progress() > 0.9) {
      instantiate();
    } else {
      introSectionTimeline?.eventCallback("onComplete", instantiate);
    }

    return cleanup;
  }, [bindScrollTrigger, introSectionTimeline]);

  const invertedThemeClassName = useInvertedThemeClassName();

  const contents = (
    <Text kind="symbol" variant="body">
      Aligning interfaces to the way we think and the way we move. Interfaces
      are just like our minds and bodies that are constantly in a state of
      dynamic change.
      <br /> <br />
      Allowing for constant redirection and interruption makes an interface
      connected to you.
      <br /> <br />
      Everything is the state of change in the world and so our minds expect
      that everywhere.
      <br /> <br />
      Accommodating for this kind of interface in the browser is the real
      challenge.
    </Text>
  );

  return (
    <Wrapper id="statement-section" className={invertedThemeClassName}>
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
              Best in class work
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
