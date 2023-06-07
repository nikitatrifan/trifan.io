"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/sections/Footer";
import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/SectionLoader";
import { IntroSection } from "@/sections/IntroSection";
import { NetworkSection } from "@/sections/NetworkSection";
import { StatementSection } from "@/sections/StatementSection";
import { StoryBehind } from "@/sections/StoryBehind";

const DynamicThemeModel = dynamic(
  () =>
    import("@/components/ThemeModel/ThemeModel").then((mod) => mod.ThemeModel),
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
      <IntroSection />
      <NetworkSection />
      <StatementSection />
      <StoryBehind />
      <Footer />
      <SortScrollTrigger />
      <DynamicThemeModel />
    </>
  );
}
