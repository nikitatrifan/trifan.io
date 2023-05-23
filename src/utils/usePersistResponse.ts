import { useRef } from "react";

export function usePersistResponse<T = any>() {
  const timeoutForResponseCache = useRef<NodeJS.Timeout>();
  const latestFulfilledResponse = useRef<T>();

  const registerRequestInitiation = () =>
    clearTimeout(timeoutForResponseCache.current);

  const registerLatestResponse = (response: T, empty: boolean) => {
    if (!empty) {
      latestFulfilledResponse.current = response;
    } else {
      timeoutForResponseCache.current = setTimeout(() => {
        latestFulfilledResponse.current = response;
      }, 350);
    }
  };

  return {
    latestFulfilledResponse,
    registerRequestInitiation,
    registerLatestResponse,
  };
}
