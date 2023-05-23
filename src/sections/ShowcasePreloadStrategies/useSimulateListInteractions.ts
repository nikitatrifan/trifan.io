import { RefObject, useEffect, useState } from "react";

function simulateHover(node: Element | HTMLElement) {
  const hoverInEvent = new MouseEvent("mouseover", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const hoverOutEvent = new MouseEvent("mouseleave", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  return new Promise((resolve) => {
    const handleHover = (e: any) => {
      // e.stopPropagation();
      node.classList.add("hover");
    };
    node.addEventListener("mouseover", handleHover);

    const handleMouseOut = (e: any) => {
      // e.stopPropagation();
      node.classList.remove("hover");
    };
    node.addEventListener("mouseleave", handleMouseOut);

    requestAnimationFrame(() => {
      node.dispatchEvent(hoverInEvent);
    });

    setTimeout(() => {
      node.dispatchEvent(hoverOutEvent);

      requestAnimationFrame(() => {
        node.removeEventListener("mouseover", handleHover);
        node.removeEventListener("mouseleave", handleMouseOut);

        resolve(null);
      });
    }, 65 + Math.random() * 150);
  });
}

function simulateClick(node: Element | HTMLElement) {
  const clickInEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const clickOutEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  return new Promise((resolve) => {
    const handleMouseDown = (e: any) => {
      e.stopPropagation();
      node.classList.add("clicked");
    };
    node.addEventListener("mousedown", handleMouseDown);

    const handleMouseUp = (e: any) => {
      e.stopPropagation();
      node.classList.remove("clicked");
    };
    node.addEventListener("mouseup", handleMouseUp);

    requestAnimationFrame(() => {
      node.dispatchEvent(clickInEvent);
    });

    setTimeout(() => {
      node.dispatchEvent(clickOutEvent);

      requestAnimationFrame(() => {
        node.removeEventListener("mousedown", handleMouseDown);
        node.removeEventListener("mouseup", handleMouseUp);

        resolve(null);
      });
    }, 65 + Math.random() * 150);
  });
}

export const useSimulateListInteractions = ({
  listParentRef,
  backButtonRef,
  enabled,
  resetRouteState,
  indexesToInteractWith,
}: {
  listParentRef: RefObject<HTMLElement>;
  backButtonRef: RefObject<HTMLElement>;
  indexesToInteractWith: Array<number>;
  resetRouteState: () => void;
  enabled: boolean;
}) => {
  const [indexToRestartTheScript, setIndexToRestartTheScript] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let active = true;
    let resetTimeout: NodeJS.Timeout;

    function requestSimulation() {
      resetRouteState();

      const interactionPromise = indexesToInteractWith.reduce(
        (promise, index) =>
          promise.then(() => {
            const node = listParentRef.current?.children?.[index];
            if (node) {
              return simulateHover(node);
            } else {
              return Promise.resolve();
            }
          }),
        Promise.resolve() as Promise<any>
      );

      interactionPromise
        .then(() => {
          const lastIndex =
            indexesToInteractWith[indexesToInteractWith.length - 1];

          const node = listParentRef.current?.children?.[lastIndex];

          if (node) {
            return simulateClick(node);
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          const navigateBack = async () => {
            const node = backButtonRef.current;
            if (node) {
              await simulateHover(node);
              await simulateClick(node);
            }
          };

          const restart = () => {
            return setTimeout(() => {
              setIndexToRestartTheScript((index) => index + 1);
            }, 1000);
          };

          if (active) {
            resetTimeout = setTimeout(async () => {
              await navigateBack();
              resetTimeout = restart();
            }, 3000);
          }
        });
    }

    resetTimeout = setTimeout(requestSimulation, 1000);

    return () => {
      clearTimeout(resetTimeout);
      active = false;
    };
  }, [
    backButtonRef,
    enabled,
    indexesToInteractWith,
    listParentRef,
    indexToRestartTheScript,
    resetRouteState,
  ]);
};
