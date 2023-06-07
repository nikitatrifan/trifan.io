import { ContentContainer } from "@/components/ContentContainer";
import {
  ArrowUpIcon,
  Button,
  Inline,
  media,
  styled,
  Text,
  useColors,
  useMedia,
} from "junoblocks";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useWindowHeight } from "@react-hook/window-size/throttled";
import { scrollToElement } from "@/utils/scrollToElement";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { useAppBackgroundRef } from "@/components/AppBackground";
import dayjs from "dayjs";
import useFontFaceObserver from "use-font-face-observer";
import { atom, useSetRecoilState } from "recoil";

export const IntroTimelineAtom = atom<ReturnType<typeof gsap.timeline> | null>({
  key: "IntroTimelineAtom",
  default: null,
  dangerouslyAllowMutability: true,
});

function runAnimationWhenReady(callback: () => void) {
  let startTime = dayjs();
  const interval = setInterval(() => {
    const now = dayjs();
    const timeDiffMs = now.diff(startTime, "ms");
    if (timeDiffMs <= 60) {
      clearInterval(interval);
      requestAnimationFrame(callback);
    } else {
      startTime = now;
    }
  }, 50);

  return interval;
}

const useEffectWhenReadyToAnimate: typeof useEffect = (func, deps) => {
  const fontReady = useFontFaceObserver([
    {
      family: "Inter",
      weight: "normal",
    },
  ]);
  useEffect(() => {
    let cleanup: ReturnType<typeof func>;
    let interval: ReturnType<typeof runAnimationWhenReady>;

    if (fontReady) {
      interval = runAnimationWhenReady(func);
    }

    return () => {
      clearInterval(interval);
      cleanup?.();
    };
  }, [...(deps || []), fontReady]);
};

export const IntroSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const appBackgroundRef = useAppBackgroundRef();

  const mobile = useMedia("sm");
  const height = useWindowHeight();
  const colors = useColors();

  const setTimeline = useSetRecoilState(IntroTimelineAtom);

  useEffectWhenReadyToAnimate(() => {
    const darkColor = colors.dark;
    const lightColor = "#ffffff";

    const textNodes = Array.from(
      contentRef.current?.querySelectorAll(`${TextPiece}`) ?? []
    );

    const textSymbolNodes = Array.from(
      document.querySelectorAll("[data-text-symbol]")
    );

    const scrollTriggerButtonNode = document.querySelector(
      "#scroll-trigger-button"
    );

    const symbolsWrapperNode = document.querySelector("#symbols-wrapper");

    const random = (number: number, offset: number) =>
      number + (Math.random() - 0.5) * offset;

    const ctx = gsap.context(() => {
      const wrapperNode = wrapperRef.current;

      const fadeInTimeline = gsap.timeline({
        defaults: {
          duration: 0.78,
          ease: "expo.out",
        },
      });

      fadeInTimeline.set(scrollTriggerButtonNode, { opacity: 0 });

      textNodes.slice().forEach((node, idx) => {
        const positions = [0, 0.35, 0.5];
        const multiplier = positions[idx];
        const vh = window.innerHeight * 0.5;
        const initialY = vh + vh * multiplier;

        fadeInTimeline.fromTo(
          node,
          {
            opacity: 0,
            y: initialY,
          },
          {
            opacity: 1,
            y: 0,
          },
          0
        );
      });

      fadeInTimeline.to(scrollTriggerButtonNode, {
        opacity: 1,
        ease: "power2.out",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: wrapperNode,
          start: "top top",
          end: "+=50%",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "none",
          duration: 1,
        },
      });

      fadeInTimeline.call(registerTextNodesScrollTrigger, undefined, "=+0.5");
      function registerTextNodesScrollTrigger() {
        textNodes
          .slice()
          .reverse()
          .forEach((node, index) => {
            const endingPoint = mobile ? 12.5 : 12.5;
            tl.fromTo(
              node,
              {
                y: "0vh",
                scale: 1,
                rotateX: "0deg",
                willChange: "transform, opacity, color",
                color: mobile ? darkColor : "inherit",
              },
              {
                y: `${endingPoint + 2.5 * (index / 2)}vh`,
                scale: 1 - 0.1 * (index / 2),
                rotateX: `-${4 + (1.5 * index) / 2}deg`,
              },
              0
            );

            if (index > 0) {
              tl.fromTo(
                node,
                {
                  opacity: 1,
                },
                {
                  opacity: 0,
                },
                0
              );
            }
          });
      }

      tl.fromTo(
        scrollTriggerButtonNode,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        0
      );

      tl.fromTo(
        mobile ? symbolsWrapperNode : [wrapperNode, symbolsWrapperNode],
        {
          color: darkColor,
        },
        {
          color: lightColor,
        },
        0
      );
      if (mobile) {
        const backgroundTimeline = gsap.timeline({
          scrollTrigger: {
            scroller: "#scroller",
            trigger: wrapperNode,
            start: "top+=35% top",
            end: "+=35%",
            // markers: true,
            scrub: true,
            // pinType: "transform",
            invalidateOnRefresh: true,
          },
          defaults: {
            ease: "none",
            duration: 1,
          },
        });

        backgroundTimeline.fromTo(
          appBackgroundRef.current,
          {
            backgroundColor: colors.white,
          },
          {
            backgroundColor: colors.dark,
          },
          0
        );
      } else {
        tl.fromTo(
          appBackgroundRef.current,
          {
            backgroundColor: colors.white,
          },
          {
            backgroundColor: colors.dark,
          },
          mobile ? 0.95 : 0
        );
      }

      const symbolsTimeline = gsap.timeline({
        scrollTrigger: Object.assign(
          {
            scroller: "#scroller",
            trigger: wrapperNode,
            // markers: true,
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
          mobile
            ? { start: "top+=15% top", end: "+=150%" }
            : { start: "top+=5% top", end: "+=75%" }
        ),
        defaults: {
          ease: "none",
          duration: 1,
        },
      });

      textSymbolNodes.forEach((node, idx) => {
        const direction = idx % 2;
        const left = direction ? `${random(90, 15)}vw` : `-${random(40, 15)}vw`;
        const xPercent = (direction ? 1 : -1) * random(25, 15);
        const rotation = (direction ? -1 : 1) * random(65, 10);

        symbolsTimeline.fromTo(
          node,
          {
            scale: 0.75,
            top: "100%",
            x: `${xPercent}vw`,
            y: "100%",
            display: "none",
          },
          {
            scale: mobile ? 10 : 20,
            top: "-100%",
            left,
            y: -height * 0.4,
            rotation,
            display: "block",
          },
          0.15 + 0.05 * idx
        );
        symbolsTimeline.set(node, {
          display: "none",
        });
      });

      setTimeline(tl);
    });

    return () => {
      ctx.revert();
      setTimeline(null);
      ScrollTrigger.refresh();
    };
  }, [
    appBackgroundRef,
    colors.dark,
    colors.dark80,
    colors.dark90,
    colors.white,
    height,
    mobile,
  ]);

  return (
    <>
      <Wrapper ref={wrapperRef} id="intro">
        <ContentContainer
          ref={contentRef}
          size="medium"
          css={{
            padding: "$30 0",
            [media.sm]: { padding: "$12 0" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: "$1",
          }}
        >
          <Text
            kind="product"
            variant="hero"
            css={Object.assign(
              { fontWeight: "400", color: "inherit" },
              mobile
                ? { fontSize: "2rem", lineHeight: "2.5rem" }
                : {
                    fontSize: "3.5rem",
                    lineHeight: "4.5rem",
                  }
            )}
          >
            <TextPiece>
              Hi, my name’s{" "}
              <span style={{ fontWeight: 600 }}>Nikita Trifan.</span>
            </TextPiece>
            <br /> <br />
            <TextPiece>
              I’m passionate about user interfaces. I code, prototype, design
              and lead engineering teams.
            </TextPiece>
            <br /> <br />
            <TextPiece>
              I’m mostly excited about world class work. Instant and smooth
              interfaces that feel like an extension of human mind.
            </TextPiece>
            <br /> <br />
          </Text>
          <Inline
            align="center"
            justifyContent="center"
            css={{
              padding: "$34 0 $28",
              [media.sm]: {
                padding: "$34 0 $12",
              },
            }}
          >
            <Button
              id="scroll-trigger-button"
              variant="ghost"
              size="large"
              css={{ opacity: 0 }}
              onClick={() => scrollToElement("show-case-search")}
              iconRight={<ArrowUpIcon rotation="180deg" />}
            >
              Let me break it down
            </Button>
          </Inline>
        </ContentContainer>
      </Wrapper>
      <div id="symbols-wrapper">
        {["6", "0", "f", "p", "s", "1", "0", "0", "m", "s"].map(
          (symbol, index) => {
            return (
              <Text
                key={`${symbol}--${index}`}
                data-text-symbol=""
                style={{
                  fontSize: mobile ? "20vw" : "10vw",
                  pointerEvents: "none",
                  display: "none",
                  position: "fixed",
                  left: "50%",
                  bottom: "0",
                  zIndex: 10,
                  transform: "translateX(-50%)",
                  color: "inherit",
                }}
              >
                {symbol}
              </Text>
            );
          }
        )}
      </div>
    </>
  );
};

const Wrapper = styled("div", {
  minHeight: getViewportHeightCssValue(100),
  paddingTop: getViewportHeightCssValue(10),
  willChange: "color",
  [media.sm]: {
    minHeight: "unset",
    willChange: "unset",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: "$2",
  color: "$colors$dark90",
});

const TextPiece = styled("span", {
  display: "inline-block",
  color: "inherit",
  opacity: 0,
  willChange: "transform, opacity",
  ["&.light"]: {
    color: "$colors$white !important",
  },
  ["&.dark"]: {
    color: "$colors$dark !important",
  },
});
