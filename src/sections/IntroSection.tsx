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

export const IntroSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const appBackgroundRef = useAppBackgroundRef();

  const mobile = useMedia("sm");
  const height = useWindowHeight();
  const colors = useColors();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapperNode = wrapperRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: wrapperNode,
          start: "top top",
          end: "+=50%",
          scrub: true,
          // pinType: "transform",
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "none",
          duration: 1,
        },
      });

      const textNodes = Array.from(
        contentRef.current?.querySelectorAll(`${TextPiece}`) ?? []
      ).reverse();
      textNodes.forEach((node, index) => {
        tl.fromTo(
          node,
          {
            y: "0vh",
            scale: 1,
            rotateX: "0deg",
            color: colors.dark90,
          },
          {
            y: `${7 + 2.5 * (index / 2)}vh`,
            scale: 1 - 0.1 * (index / 2),
            rotateX: `-${4 + (1.5 * index) / 2}deg`,
            color: colors.white,
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

      const random = (number: number, offset: number) =>
        number + (Math.random() - 0.5) * offset;

      Array.from(document.querySelectorAll("[data-text-symbol]")).forEach(
        (node, idx) => {
          const direction = idx % 2;
          const left = direction
            ? `${random(90, 15)}vw`
            : `-${random(40, 15)}vw`;
          const xPercent = (direction ? 1 : -1) * random(25, 15);
          const rotation = (direction ? -1 : 1) * random(65, 10);

          tl.fromTo(
            node,
            {
              scale: 0.75,
              top: "100%",
              x: `${xPercent}vw`,
              y: "100%",
              display: "none",
              color: colors.dark90,
            },
            {
              scale: mobile ? 10 : 20,
              top: "-100%",
              left,
              y: -height * 0.4,
              rotation,
              display: "block",
              color: colors.white,
            },
            0.05 * idx
          );
          tl.set(node, {
            display: "none",
          });
        }
      );

      tl.fromTo(
        document.querySelector("#intro-section-scroll"),
        {
          color: colors.dark90,
          fill: colors.dark90,
          opacity: 1,
        },
        {
          color: colors.white,
          fill: colors.white,
          opacity: 0,
        },
        0
      );

      tl.fromTo(
        appBackgroundRef.current,
        {
          backgroundColor: colors.white,
        },
        {
          backgroundColor: colors.dark,
        },
        0
      );
    });

    return () => {
      ctx.revert();
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
              { fontWeight: "400" },
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
              id="intro-section-scroll"
              variant="ghost"
              size="large"
              onClick={() => scrollToElement("show-case-search")}
              iconRight={<ArrowUpIcon rotation="180deg" />}
            >
              Let me break it down
            </Button>
          </Inline>
        </ContentContainer>
        {["6", "0", "f", "p", "s", "1", "0", "0", "m", "s"].map(
          (symbol, index) => {
            return (
              <Text
                key={`${symbol}--${index}`}
                data-text-symbol=""
                style={{
                  fontSize: mobile ? "20vw" : "10vw",
                  pointerEvents: "none",
                  display: "block",
                  position: "absolute",
                  left: "50%",
                  bottom: "0",
                  zIndex: 10,
                  transform: "translateX(-50%)",
                }}
              >
                {symbol}
              </Text>
            );
          }
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled("div", {
  minHeight: getViewportHeightCssValue(100),
  paddingTop: getViewportHeightCssValue(10),
  [media.sm]: {
    minHeight: "unset",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: "$2",
});

const TextPiece = styled("span", {
  display: "inline-block",
});
