import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function scrollToElement(elementOrElementId: string | HTMLElement) {
  const elementNode =
    typeof elementOrElementId === "string"
      ? (document.querySelector(`#${elementOrElementId}`) as
          | HTMLElement
          | undefined)
      : elementOrElementId;
  const scroller = document.querySelector("#scroller") as HTMLDivElement;

  if (elementNode) {
    const y = elementNode.getBoundingClientRect().top + scroller.scrollTop;
    const direction = scroller.scrollTop + window.innerHeight / 2 > y ? 1 : -1;
    const offset = 60;

    ScrollTrigger.sort();
    ScrollTrigger.normalizeScroll();

    gsap.fromTo(
      scroller,
      {
        scrollTo: {
          y: y + offset * direction,
        },
      },
      {
        scrollTo: { y },
        duration: 0.75,
        ease: "power2",
      }
    );
  } else {
    console.error("Element was not found:", elementOrElementId);
  }
}
