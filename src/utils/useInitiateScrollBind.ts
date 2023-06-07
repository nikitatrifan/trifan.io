import { RefObject, useEffect } from "react";

export type UseInitiateScrollBindArgs = {
  wrapperRef: RefObject<HTMLDivElement | HTMLElement>;
  onInitiate: () => () => void;
  onEnter?: () => void;
  onExit?: (direction: "up" | "down") => void;
  observerOptions: IntersectionObserverInit;
  enablePassedScrollPointInitiate?: boolean;
  observeNodeSelection: "itself" | "next" | "previous";
};

/*
 * works well if the section isn't rendered at the top;
 * needs to be hacked a tiny bit for the use case.
 * */
export const useInitiateScrollBind = ({
  wrapperRef,
  observerOptions: { threshold, rootMargin },
  enablePassedScrollPointInitiate = false,
  observeNodeSelection = "itself",
  onInitiate,
  onEnter,
  onExit,
}: UseInitiateScrollBindArgs) => {
  /* fade in */
  useEffect(() => {
    const getIfPassedCurrentScrollPoint = () => {
      const scrollTop = document.querySelector("#scroller")?.scrollTop ?? 0;
      const elementOffsetTop = wrapperRef.current?.offsetTop ?? 0;
      return scrollTop >= elementOffsetTop;
    };

    if (enablePassedScrollPointInitiate) {
      if (getIfPassedCurrentScrollPoint()) {
        const destroy = onInitiate();
        return () => destroy();
      }
    }

    let destroy: () => void;
    let initiated = false;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          /* prepare the model */
          if (entry.isIntersecting) {
            onEnter?.();
          }

          /* disable the renderer if scrolled above */
          if (initiated && !entry.isIntersecting) {
            const direction = getIfPassedCurrentScrollPoint() ? "down" : "up";
            onExit?.(direction);
          }

          /*
           * initiate only once.
           * if the event function is updated this flag will be cleared.
           * */
          if (entry.isIntersecting && !initiated) {
            initiated = true;
            destroy = onInitiate();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    /* try to grab the previous element to initiate early. */
    if (wrapperRef.current) {
      let selectedNode = null;

      if (observeNodeSelection === "previous") {
        selectedNode = wrapperRef.current.previousElementSibling;
      } else if (observeNodeSelection === "next") {
        selectedNode = wrapperRef.current.nextElementSibling;
      } else {
        selectedNode = wrapperRef.current;
      }

      observer.observe(selectedNode || wrapperRef.current);
    }

    return () => {
      observer.disconnect();
      destroy?.();
    };
  }, [
    observeNodeSelection,
    enablePassedScrollPointInitiate,
    threshold,
    rootMargin,
    onEnter,
    onExit,
    onInitiate,
    wrapperRef,
  ]);
};
