import {
  RequestsSequenceArray,
  useRegisterRequests,
} from "@/utils/useRegisterRequests";
import { useQuery } from "react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { debounce } from "throttle-debounce";
import dayjs from "dayjs";
import { PrefetchStrategyType } from "@/components/ShowcasePrefetchList";

export type BookApiResponse = {
  result?: Array<string>;
  totalCount?: number;
  success: boolean;
  message?: string;
};

export const useAssemblePrefetchList = (
  strategy: PrefetchStrategyType
): {
  readonly state: {
    route: "genres" | "titles";
    requestStats: {
      readonly debounce: { numberOfRequests: number } & {
        totalTimeToDataMs?: number;
        navigateToDataMs?: number;
      };
      readonly "cancel-irrelevant": { numberOfRequests: number } & {
        totalTimeToDataMs?: number;
        navigateToDataMs?: number;
      };
    };
    genres: any;
    loadingGenres: boolean;
    requests: RequestsSequenceArray;
    loading: boolean;
    results: any;
    currentGenre: string;
  };
  readonly actions: {
    clearGenreSelection: () => void;
    prefetch: (value: string) => void;
    selectGenre: (genre: string) => void;
    navigateToTitles: () => void;
    navigateToGenres: () => void;
  };
} => {
  const [
    requests,
    {
      createRequest,
      createdRequestKickedOff,
      registerRequestFulfilment,
      registerRequestCancellation,
    },
  ] = useRegisterRequests();

  const [route, setRoute] = useState<"genres" | "titles">("genres");
  const navigationTimestamps = useRef<{
    genres?: ReturnType<typeof dayjs>;
    titles?: ReturnType<typeof dayjs>;
  }>({});
  const selectedGenreTimestamp = useRef<ReturnType<typeof dayjs>>();
  const navigateToGenres = () => {
    navigationTimestamps.current.genres = dayjs();
    setRoute("genres");
  };

  const navigateToTitles = () => {
    navigationTimestamps.current.titles = dayjs();
    setRoute("titles");
  };
  /*
   *
   * fetch categories
   * then let me choose a category but also let me preload & cancel or preload debounce my request
   *
   * */
  const genresQuery = useQuery<BookApiResponse>(
    "@books/categories",
    () => fetch("/api/books-by-genre").then((res) => res.json()),
    { enabled: true }
  );

  const [genreToPreload, setGenreToPreload] = useState<string>("");
  const [currentGenre, setCurrentGenre] = useState<string>("");

  async function fetchBooksByGenre(genre: string, signal?: AbortSignal) {
    createdRequestKickedOff(genre);

    if (strategy === "cancel-irrelevant") {
      signal?.addEventListener("abort", () =>
        registerRequestCancellation(genre)
      );
    }

    const response: BookApiResponse = await fetch("/api/books-by-genre", {
      method: "POST",
      body: JSON.stringify({ category: genre, limit: 30 }),
      signal,
    }).then((res) => res.json());

    registerRequestFulfilment(genre);

    return response;
  }

  const getBooksByGenreQueryKey = (genre: string) => `@books/genre/${genre}`;
  const selectedGenreToQuery = genreToPreload || currentGenre;
  const { data, isLoading } = useQuery<[string, BookApiResponse]>(
    getBooksByGenreQueryKey(selectedGenreToQuery),
    async ({ signal }) => {
      navigateToGenres();
      const response = await fetchBooksByGenre(selectedGenreToQuery, signal);
      return [selectedGenreToQuery, response];
    },
    {
      enabled: Boolean(selectedGenreToQuery),
      cacheTime: 0,
      onSuccess() {
        if (currentGenre) {
          navigateToTitles();
        }
      },
    }
  );

  const requestStats = usePrefetchListStats({
    strategy,
    requests,
    selectedGenre: selectedGenreToQuery,
    selectedGenreTimestamp: selectedGenreTimestamp.current,
    navigationTimestamps: navigationTimestamps.current,
  });

  const [debouncedLoading] = useDebounce(isLoading, 195);
  const loading = debouncedLoading || isLoading;

  function prefetchBooksByGenre(genre: string) {
    if (!currentGenre) {
      setGenreToPreload(genre);
    }
  }

  function wrapPrefetchWithCreateRequest<T extends Function>(prefetch: T) {
    return (value: string) => {
      createRequest(value);
      prefetch(value);
    };
  }

  const prefetch = wrapPrefetchWithCreateRequest(
    strategy === "debounce"
      ? debounce(150, prefetchBooksByGenre)
      : prefetchBooksByGenre
  );

  /*
   * reset the selection to allow for prefetch
   * when the content is no longer needed to be rendered
   * typically after the page is animated out */
  function clearGenreSelection() {
    selectedGenreTimestamp.current = undefined;
    setCurrentGenre("");
    setGenreToPreload("");
  }

  function selectGenre(genre: string) {
    selectedGenreTimestamp.current = dayjs();
    setCurrentGenre(genre);
    setGenreToPreload("");
  }

  useEffect(() => {
    const readyToNavigateToTitles = data?.[0] === currentGenre;
    if (readyToNavigateToTitles) {
      setRoute("titles");
    }
  }, [data, currentGenre]);

  return {
    state: {
      genres: genresQuery.data?.result,
      currentGenre,
      loadingGenres: genresQuery.isLoading,
      loading,
      results: currentGenre === data?.[0] ? data?.[1].result : undefined,
      requests,
      requestStats,
      route,
    },
    actions: {
      selectGenre,
      clearGenreSelection,
      prefetch,
      navigateToGenres,
      navigateToTitles,
    },
  } as const;
};

const useInteracting = (data: unknown) => {
  const [interacting, setInteracting] = useState(data);
  useEffect(() => {
    setInteracting(true);
    const timeout = setTimeout(() => {
      setInteracting(false);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [data]);
  return interacting;
};

function getRequestsInRange(
  requests: RequestsSequenceArray,
  from: ReturnType<typeof dayjs>,
  to: ReturnType<typeof dayjs>
) {
  const range: typeof requests = [];

  try {
    requests
      .slice(0)
      .reverse()
      .forEach((request, index) => {
        const [, { createdAt, finishedAt }] = request;
        if (
          (createdAt.isAfter(from) && createdAt.isBefore(to)) ||
          (finishedAt?.isAfter(from) && finishedAt?.isBefore(to))
        ) {
          range.push(request);
        }
      });
  } catch (e) {}

  return range;
}

const usePrefetchListStats = ({
  strategy,
  requests,
  selectedGenreTimestamp,
  selectedGenre,
  navigationTimestamps,
}: {
  strategy: Parameters<typeof useAssemblePrefetchList>[0];
  requests: RequestsSequenceArray;
  selectedGenre: string;
  selectedGenreTimestamp?: ReturnType<typeof dayjs>;
  navigationTimestamps: {
    genres?: ReturnType<typeof dayjs>;
    titles?: ReturnType<typeof dayjs>;
  };
}) => {
  const lastMeasuredTime = useRef<
    Record<
      typeof strategy,
      {
        totalTimeToDataMs?: number;
        navigateToDataMs?: number;
      }
    >
  >({
    "cancel-irrelevant": {},
    debounce: {},
  });

  const requestCount = useRef<Record<typeof strategy, number>>({
    "cancel-irrelevant": 0,
    debounce: 0,
  });

  const interacting = useInteracting(requests);
  const lastTimestamp = useRef<ReturnType<typeof dayjs>>();
  const timestampWhenBeganInteracting = useMemo(() => {
    return interacting
      ? (lastTimestamp.current = dayjs())
      : lastTimestamp.current;
  }, [interacting]);

  return useMemo(() => {
    const { genres: navigatedToGenresAt, titles: navigatedToTitlesAt } =
      navigationTimestamps;

    const firstTimeNavigatedToTitles =
      !navigatedToGenresAt && navigatedToTitlesAt;

    const navigatedToTitles =
      navigatedToGenresAt &&
      navigatedToTitlesAt &&
      navigatedToTitlesAt.isAfter(navigatedToGenresAt);

    const shouldMeasureTime = firstTimeNavigatedToTitles || navigatedToTitles;

    let requestsInTheRange: RequestsSequenceArray | undefined;
    if (timestampWhenBeganInteracting) {
      requestsInTheRange = shouldMeasureTime
        ? getRequestsInRange(
            requests,
            timestampWhenBeganInteracting,
            navigatedToTitlesAt
          )
        : getRequestsInRange(requests, timestampWhenBeganInteracting, dayjs());
    }

    if (shouldMeasureTime && requestsInTheRange?.length) {
      const request = requests.find(([query]) => query === selectedGenre);

      if (request) {
        const [, { finishedAt, createdAt }] = request;
        lastMeasuredTime.current[strategy].totalTimeToDataMs = Math.max(
          finishedAt?.diff(createdAt, "ms") ?? 0,
          0
        );

        lastMeasuredTime.current[strategy].navigateToDataMs = Math.max(
          finishedAt?.diff(selectedGenreTimestamp, "ms") ?? 0,
          0
        );
      }
    }

    if (requestsInTheRange?.length) {
      requestCount.current[strategy] = requestsInTheRange.reduce(
        (number, [, req]) => (req.status !== "created" ? number + 1 : number),
        0
      );
    }

    return {
      debounce: Object.assign(
        {
          numberOfRequests: requestCount.current.debounce,
        },
        lastMeasuredTime.current.debounce
      ),
      "cancel-irrelevant": Object.assign(
        { numberOfRequests: requestCount.current["cancel-irrelevant"] },
        lastMeasuredTime.current["cancel-irrelevant"]
      ),
    } as const;
  }, [
    navigationTimestamps,
    timestampWhenBeganInteracting,
    requests,
    selectedGenre,
    strategy,
    selectedGenreTimestamp,
  ]);
};
