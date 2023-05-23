import { styled } from "junoblocks";
import { useEffect, useRef, MouseEventHandler } from "react";
import gsap from "gsap";

export function ImageCarousel() {
  const data = [
    {
      src: "/images/r-error.jpg",
      description: "",
    },
    {
      src: "/images/schwa.jpg",
      description: "",
    },
    {
      src: "/images/tongue-model.jpg",
      description: "",
    },
    {
      src: "/images/ultrasound-tongue-scan.jpg",
      description: "",
    },
  ];

  const timelineRef = useRef<ReturnType<typeof gsap.timeline>>();
  const imagesRef = useRef<Array<HTMLElement>>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const spinDuration = 15;

      const timeline = gsap.timeline({
        defaults: {
          duration: spinDuration,
        },
      });

      const images = Array.from(
        document.querySelectorAll("[data-floating-image]")
      ) as Array<HTMLElement>;

      const TWO_PI = Math.PI * 2;

      const getHalfWindowSize = () => [
        window.innerWidth / 2,
        window.innerHeight / 2,
      ];

      images.forEach((image, index) => {
        const delay = (spinDuration / images.length) * index;
        timeline.to(
          image,
          {
            opacity: 1,
            delay,
            duration: 0.35,
          },
          0
        );

        const imageWidth = image.clientWidth;
        const imageHeight = image.clientHeight;

        timeline.to(
          image,
          {
            ease: "none",
            repeat: -1,
            x: TWO_PI,
            y: TWO_PI,
            modifiers: {
              x: (value) => {
                const x = parseFloat(value);
                const [halfWidth] = getHalfWindowSize();

                return `${
                  halfWidth + Math.cos(x) * halfWidth - imageWidth / 2
                }px`;
              },
              y: (value) => {
                const y = parseFloat(value);
                const [halfHeight] = getHalfWindowSize();

                return `${
                  halfHeight + Math.sin(y) * halfHeight - imageHeight / 2
                }px`;
              },
            },
          },
          delay
        );
      });

      timelineRef.current = timeline;
      imagesRef.current = images;
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const animateCarouselStop: MouseEventHandler<HTMLElement> = (e) => {
    const node = e.target as HTMLElement;
    // @ts-ignore
    timelineRef.current?.pause();

    const timeline = gsap.timeline({
      defaults: {
        duration: 0.35,
        ease: "back.out(1.4)",
      },
    });

    imagesRef.current?.forEach((image) => {
      timeline.to(
        image,
        {
          scale: image === node ? 1.4 : 0.7,
        },
        0
      );
    });

    timeline.to(
      node,
      {
        x: e.clientX - node?.clientWidth / 2,
        y: e.clientY - node?.clientHeight / 2,
      },
      0
    );
  };

  const animateCarouselLaunch: MouseEventHandler<HTMLElement> = (e) => {
    const node = e.target as HTMLElement;

    const timeline = gsap.timeline({
      defaults: {
        duration: 0.35,
        ease: "back.out(1.4)",
      },
    });

    imagesRef.current?.forEach((image) => {
      timeline.to(
        image,
        {
          scale: 1,
        },
        0
      );
    });

    // @ts-ignore
    timelineRef.current?.play();
  };

  return data.map(({ src }) => (
    <FloatingImage
      data-floating-image="true"
      src={src}
      key={src}
      alt="Nothing"
      onMouseEnter={animateCarouselStop}
      onMouseLeave={animateCarouselLaunch}
    />
  ));
}

const FloatingImage = styled("img", {
  position: "fixed",
  left: 0,
  top: 0,
  maxWidth: "max(5vw, 300px)",
  opacity: 0,
});
