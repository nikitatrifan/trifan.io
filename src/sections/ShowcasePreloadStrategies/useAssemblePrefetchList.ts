import { useMedia } from "junoblocks";
import { useRegisterRequests } from "@/utils/useRegisterRequests";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { debounce } from "throttle-debounce";

export type BookApiResponse = {
  result?: Array<string>;
  totalCount?: number;
  success: boolean;
  message?: string;
};

export const useAssemblePrefetchList = (
  strategy: "debounce" | "cancel-irrelevant"
) => {
  const numberOfRequestsCaptured = useMedia("sm") ? 3 : 3;

  const [
    requests,
    { createRequest, registerRequestFulfilment, registerRequestCancellation },
  ] = useRegisterRequests(numberOfRequestsCaptured);

  const [route, setRoute] = useState<"genres" | "titles">("genres");
  const navigateToGenres = () => setRoute("genres");
  const navigateToTitles = () => setRoute("titles");
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
    const requestIndex = createRequest(genre);

    if (strategy === "cancel-irrelevant") {
      signal?.addEventListener("abort", () =>
        registerRequestCancellation(requestIndex)
      );
    }

    const response: BookApiResponse = await fetch("/api/books-by-genre", {
      method: "POST",
      body: JSON.stringify({ category: genre, limit: 30 }),
      signal,
    }).then((res) => res.json());

    registerRequestFulfilment(requestIndex);

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
      cacheTime: 2000,
      onSuccess() {
        if (currentGenre) {
          navigateToTitles();
        }
      },
    }
  );

  const [debouncedLoading] = useDebounce(isLoading, 195);
  const loading = debouncedLoading || isLoading;

  function prefetchBooksByGenre(genre: string) {
    if (!currentGenre) {
      setGenreToPreload(genre);
    }
  }

  /*
   * reset the selection to allow for prefetch
   * when the content is no longer needed to be rendered
   * typically after the page is animated out */
  function clearGenreSelection() {
    setCurrentGenre("");
    setGenreToPreload("");
  }

  function selectGenre(genre: string) {
    setCurrentGenre(genre);
    setGenreToPreload("");
  }

  useEffect(() => {
    const readyToNavigateToTitles = data?.[0] === currentGenre;
    if (readyToNavigateToTitles) {
      setRoute("titles");
    }
  }, [data, currentGenre]);

  const prefetch =
    strategy === "debounce"
      ? debounce(150, prefetchBooksByGenre)
      : prefetchBooksByGenre;

  return {
    state: {
      genres: genresQuery.data?.result,
      currentGenre,
      loadingGenres: genresQuery.isLoading,
      loading,
      results: currentGenre === data?.[0] ? data?.[1].result : undefined,
      numberOfRequestsCaptured,
      requests,
      route,
    },
    actions: {
      selectGenre,
      clearGenreSelection,
      prefetch,
      navigateToGenres,
      navigateToTitles,
    },
  };
};
