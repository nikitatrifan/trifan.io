import { useRef, useState, useEffect, ReactNode } from "react";
import { styled, Text } from "junoblocks";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { ContentContainer } from "@/components/ContentContainer";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

export const EntryIntro = ({ children }: { children: ReactNode }) => {
  const [renderingEntry, setRenderingEntry] = useState(true);
  return (
    <>
      {renderingEntry && (
        <Wrapper>
          <TextSequence
            onComplete={() => {
              setRenderingEntry(false);
            }}
          />
        </Wrapper>
      )}
      {children}
    </>
  );
};

const TextSequence = ({
  typedLines = ["Hey", "This is Nikita", "Nikita Trifan"],
  endingLine = "And I have a thing for interfaces.",
  onComplete = () => {},
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "none",
        },
        onComplete,
      });
      typedLines.forEach((value, index) => {
        timeline.fromTo(
          textRef.current,
          {
            text: { value: "" },
          },
          {
            text: { value },
          },
          index === 0 ? "+=0.15" : "+=1"
        );
      });
      timeline.set(
        textRef.current,
        {
          opacity: 0,
          text: { value: endingLine },
        },
        "+=1"
      );
      timeline.to(
        textRef.current,
        {
          opacity: 1,
        },
        "+=1"
      );
    });

    return () => context.revert();
  }, [onComplete]);

  return (
    <ContentContainer size="small">
      <Text
        kind="symbol"
        variant="header"
        color="white"
        align="center"
        ref={textRef}
      />
    </ContentContainer>
  );
};

const Wrapper = styled("div", {
  position: "fixed",
  left: 0,
  top: 0,
  height: getViewportHeightCssValue(100),
  width: "100%",
  zIndex: 99,
  backgroundColor: "$dark",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
