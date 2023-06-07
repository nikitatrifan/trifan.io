import {
  BookApiResponse,
  useAssemblePrefetchList,
} from "@/sections/ShowcasePreloadStrategies/useAssemblePrefetchList";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSimulateListInteractions } from "@/sections/ShowcasePreloadStrategies/useSimulateListInteractions";
import {
  ArrowUpIcon,
  Button,
  ButtonForWrapper,
  Column,
  Divider,
  IconWrapper,
  Spinner,
  styled,
  Text,
  useMedia,
} from "junoblocks";
import { AnimatePresence, motion } from "framer-motion";

export type PrefetchStrategyType = "debounce" | "cancel-irrelevant";

export const useBindShowcasePrefetchList = ({
  enabled,
  strategy,
}: {
  enabled: boolean;
  strategy: PrefetchStrategyType;
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

  const backButtonRef = useRef<HTMLButtonElement>(null);
  const listParentRef = useRef<HTMLDivElement>(null);

  useSimulateListInteractions({
    listParentRef,
    backButtonRef,
    enabled: simulateInteractions,
    resetRouteState: useRef(navigateToGenres).current,
    itemIndexesRange: useRef([0, 1, 2, 3, 4, 5]).current,
  });

  return {
    bind: {
      listParentRef,
      backButtonRef,
      route,
      genres,
      results,
      loading,
      currentGenre,
      requests,
      onSelectGenre: selectGenre,
      onPrefetchGenre: prefetch,
      onNavigateToGenres: navigateToGenres,
      onClearGenreSelection: clearGenreSelection,
    },
    requests,
    requestStats,
  } as const;
};

type ShowcasePrefetchListProps = {
  onFocusChange: (val: boolean) => void;
  backButtonRef: MutableRefObject<HTMLButtonElement | null>;
  listParentRef: MutableRefObject<HTMLDivElement | null>;
  route: "genres" | "titles";
  genres: BookApiResponse["result"];
  results: BookApiResponse["result"];
  currentGenre?: string;
  loading: boolean;
  onSelectGenre: (genre: string) => void;
  onPrefetchGenre: (genre: string) => void;
  onNavigateToGenres: () => void;
  onClearGenreSelection: () => void;
};

export const ShowcasePrefetchList = ({
  onFocusChange,
  backButtonRef,
  listParentRef,
  route,
  genres,
  results,
  currentGenre,
  loading,
  onSelectGenre,
  onPrefetchGenre,
  onNavigateToGenres,
  onClearGenreSelection,
}: ShowcasePrefetchListProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
                  onClearGenreSelection();
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
                    onClick={onNavigateToGenres}
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
                    onMouseEnter={() => onPrefetchGenre(item)}
                    onClick={() => onSelectGenre(item)}
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
