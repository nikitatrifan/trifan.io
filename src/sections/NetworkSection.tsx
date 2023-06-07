import { ShowcaseSearchRequestStrategies } from "@/sections/ShowcaseSearchRequestStrategies";
import { ShowcasePreloadStrategies } from "@/sections/ShowcasePreloadStrategies";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppBackgroundRef } from "@/components/AppBackground";
import { styled, useColors } from "junoblocks";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";

export const NetworkSection = () => {
  const backgroundRef = useAppBackgroundRef();
  const colors = useColors();
  const wrapperRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   const context = gsap.context(() => {
  //     const bgTimeline = gsap.timeline({
  //       scrollTrigger: {
  //         scroller: "#scroller",
  //         trigger: wrapperRef.current,
  //         start: "top-=10% top+=50%",
  //         // markers: true,
  //         end: "+=10%",
  //         scrub: true,
  //         // preventOverlaps: true,
  //         refreshPriority: 1,
  //         // invalidateOnRefresh: true,
  //       },
  //       defaults: {
  //         ease: "none",
  //         duration: 1,
  //       },
  //     });
  //
  //     // bgTimeline.fromTo(
  //     //   backgroundRef.current,
  //     //   {
  //     //     background: colors.white,
  //     //   },
  //     //   {
  //     //     background: colors.dark,
  //     //   },
  //     //   0
  //     // );
  //   });
  //
  //   return () => {
  //     context.revert();
  //   };
  // });

  return (
    <section ref={wrapperRef}>
      <ShowcaseSearchRequestStrategies />
      <ShowcasePreloadStrategies />
    </section>
  );
};

const Wrapper = styled("div", {
  position: "relative",
  minHeight: getViewportHeightCssValue(100),
});
