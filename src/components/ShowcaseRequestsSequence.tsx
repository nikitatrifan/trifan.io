import {
  RequestItemStatus,
  RequestSequenceItem,
} from "@/utils/useRegisterRequests";
import { Column, Inline, styled, Text } from "junoblocks";
import { CSSProperties, useMemo } from "react";
import dayjs from "dayjs";

export const ShowcaseRequestsSequence = ({
  requests,
  numberOfRequestsCaptured,
}: {
  requests: Array<[string, RequestSequenceItem]> | undefined;
  numberOfRequestsCaptured: number;
}) => {
  const getFilteredRequests = () => {
    /* show only initiated requests
     * cut requests list up to the number */
    if (requests) {
      const initiatedRequests = requests.filter(([, request]) =>
        Boolean(request.initiatedAt)
      );

      if (initiatedRequests.length >= numberOfRequestsCaptured) {
        return initiatedRequests.slice(0, numberOfRequestsCaptured);
      }

      return initiatedRequests;
    }
  };

  const filteredRequests = getFilteredRequests();

  const stats = useMemo(() => {
    let earliestTakeOff: dayjs.Dayjs | undefined;

    /* find the earliest take off and last finished at */
    filteredRequests?.forEach(([, request]) => {
      if (!earliestTakeOff) {
        earliestTakeOff = request.initiatedAt;
      }

      /* the earliest take off time */
      if (earliestTakeOff?.isAfter(request.initiatedAt)) {
        earliestTakeOff = request.initiatedAt;
      }
    });

    const longestRequestDurationMs = earliestTakeOff
      ? dayjs()?.diff(earliestTakeOff, "ms")
      : 0;

    return {
      lastTimestamp: dayjs(),
      longestRequestDurationMs,
      earliestTakeOff,
    };
  }, [filteredRequests]);

  return (
    <Column gap={6}>
      {filteredRequests?.map(([key, value], index) => {
        const durationMs = value.finishedAt
          ? value.finishedAt.diff(value.initiatedAt, "ms")
          : dayjs().diff(value.initiatedAt, "ms");

        return (
          <SequenceRow
            key={`${key}--${index}`}
            value={value}
            stats={stats}
            requestKey={key}
            durationMs={durationMs}
          />
        );
      })}
      {(filteredRequests?.length ?? 0) < numberOfRequestsCaptured
        ? new Array(numberOfRequestsCaptured - (filteredRequests?.length ?? 0))
            .fill(null)
            .map((_, index) => (
              <SequenceRow
                visible={false}
                key={index}
                value={{} as any}
                stats={{} as any}
                requestKey="ghost row"
                durationMs={0}
              />
            ))
        : null}
    </Column>
  );
};

const getRequestStatusColor = (status: RequestItemStatus) => {
  switch (status) {
    case "fulfilled":
      return "valid";
    case "cancelled":
      return "error";
    default:
      return "tertiary";
  }
};

const SequenceRow = ({
  visible = true,
  value,
  stats = {} as any,
  requestKey,
  durationMs,
}: {
  visible?: boolean;
  stats?: {
    lastTimestamp: dayjs.Dayjs;
    longestRequestDurationMs: number;
    earliestTakeOff: dayjs.Dayjs | undefined;
  };
  value: RequestSequenceItem;
  requestKey: string;
  durationMs: number;
}) => {
  return (
    <Wrapper css={!visible ? { visibility: "hidden" } : undefined}>
      <TimelineRenderer
        initiatedAt={value.initiatedAt}
        finishedAt={value.finishedAt}
        earliestTakeOff={stats.earliestTakeOff}
        longestRequestDurationMs={stats.longestRequestDurationMs}
        lastTimestamp={stats.lastTimestamp}
        status={value.status}
      />
      <Inline css={{ width: "100%" }} justifyContent="space-between">
        <Text>{requestKey}</Text>
        <Text color={getRequestStatusColor(value.status)}>{value.status}</Text>
      </Inline>
      <Inline css={{ width: "100%" }} justifyContent="space-between">
        <Text variant="caption" color="secondary">
          0ms
        </Text>
        <Text variant="caption" color="secondary">
          {durationMs}ms
        </Text>
        <Text variant="caption" color="secondary">
          {stats.longestRequestDurationMs}ms
        </Text>
      </Inline>
    </Wrapper>
  );
};

const TimelineRenderer = ({
  finishedAt,
  initiatedAt,
  earliestTakeOff,
  lastTimestamp,
  longestRequestDurationMs,
  status,
}: {
  initiatedAt?: dayjs.Dayjs;
  finishedAt?: dayjs.Dayjs;
  earliestTakeOff: dayjs.Dayjs | undefined;
  lastTimestamp: dayjs.Dayjs;
  longestRequestDurationMs: number;
  status: RequestItemStatus;
}) => {
  const takeOffOffsetMs = earliestTakeOff
    ? initiatedAt?.diff(earliestTakeOff, "ms") ?? 0
    : 0;
  const offsetLeftPercent = (takeOffOffsetMs / longestRequestDurationMs) * 100;

  const finishDiffMs = finishedAt
    ? lastTimestamp.diff(finishedAt, "ms") ?? 0
    : 0;

  const offsetRightPercent = finishDiffMs
    ? (finishDiffMs / longestRequestDurationMs) * 100
    : 0;

  const style: CSSProperties = {
    left: `${offsetLeftPercent}%`,
    width: `${100 - offsetLeftPercent - offsetRightPercent}%`,
  };

  return (
    <>
      <Timeline>
        <TimelineBar status={status} style={style} />
        <TimelineMidline />
      </Timeline>
    </>
  );
};

const Timeline = styled("div", {
  height: "8px",
  width: "100%",
  position: "relative",
  overflow: "hidden",
});

const TimelineBar = styled("div", {
  height: "calc(100% - 2px)",
  transform: "translateX(-100%)",
  width: "100%",
  position: "absolute",
  left: 0,
  top: 1,
  borderRadius: "4px",
  variants: {
    status: {
      requested: {
        backgroundColor: "$colors$dark30",
      },
      cancelled: {
        backgroundColor: "$colors$error90",
      },
      fulfilled: {
        backgroundColor: "$colors$valid90",
      },
      created: {},
    },
  },
});

const TimelineMidline = styled("div", {
  position: "absolute",
  width: "100%",
  height: "1px",
  backgroundColor: "$colors$dark50",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
});

const Wrapper = styled("div", {
  padding: "$4 $4",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backgroundColor: "$colors$dark10",
  borderRadius: "6px",
});
