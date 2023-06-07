import { ComponentPropsWithRef, forwardRef, ReactNode } from "react";
import { styled } from "junoblocks";
import { ContentContainer } from "@/components/ContentContainer";

const Wrapper = styled("div", {
  width: "100%",
  padding: "$32 0",
});

export const ShowcaseSectionWrapper = forwardRef(
  function ShowcaseSectionWrapper(
    { children, ...props }: ComponentPropsWithRef<typeof Wrapper>,
    ref: ComponentPropsWithRef<typeof Wrapper>["ref"]
  ) {
    return (
      <Wrapper {...props} ref={ref}>
        <ContentContainer size="medium">{children}</ContentContainer>
      </Wrapper>
    );
  }
);
