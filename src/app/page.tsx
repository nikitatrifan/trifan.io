"use client";

import { NavigationPanel } from "@/components/NavigationPanel";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/sections/Footer";
import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/SectionLoader";

const DynamicApproachDifference = dynamic(
  () =>
    import("@/sections/ApproachDifference").then(
      (mod) => mod.ApproachDifference
    ),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicSmoothFrameRate = dynamic(
  () =>
    import("@/sections/SmoothFrameSpeed").then((mod) => mod.SmoothFrameSpeed),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicShowcaseSearchRequestStrategies = dynamic(
  () =>
    import("@/sections/ShowcaseSearchRequestStrategies").then(
      (mod) => mod.ShowcaseSearchRequestStrategies
    ),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicShowcasePreloadStrategies = dynamic(
  () =>
    import(
      "@/sections/ShowcasePreloadStrategies/ShowcasePreloadStrategies"
    ).then((mod) => mod.ShowcasePreloadStrategies),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicStoryBehind = dynamic(
  () => import("@/sections/StoryBehind").then((mod) => mod.StoryBehind),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicOutro = dynamic(
  () => import("@/sections/Outro").then((mod) => mod.Outro),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicTongueModel = dynamic(
  () =>
    import("@/components/ThemeModel/ThemeModel").then((mod) => mod.ThemeModel),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicWhyNotPrerecorded = dynamic(
  () =>
    import("@/sections/WhyNotPrerecorded").then((mod) => mod.WhyNotPrerecorded),
  {
    loading: () => <SectionLoader />,
  }
);

function SortScrollTrigger() {
  useEffect(() => {
    function sort() {
      ScrollTrigger.sort();
    }

    window.addEventListener("load", sort);
    setTimeout(sort, 1000);
  }, []);

  return null;
}

export default function Home() {
  return (
    <>
      <NavigationPanel />
      <DynamicApproachDifference />
      <DynamicShowcaseSearchRequestStrategies />
      <DynamicShowcasePreloadStrategies />
      <DynamicSmoothFrameRate />
      <DynamicWhyNotPrerecorded />
      <DynamicStoryBehind />
      <DynamicOutro />
      <Footer />
      <SortScrollTrigger />
      <DynamicTongueModel />
    </>
  );
}
