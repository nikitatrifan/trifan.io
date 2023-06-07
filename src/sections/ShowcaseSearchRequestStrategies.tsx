import {
  Button,
  Column,
  Inline,
  media,
  Text,
  useInvertedThemeClassName,
  useMedia,
} from "junoblocks";
import {
  ShowCaseSearchInput,
  useFocusedState,
} from "@/components/ShowCaseSearchInput";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRequestBookTitles } from "@/utils/useRequestBookTitles";
import { useVisibleInViewport } from "@/utils/useVisibleInViewportRef";
import useHover from "@react-hook/hover";
import { ShowcaseRequestsSequence } from "@/components/ShowcaseRequestsSequence";
import * as process from "process";
import { ShowcaseHeader } from "@/components/ShowcaseHeader";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { RequestsSequenceArray } from "@/utils/useRegisterRequests";
import dayjs from "dayjs";
import { ShowcaseSectionWrapper } from "@/components/ShowcaseSectionWrapper";

export const ShowcaseSearchRequestStrategies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const invertedThemeClassName = useInvertedThemeClassName();
  const visible = useVisibleInViewport(containerRef);

  const [requestStrategy, setRequestStrategy] = useState<"debounce" | "cancel">(
    "debounce"
  );

  const {
    bindInput,
    wrapperRef,
    results,
    bindRequestsSequence,
    requestStats,
    loading,
  } = useAssembleSearch(
    requestStrategy === "debounce" ? "debounce" : "cancel-irrelevant",
    visible
  );

  return (
    <ShowcaseSectionWrapper
      id="show-case-search"
      className={invertedThemeClassName}
    >
      <ShowcaseHeader
        subtitle="Uncompromisingly fast interfaces"
        title="Nature never waits"
        body="A word class interface matches the feel of natural world.
          Everything in our world reacts almost instantaneously and we have to
          match to that even if it feels subtle."
      />

      <ShowcaseGrid ref={containerRef}>
        <div>
          <Inline gap={2}>
            <Button
              size="large"
              variant="ghost"
              onClick={() => {
                setRequestStrategy("cancel");
              }}
              selected={requestStrategy === "cancel"}
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
          <ShowCaseSearchInput
            {...bindInput}
            placeholder="Request search"
            results={results}
            loading={loading}
          />
        </div>
        <div>
          <Inline
            gap={32}
            css={{
              paddingBottom: "$10",
              [media.sm]: {
                flexWrap: "wrap",
                rowGap: "$8",
              },
            }}
          >
            <Column gap={8}>
              <Text variant="title">input to data</Text>
              <Inline gap={24}>
                <Column gap={2}>
                  <Text
                    variant="title"
                    kind="symbol"
                    color={
                      requestStrategy === "debounce" ? "primary" : "tertiary"
                    }
                  >
                    {requestStats["debounce"]?.totalTimeToDataMs ?? 0}ms
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
                      requestStrategy === "cancel" ? "primary" : "tertiary"
                    }
                  >
                    {requestStats["cancel-irrelevant"]?.totalTimeToDataMs ?? 0}
                    ms
                  </Text>
                  <Text
                    variant="body"
                    color={
                      requestStrategy === "cancel" ? "primary" : "tertiary"
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
                      requestStrategy === "cancel" ? "primary" : "tertiary"
                    }
                  >
                    {requestStats["cancel-irrelevant"]?.numberOfRequests ?? 0}
                  </Text>
                  <Text
                    variant="body"
                    color={
                      requestStrategy === "cancel" ? "primary" : "tertiary"
                    }
                  >
                    cancellation
                  </Text>
                </Column>
              </Inline>
            </Column>
          </Inline>
          <ShowcaseRequestsSequence {...bindRequestsSequence} />
        </div>
      </ShowcaseGrid>
      {/*<Text*/}
      {/*  css={{ maxWidth: "512px", margin: "0 auto", padding: "$8" }}*/}
      {/*  align="center"*/}
      {/*  color="tertiary"*/}
      {/*>*/}
      {/*  Compare the two search implementations by typing the same query and*/}
      {/*  observe how you feel about their performance and user experience*/}
      {/*</Text>*/}
    </ShowcaseSectionWrapper>
  );
};

const phrases = [
  "the u",
  "the unseen path",
  "the tim",
  "the timeless bridge",
  "the wi",
  "the winter palace",
  "the sto",
  "the story of my life",
  "the sha",
  "the shadows",
  "the shadows of the self",
];

function match(value: string, startValue: string, endValue: string) {
  if (value.toLowerCase() === startValue.toLowerCase()) return true;
  if (value.length < startValue.length) return false;

  let matching = false;
  try {
    endValue
      .slice(startValue.length)
      .split("")
      .reduce((result, symbol) => {
        const currentValue = result + symbol.toLowerCase();

        if (matching) {
          throw "exit reduce";
        } else {
          matching = currentValue === value;
        }

        return currentValue;
      }, startValue.toLowerCase());
  } catch (e) {}
  return matching;
}

const useSearchRequestStats = ({
  requests,
  value,
}: {
  requests: RequestsSequenceArray;
  value: string;
}) => {
  // figure out when the user started typing; needed to figure out the end phrase
  const phraseBeginning = useRef<string>("");
  const [phrase, setPhrase] = useState<[string, string]>(["", ""]);

  useMemo(() => {
    if (!phraseBeginning.current) {
      phraseBeginning.current = value;
    }
  }, [value]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setPhrase([phraseBeginning.current, value]);
      phraseBeginning.current = "";
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  const requestsReference = useRef(requests);
  requestsReference.current = requests;
  return useMemo(() => {
    const [start, end] = phrase;

    const requestsInTheRange = requests.reduce((result, req) => {
      const [query] = req;

      if (match(query, start, end)) {
        result.push(req);
      }

      return result;
    }, [] as RequestsSequenceArray);

    let earliestRequestCreation = dayjs();
    let earliestRequestInitiation = dayjs();
    let latestRequestCreation: ReturnType<typeof dayjs> | undefined;
    let latestRequestInitiation: ReturnType<typeof dayjs> | undefined;
    let latestRequestCompletion: ReturnType<typeof dayjs> | undefined;

    for (let i = 0, l = requestsInTheRange.length; i < l; l++) {
      const [, { createdAt, initiatedAt, finishedAt }] = requestsInTheRange[i];
      if (earliestRequestCreation.isAfter(createdAt)) {
        earliestRequestCreation = createdAt;
      }
      if (initiatedAt && earliestRequestInitiation.isAfter(initiatedAt)) {
        earliestRequestInitiation = initiatedAt;
      }
      if (
        (!latestRequestCompletion && finishedAt) ||
        (latestRequestCompletion &&
          finishedAt &&
          latestRequestCompletion.isBefore(finishedAt))
      ) {
        latestRequestCreation = createdAt;
        latestRequestInitiation = initiatedAt;
        latestRequestCompletion = finishedAt;
      }
    }

    const totalTimeToDataMs =
      latestRequestCompletion &&
      latestRequestCreation &&
      latestRequestCompletion?.diff(latestRequestCreation);
    const requestToDataMs =
      latestRequestCompletion &&
      latestRequestInitiation &&
      latestRequestCompletion?.diff(latestRequestInitiation);
    const numberOfRequests = requestsInTheRange.reduce(
      (number, [, req]) => (req.status !== "created" ? number + 1 : number),
      0
    );

    return { totalTimeToDataMs, requestToDataMs, numberOfRequests };
  }, [phrase]);
};

const useAssembleSearch = (
  strategy: "debounce" | "cancel-irrelevant",
  enabled: boolean
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focused, bind] = useFocusedState();
  const hovering = useHover(wrapperRef);

  const [value, setValue] = useState("");
  const numberOfRequestsCaptured = useMedia("sm") ? 3 : 4;
  const { results, loading, requests } = useRequestBookTitles(
    value,
    strategy,
    numberOfRequestsCaptured
  );

  useFakeTyping({
    value,
    setValue,
    enabled: hovering || focused ? false : enabled,
    phrases,
  });

  const requestStats = useSearchRequestStats({ requests, value });
  const requestStatsReference = useRef<
    Record<
      "debounce" | "cancel-irrelevant",
      ReturnType<typeof useSearchRequestStats>
    >
  >({} as any);

  useMemo(() => {
    requestStatsReference.current[strategy] = requestStats;
  }, [requestStats]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && focused) {
      // @ts-ignore
      window.gtag("event", `interacted_w_search-${strategy}`);
      // @ts-ignore
      window.hj?.("event", `interacted_w_search-${strategy}`);
    }
  }, [focused, strategy]);

  return {
    results,
    loading,
    wrapperRef,
    requestStats: requestStatsReference.current,
    bindRequestsSequence: {
      numberOfRequestsCaptured,
      requests,
    },
    bindInput: {
      ...bind,
      value,
      onChange: (e: any) => setValue(e.target.value),
    },
  };
};

const useFakeTyping = ({
  value,
  setValue,
  enabled,
  phrases,
  delayBeforeEachRequestMs = 2500,
}: {
  value: string;
  setValue: (val: string) => void;
  enabled: boolean;
  phrases: Array<string>;
  delayBeforeEachRequestMs?: number;
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  const onCompletePhrase = useCallback(() => {
    const currentPhraseIndex = phrases.findIndex(
      (phrase) => phrase === currentPhrase
    );

    const nextPhraseIndex =
      currentPhraseIndex + 1 >= phrases.length ? 0 : currentPhraseIndex + 1;

    setTimeout(() => {
      setCurrentPhrase(phrases[nextPhraseIndex]);
    }, delayBeforeEachRequestMs);
  }, [currentPhrase, delayBeforeEachRequestMs, phrases]);

  useEffect(() => {
    const typeSpeedRangeMs = [66, 348];
    // const typeSpeedRangeMs = [1000, 3000];
    const waitMs =
      typeSpeedRangeMs[0] +
      (typeSpeedRangeMs[1] - typeSpeedRangeMs[0]) * Math.random();

    const currentIndex =
      value && currentPhrase.startsWith(value) ? value.length : 0;

    if (value === currentPhrase) {
      onCompletePhrase();
    } else if (enabled) {
      setTimeout(() => {
        setValue(currentPhrase.slice(0, currentIndex + 1));
      }, waitMs);
    }
  }, [enabled, value, currentPhrase, setValue, onCompletePhrase]);
};
