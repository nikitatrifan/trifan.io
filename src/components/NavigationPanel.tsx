import {
  Button,
  ButtonWithDropdown,
  IconWrapper,
  Inline,
  media,
  styled,
  useInvertedThemeClassName,
  useMedia,
  Text,
} from "junoblocks";
import { useEffect, useRef, useState } from "react";
import { useWindowHeight } from "@react-hook/window-size/throttled";
import { scrollToElement } from "@/utils/scrollToElement";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChevronIcon } from "@/assets/ChevronIcon";

type NavPanelThemeKind = "default" | "inverted";

const NavigationPanelThemeSettingAtom = atom<Record<string, NavPanelThemeKind>>(
  {
    key: "NavigationPanelThemeSettingAtom",
    default: {},
  }
);

export const useSetNavigationPanelTheme = ({
  elementId,
  themeKind,
}: {
  elementId: string;
  themeKind: NavPanelThemeKind;
}) => {
  const setTheme = useSetRecoilState(NavigationPanelThemeSettingAtom);
  useEffect(() => {
    setTheme((theme) => ({ ...theme, [elementId]: themeKind }));
  }, [setTheme, elementId, themeKind]);
};

export function NavigationPanel() {
  const [invertTheme, setInvertTheme] = useState(false);
  const invertedThemeClassName = useInvertedThemeClassName();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("intro");

  const height = useWindowHeight();
  const mobile = useMedia("sm");

  const settings = useRecoilValue(NavigationPanelThemeSettingAtom);

  useEffect(() => {
    const observerOptions = {
      rootMargin: `${0}px 0px 0px 0px`,
      threshold: 0.5,
    };

    const themeAttributeName = "data-nav-theme";

    const observer = new IntersectionObserver(function observerCallback(
      entries
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const expectedThemeForPanel =
            entry.target.getAttribute(themeAttributeName);
          setInvertTheme(expectedThemeForPanel === "inverted");
          const entryId = entry.target.getAttribute("id") || "";
          setActiveSection(entryId);
        }
      });
    },
    observerOptions);

    Object.keys(settings).forEach((elementId) => {
      const themeKind: NavPanelThemeKind = settings[elementId as string];
      const nodeElement = document.querySelector(`#${elementId}`);
      if (nodeElement) {
        nodeElement.setAttribute(themeAttributeName, themeKind);
        observer.observe(nodeElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [height, settings]);

  const renderedNavigationLinks = <></>;

  return (
    <Container
      ref={containerRef}
      className={invertTheme ? invertedThemeClassName : undefined}
    >
      <Button variant="ghost" onClick={() => scrollToElement("hero")}>
        <Text kind="symbol" variant="title">
          Trifan
        </Text>
      </Button>
      <Inline gap="2">
        {mobile ? (
          <ButtonWithDropdown
            dropdown={renderedNavigationLinks}
            iconRight={<IconWrapper icon={<ChevronIcon />} />}
          >
            Menu
          </ButtonWithDropdown>
        ) : (
          renderedNavigationLinks
        )}
        <Button variant="primary">Contact</Button>
      </Inline>
    </Container>
  );
}

const Container = styled("nav", {
  padding: "$12 $16",
  [media.sm]: {
    padding: "$8",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: "$3",
  width: "100%",
});
