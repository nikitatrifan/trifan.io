import { ShowcaseHeader } from "@/components/ShowcaseHeader";
import { ContentContainer } from "@/components/ContentContainer";
import { useVisibleInViewport } from "@/utils/useVisibleInViewportRef";
import { useSetNavigationPanelTheme } from "@/components/NavigationPanel";
import { useEffect, useRef, useState } from "react";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import {
  ArrowUpIcon,
  Button,
  ButtonForWrapper,
  Column,
  Divider,
  IconWrapper,
  Inline,
  Spinner,
  styled,
  Text,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import { useAssemblePrefetchList } from "@/sections/ShowcasePreloadStrategies/useAssemblePrefetchList";
import { ShowcaseRequestsSequence } from "@/components/ShowcaseRequestsSequence";
import { AnimatePresence, motion } from "framer-motion";
import { useSimulateListInteractions } from "@/sections/ShowcasePreloadStrategies/useSimulateListInteractions";
import {
  ShowcasePrefetchList,
  useBindShowcasePrefetchList,
} from "@/components/ShowcasePrefetchList";

export const ShowcasePreloadStrategies = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const invertedThemeClassName = useInvertedThemeClassName();
  const visible = useVisibleInViewport(wrapperRef);
  const [focused, setFocused] = useState(false);

  useSetNavigationPanelTheme({
    elementId: "show-case",
    themeKind: "inverted",
  });

  const [requestStrategy, setRequestStrategy] = useState<
    "cancel-irrelevant" | "debounce"
  >("debounce");

  const { bind, requests, requestStats } = useBindShowcasePrefetchList({
    enabled: !focused && visible,
    strategy: requestStrategy,
  });

  return (
    <div
      id="show-case-preload"
      ref={wrapperRef}
      className={invertedThemeClassName}
    >
      <ContentContainer size="small" css={{ paddingBottom: "$16" }}>
        <ShowcaseHeader
          subtitle="Predict to preload"
          title={
            <>
              Predict users intent <br /> to allow for zero load
            </>
          }
          body="Interfaces that feel truly world class are brutally instant. Even if it might be hard to see the difference off the bat, interations like these will pile up and create a best in class interface feel."
        />
        <ShowcaseGrid>
          <div>
            <Inline gap={2}>
              <Button
                size="large"
                variant="ghost"
                onClick={() => {
                  setRequestStrategy("cancel-irrelevant");
                }}
                selected={requestStrategy === "cancel-irrelevant"}
                style={{
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Cancel irrelevant
              </Button>
              <Button
                size="large"
                variant="ghost"
                onClick={() => {
                  setRequestStrategy("debounce");
                }}
                selected={requestStrategy === "debounce"}
                style={{
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              >
                Debounce input
              </Button>
            </Inline>
            <ShowcasePrefetchList
              {...bind}
              onFocusChange={setFocused}
              strategy={requestStrategy}
            />
          </div>
          <div>
            <Inline gap={32} css={{ paddingBottom: "$10" }}>
              <Column gap={8}>
                <Text variant="title">click to data</Text>
                <Inline gap={24}>
                  <Column gap={2}>
                    <Text
                      variant="title"
                      kind="symbol"
                      color={
                        requestStrategy === "debounce" ? "primary" : "tertiary"
                      }
                    >
                      {requestStats["debounce"]?.navigateToDataMs ?? 0}ms
                    </Text>
                    <Text
                      variant="body"
                      color={
                        requestStrategy === "debounce" ? "primary" : "tertiary"
                      }
                    >
                      debounce
                    </Text>
                  </Column>

                  <Column gap={2}>
                    <Text
                      variant="title"
                      kind="symbol"
                      color={
                        requestStrategy === "cancel-irrelevant"
                          ? "primary"
                          : "tertiary"
                      }
                    >
                      {requestStats["cancel-irrelevant"]?.navigateToDataMs ?? 0}
                      ms
                    </Text>
                    <Text
                      variant="body"
                      color={
                        requestStrategy === "cancel-irrelevant"
                          ? "primary"
                          : "tertiary"
                      }
                    >
                      cancellation
                    </Text>
                  </Column>
                </Inline>
              </Column>
              <Column gap={8}>
                <Text variant="title"># of requests made</Text>
                <Inline gap={24}>
                  <Column gap={2}>
                    <Text
                      variant="title"
                      kind="symbol"
                      color={
                        requestStrategy === "debounce" ? "primary" : "tertiary"
                      }
                    >
                      {requestStats["debounce"]?.numberOfRequests ?? 0}
                    </Text>
                    <Text
                      variant="body"
                      color={
                        requestStrategy === "debounce" ? "primary" : "tertiary"
                      }
                    >
                      debounce
                    </Text>
                  </Column>

                  <Column gap={2}>
                    <Text
                      variant="title"
                      kind="symbol"
                      color={
                        requestStrategy === "cancel-irrelevant"
                          ? "primary"
                          : "tertiary"
                      }
                    >
                      {requestStats["cancel-irrelevant"]?.numberOfRequests ?? 0}
                    </Text>
                    <Text
                      variant="body"
                      color={
                        requestStrategy === "cancel-irrelevant"
                          ? "primary"
                          : "tertiary"
                      }
                    >
                      cancellation
                    </Text>
                  </Column>
                </Inline>
              </Column>
            </Inline>
            <ShowcaseRequestsSequence
              requests={requests}
              numberOfRequestsCaptured={4}
            />
          </div>
        </ShowcaseGrid>
        <Text
          css={{ maxWidth: "512px", margin: "0 auto", padding: "$8" }}
          align="center"
          color="tertiary"
        >
          In this example, we initiate requests when a user hovers over a link.
          On the right side, requests are debounced, while on the left side,
          they are canceled if they become irrelevant. If you‘re concerned about
          resource usage, the backend can listen for cancellation events and
          stop processing accordingly. Try interacting with both sides to
          compare the experience. This difference may be more noticeable on
          desktop devices.
        </Text>
      </ContentContainer>
    </div>
  );
};

const RequestPrefetchList = ({
  strategy,
  enabled,
  onFocusChange,
}: {
  strategy: "debounce" | "cancel-irrelevant";
  enabled: boolean;
  onFocusChange: (val: boolean) => void;
}) => {
  const {
    state: {
      genres,
      loading,
      currentGenre,
      requests,
      requestStats,
      results,
      route,
    },
    actions: { selectGenre, prefetch, navigateToGenres, clearGenreSelection },
  } = useAssemblePrefetchList(strategy);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const backButtonRef = useRef<HTMLButtonElement>(null);
  const listParentRef = useRef<HTMLDivElement>(null);

  const requestSimulateInteractions = Boolean(enabled && genres?.length);
  const [simulateInteractions, setSimulateInteractions] = useState(false);
  useEffect(() => {
    if (requestSimulateInteractions) {
      const timeout = setTimeout(() => setSimulateInteractions(true), 1500);
      return () => clearTimeout(timeout);
    } else {
      setSimulateInteractions(false);
    }
  }, [requestSimulateInteractions]);

  useSimulateListInteractions({
    listParentRef,
    backButtonRef,
    enabled: simulateInteractions,
    resetRouteState: useRef(navigateToGenres).current,
    indexesToInteractWith: useRef(
      strategy === "debounce" ? [0, 1, 2] : [5, 4, 3]
    ).current,
  });

  useEffect(() => {
    let interacted = false;

    function handleClick() {
      if (process.env.NODE_ENV === "production" && !interacted) {
        interacted = true;
        // @ts-ignore
        window.gtag?.("event", "preload_showcase_interacted");
        // @ts-ignore
        window.hj?.("event", "preload_showcase_interacted");
      }
    }

    const node = wrapperRef.current as HTMLDivElement;
    node.addEventListener("click", handleClick);

    return () => {
      node.removeEventListener("click", handleClick);
    };
  }, []);

  const focusedTimerRef = useRef<NodeJS.Timer>();

  function handleRegisterFocus() {
    clearTimeout(focusedTimerRef.current);
    onFocusChange(true);
    focusedTimerRef.current = setTimeout(() => {
      onFocusChange(false);
    }, 2000);
  }

  const mobile = useMedia("sm");

  return (
    <Column gap={8}>
      <Wrapper
        ref={wrapperRef}
        onTouchStart={handleRegisterFocus}
        onTouchEnd={() => onFocusChange(false)}
        onMouseMove={mobile ? undefined : handleRegisterFocus}
        onMouseLeave={mobile ? undefined : () => onFocusChange(false)}
      >
        <Header>
          <div style={{ height: "32px", position: "relative" }}>
            <AnimatePresence
              onExitComplete={() => {
                /* clear genre selection as soon as we're done animating */
                if (route === "genres") {
                  clearGenreSelection();
                }
              }}
            >
              {route === "genres" && (
                <motion.div
                  key="genres"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    translateY: "-50%",
                  }}
                  exit={{
                    translateX: -10,
                    opacity: 0,
                  }}
                  initial={{
                    translateX: -10,
                    opacity: 0,
                  }}
                  animate={{
                    translateX: 0,
                    opacity: 1,
                  }}
                >
                  <Text css={{ padding: "$3" }} variant="primary">
                    Choose genre
                  </Text>
                </motion.div>
              )}
              {route === "titles" && (
                <motion.div
                  key="titles"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    translateY: "-50%",
                  }}
                  exit={{
                    translateX: 10,
                    opacity: 0,
                  }}
                  initial={{
                    translateX: 10,
                    opacity: 0,
                  }}
                  animate={{
                    translateX: 0,
                    opacity: 1,
                  }}
                >
                  <Button
                    onClick={navigateToGenres}
                    iconLeft={<ArrowUpIcon rotation="-90deg" />}
                    variant="ghost"
                    ref={backButtonRef}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {currentGenre}
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Header>
        <Divider />
        <ListScroller onScroll={handleRegisterFocus}>
          <AnimatePresence>
            {route === "genres" && (
              <ListWrapper
                ref={listParentRef}
                key="genres"
                transition={{
                  translateX: { type: "spring", stiffness: 300, damping: 30 },
                }}
                exit={{
                  translateX: "-50%",
                  opacity: 0,
                }}
                initial={{
                  translateX: "-50%",
                  opacity: 0,
                }}
                animate={{
                  translateX: "0%",
                  opacity: 1,
                }}
              >
                {genres?.map((item) => (
                  <StyledButtonForRow
                    onMouseEnter={() => prefetch(item)}
                    onClick={() => selectGenre(item)}
                    role="listitem"
                    variant="ghost"
                    iconRight={
                      loading && item === currentGenre ? (
                        <IconWrapper icon={<Spinner color="primary" />} />
                      ) : (
                        <ArrowUpIcon rotation="90deg" />
                      )
                    }
                    key={item}
                  >
                    <Text css={{ textTransform: "capitalize" }} variant="body">
                      {item}
                    </Text>
                  </StyledButtonForRow>
                )) ?? (
                  <Column
                    align="center"
                    justifyContent="center"
                    css={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Spinner instant={false} color="primary" />
                  </Column>
                )}
              </ListWrapper>
            )}
            {route === "titles" && (
              <ListWrapper
                key="titles"
                transition={{
                  translateX: { type: "spring", stiffness: 300, damping: 30 },
                }}
                exit={{
                  translateX: "50%",
                  opacity: 0,
                }}
                initial={{
                  translateX: "50%",
                  opacity: 0,
                }}
                animate={{
                  translateX: "0%",
                  opacity: 1,
                }}
              >
                {results?.map((item) => (
                  <StyledButtonForRow
                    role="listitem"
                    variant="ghost"
                    key={item}
                  >
                    <Text variant="body">{item}</Text>
                  </StyledButtonForRow>
                ))}
              </ListWrapper>
            )}
          </AnimatePresence>
        </ListScroller>
      </Wrapper>
      <ShowcaseRequestsSequence
        requests={requests}
        numberOfRequestsCaptured={numberOfRequestsCaptured}
      />
    </Column>
  );
};

const Wrapper = styled("div", {
  backgroundColor: "$colors$dark5",
  borderRadius: "6px",
});

const Header = styled("div", {
  padding: "$6 $12",
  position: "relative",
});

const ListScroller = styled("div", {
  height: "min(max(300px, 10vh), 450px)",
  overflow: "hidden",
  position: "relative",
});

const ListWrapper = styled(motion.div, {
  padding: "$4 $8 0",
  height: "100%",
  overflow: "scroll",
  "-webkit-overflow-scroll": "touch",
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
});

const StyledButtonForRow = styled(ButtonForWrapper, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "$4 $6 !important",
  userSelect: "none",
  cursor: "pointer",
  marginBottom: "$2",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:last-child": {
    marginBottom: 0,
  },
  "&.hover": {
    backgroundColor: "$colors$dark10",
  },
  "&.clicked": {
    backgroundColor: "$colors$dark5",
  },
});
