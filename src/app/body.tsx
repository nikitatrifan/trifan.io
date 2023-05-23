"use client";

import { media, styled, useMedia, useThemeClassName } from "junoblocks";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";

import { useIsRenderingOnServerSide } from "@/app/useIsRenderingOnServerSide";
import { useApplyThemeConfiguration } from "@/app/useApplyThemeConfiguration";
import { BackgroundNoise } from "@/components/BackgroundNoise";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AppBackground } from "@/components/AppBackground";
import { Toaster } from "react-hot-toast";
import {
  FixMobileViewportHeightBounce,
  getViewportHeightCssValue,
} from "@/components/FixMobileViewportHeightBounce";
import { EntryIntro } from "@/app/EntryIntro";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 60000,
    },
  },
});

function BodyContents({ children }: Props) {
  const isRenderingOnServerSide = useIsRenderingOnServerSide();

  const themeClassName = useThemeClassName();
  // useSubscribeDefaultAppTheme()
  useApplyThemeConfiguration();

  const isSmallScreen = useMedia("sm");

  return (
    <body>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NJM64WS"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <StyledContentWrapper
        data-app-wrapper=""
        id="scroller"
        lang="en-US"
        // @ts-ignore
        className={isRenderingOnServerSide ? null : themeClassName}
        suppressHydrationWarning={true}
      >
        {isRenderingOnServerSide ? null : (
          <>
            <FixMobileViewportHeightBounce />
            <BackgroundNoise />
            <AppBackground />
            <Toaster
              position={isSmallScreen ? "bottom-center" : "top-right"}
              toastOptions={{ duration: 100000 }}
              containerClassName={themeClassName}
              containerStyle={isSmallScreen ? { inset: 0 } : undefined}
            />
            {children}
          </>
        )}
      </StyledContentWrapper>
    </body>
  );
}

export function Body({ children }: Props) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BodyContents>{children}</BodyContents>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const StyledContentWrapper = styled("div", {
  backgroundColor: "$backgroundColors$base",
  overflowX: "hidden",
  height: getViewportHeightCssValue(100),
  overflowY: "scroll",
  "-webkit-overflow-scroll": "touch",
});
