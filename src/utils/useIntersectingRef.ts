import { RefObject, useEffect, useRef } from "react";
import { useWindowHeight } from "@react-hook/window-size/throttled";

export const useIntersectingRef = (ref: RefObject<HTMLElement>) => {
  const intersecting = useRef<boolean>(false);

  useEffect(() => {
    const options = {
      rootMargin: `0px 0px 0px 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      intersecting.current = entry.isIntersecting;
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return intersecting;
};
