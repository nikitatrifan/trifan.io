import { ContentContainer } from "@/components/ContentContainer";
import { Button, Inline, styled, Text, useMedia } from "junoblocks";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useWindowHeight } from "@react-hook/window-size/throttled";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";
import { scrollToElement } from "@/utils/scrollToElement";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";

export const ApproachDifference = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const mobile = useMedia("sm");
  const height = useWindowHeight();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapperNode = wrapperRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: "#scroller",
          trigger: wrapperNode,
          start: "top top",
          end: "+=50%",
          scrub: 0.35,
          pin: true,
          preventOverlaps: true,
          refreshPriority: 1,
          // pinType: "transform",
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "none",
          duration: 1,
        },
        onStart: ScrollTrigger.refresh,
        onComplete: ScrollTrigger.refresh,
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
            },
            {
              scale: mobile ? 10 : 20,
              top: "-100%",
              left,
              y: -height * 0.4,
              rotation,
              display: "block",
            },
            0.05 * idx
          );
          tl.set(node, {
            display: "none",
          });
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [height, mobile]);

  useSetNavigationPanelTheme({
    elementId: "intro",
    themeKind: "default",
  });

  return (
    <>
      <Wrapper ref={wrapperRef} id="intro">
        <ContentContainer
          ref={contentRef}
          size="medium"
          css={{
            padding: "$30 0",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: "$1",
          }}
        >
          <Text
            kind="symbol"
            variant={mobile ? "primary" : "header"}
            align="center"
          >
            Truly excellent UIs take only 10% more time to build if you have the
            understanding how.
            <br /> <br />
          </Text>

          <Text
            kind="symbol"
            variant={mobile ? "primary" : "header"}
            align="center"
          >
            And yet it creates the most non linear outcomes. Makes users come
            back for more. Makes companies buzz your phone.
          </Text>
          <Inline
            align="center"
            justifyContent="center"
            css={{ padding: "$34 0 $28" }}
          >
            <Button
              variant="ghost"
              size="large"
              onClick={() => scrollToElement("show-case-search")}
            >
              Learn more
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: "$2",
});
