import { Ref, RefObject, useEffect, useRef, useState } from "react";

export function verifyVisibilityInViewport(node: HTMLElement) {
  const scrollY = document.querySelector("#scroller")?.scrollTop ?? 0;
  return (
    [node.clientTop, node.clientTop + node.clientHeight].findIndex((y) => {
      return y >= scrollY && y <= scrollY + window.innerHeight;
    }) >= 0
  );
}

export const useVisibleInViewportRef = (elementRef: RefObject<HTMLElement>) => {
  const visibilityRef = useRef<boolean>(false);

  useEffect(() => {
    let enabled = true;
    function updateStatus() {
      if (enabled) {
        requestAnimationFrame(updateStatus);
      }

      if (elementRef?.current) {
        visibilityRef.current = verifyVisibilityInViewport(elementRef.current);
      }
    }

    updateStatus();

    return () => {
      enabled = false;
    };
  }, [elementRef]);

  return visibilityRef;
};

export const useVisibleInViewport = (
  elementRef: RefObject<HTMLElement>
): boolean => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return visible;
};
