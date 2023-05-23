import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { useRegisterRequests } from "@/utils/useRegisterRequests";
import { usePersistResponse } from "@/utils/usePersistResponse";

type BookTitles = Array<string>;

type BookTitlesResponse = {
  totalCount: number;
  titles: BookTitles;
  success: boolean;
  message?: string;
};

type RequestStrategy = "cancel-irrelevant" | "debounce";

const MAX_NUMBER_OF_REQUESTS_CAPTURED = 4;

export const useRequestBookTitles = (
  value: string,
  strategy: RequestStrategy,
  numberOfRequestsCaptured = MAX_NUMBER_OF_REQUESTS_CAPTURED
) => {
  const {
    latestFulfilledResponse,
    registerRequestInitiation,
    registerLatestResponse,
  } = usePersistResponse<BookTitlesResponse>();

  const [
    requests,
    {
      createRequest,
      createdRequestKickedOff,
      registerRequestFulfilment,
      registerRequestCancellation,
    },
  ] = useRegisterRequests();
  const debouncedValue = useDebounce(
    strategy === "debounce" ? value : undefined,
    300
  );

  const typing = useTyping(strategy === "debounce" ? value : undefined, 295);

  useMemo(() => createRequest(value), [value]);

  const { data, isLoading } = useQuery<BookTitlesResponse>(
    `@search/${strategy}/${strategy === "debounce" ? debouncedValue : value}}`,
    ({ signal }) => {
      const requestedQueryValue = String(value);

      createdRequestKickedOff(requestedQueryValue);
      registerRequestInitiation();

      if (strategy === "cancel-irrelevant") {
        signal?.addEventListener("abort", () =>
          registerRequestCancellation(requestedQueryValue)
        );
      }

      return fetch(`/api/search-books`, {
        signal,
        method: "POST",
        body: JSON.stringify({ query: requestedQueryValue, limit: 15 }),
      })
        .then((res) => res.json())
        .then((res) => {
          registerRequestFulfilment(requestedQueryValue);
          registerLatestResponse(res, !res?.titles?.length);

          return res;
        });
    },
    { cacheTime: 0 }
  );

  const [debouncedLoading] = useDebounce(isLoading, 195);
  let loading = debouncedLoading || isLoading;
  if (strategy === "debounce" && typing) loading = true;

  let results: BookTitles = data?.titles ?? [];
  if (!results?.length && loading) {
    results = latestFulfilledResponse.current?.titles ?? [];
  }

  return {
    results,
    loading,
    isLoading,
    requests,
    debouncedLoading,
    totalCount: data?.totalCount ?? 0,
  };
};

const useTyping = (value: any, timeoutMs: number) => {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function clearTypingState() {
      setTyping(false);
    }

    if (value) {
      setTyping(true);
      timeout = setTimeout(clearTypingState, timeoutMs);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeoutMs, value]);

  return typing;
};
