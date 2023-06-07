"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/sections/Footer";
import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/SectionLoader";

const DynamicIntroSection = dynamic(
  () => import("@/sections/IntroSection").then((mod) => mod.IntroSection),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicNetworkSection = dynamic(
  () => import("@/sections/NetworkSection").then((mod) => mod.NetworkSection),
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

const DynamicThemeModel = dynamic(
  () =>
    import("@/components/ThemeModel/ThemeModel").then((mod) => mod.ThemeModel),
  {
    loading: () => <SectionLoader />,
  }
);

const DynamicStatementSection = dynamic(
  () =>
    import("@/sections/StatementSection").then((mod) => mod.StatementSection),
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
      <DynamicIntroSection />
      <DynamicNetworkSection />
      <DynamicStatementSection />
      <DynamicStoryBehind />
      <Footer />
      <SortScrollTrigger />
      <DynamicThemeModel />
    </>
  );
}
