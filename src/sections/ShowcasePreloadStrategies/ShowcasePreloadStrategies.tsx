import { ShowcaseHeader } from "@/components/ShowcaseHeader";
import { useVisibleInViewport } from "@/utils/useVisibleInViewportRef";
import { useRef, useState } from "react";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import {
  Button,
  Column,
  Inline,
  media,
  Text,
  useInvertedThemeClassName,
} from "junoblocks";
import { ShowcaseRequestsSequence } from "@/components/ShowcaseRequestsSequence";
import {
  ShowcasePrefetchList,
  useBindShowcasePrefetchList,
} from "@/components/ShowcasePrefetchList";
import { ShowcaseSectionWrapper } from "@/components/ShowcaseSectionWrapper";

export const ShowcasePreloadStrategies = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const invertedThemeClassName = useInvertedThemeClassName();
  const visible = useVisibleInViewport(wrapperRef);
  const [focused, setFocused] = useState(false);

  const [requestStrategy, setRequestStrategy] = useState<
    "cancel-irrelevant" | "debounce"
  >("debounce");

  const { bind, requests, requestStats } = useBindShowcasePrefetchList({
    enabled: !focused && visible,
    strategy: requestStrategy,
  });

  return (
    <ShowcaseSectionWrapper
      id="show-case-preload"
      ref={wrapperRef}
      className={invertedThemeClassName}
    >
      <ShowcaseHeader
        subtitle="Predict to preload"
        title={<>Allow for zero load</>}
        body="Interfaces that feel truly world class are brutally instant. Even if it might be hard to see the difference off the bat, interactions like these will pile up and create a best in class interface feel."
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
          <ShowcasePrefetchList {...bind} onFocusChange={setFocused} />
          <Text css={{ maxWidth: "512px", padding: "$8" }} color="tertiary">
            <>
              {requestStrategy === "debounce" && (
                <>
                  By the way of debouncing: read hover intent - once you hover
                  on a link we wait for 150ms and if the cursor stayed on the
                  link within the timeframe we kick off the request for data
                </>
              )}
              {requestStrategy === "cancel-irrelevant" && (
                <>
                  By the way of request cancellation: kick off requests as soon
                  as you hover on a link, but cancel them once you‘ve hovered
                  out
                </>
              )}
            </>
          </Text>
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
    </ShowcaseSectionWrapper>
  );
};
