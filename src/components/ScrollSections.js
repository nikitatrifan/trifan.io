import React, { memo, useRef, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { type Classes, createUseStyles } from 'react-jss';
import { useSprings, a } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import useWindowSize from '../hooks/useWindowSize';

type Props = {
  className: ?string,
  classes: ?Classes,
  children: React.ReactNode[],
  scrollerClassName: ?string,
  index: ?number,
  noMinHeight: ?boolean,
};

const useStyles = createUseStyles({
  wrapper: ({ index = 0 }: Props = {}) => ({
    zIndex: index,
    position: 'relative',
    backgroundColor: '#000',
  }),
  scroller: ({ noMinHeight }: Props = {}) => ({
    minHeight: noMinHeight ? 'auto' : '100vh',
    backgroundColor: '#fff',
    willChange: 'transform, opacity',
    overflow: 'hidden',
  }),
});

function ScrollSections({ className, scrollerClassName, children, logged }: Props): React.ReactNode {
  const classes = useStyles();
  const wrapperRef = useRef();
  const { windowHeight } = useWindowSize();
  const [fadingInIndex, setFadingInIndex] = useState(1);
  const [springs, setSprings] = useSprings(
    children.length,
    (el: React.ReactNode, idx: number): Object => ({
      percentIn: idx === 0 ? 1 : 0,
      percentOut: 0,
      immediate: false,
    }),
  );

  const $children = useMemo(
    (): HTMLElement[] => (wrapperRef.current ? [...wrapperRef.current.children] : []),
    [wrapperRef.current],
  );

  const bind = useScroll(
    ({ xy: [, y] }) => {
      if (!wrapperRef.current || !wrapperRef.current.children) return;
      const vals = [];
      const $sections = wrapperRef.current.children;
      let isUpdated = false;
      for (let idx = 0, l = $sections.length; idx < l; idx++) {
        const $node = $sections[idx];
        vals[idx] = {
          percentIn: 0,
          percentOut: 0,
        };
        if (isInViewPort($node)) {
          const posY = y - $node.offsetTop + windowHeight;
          const isEligibleToFadeOut = posY >= $node.clientHeight;
          const isEligibleToFadeIn = posY <= windowHeight;

          console.log({ idx, posY, isEligibleToFadeOut, isEligibleToFadeIn });

          if (isEligibleToFadeOut) {
            const percent = +((posY - $node.clientHeight) / windowHeight).toFixed(2);
            vals[idx] = {
              percentOut: percent,
              percentIn: 0,
            };
            isUpdated = true;
          } else if (isEligibleToFadeIn) {
            const percent = +(posY / windowHeight).toFixed(2);
            vals[idx] = {
              percentIn: percent,
              percentOut: 0,
            };
            isUpdated = true;
            setFadingInIndex(idx);
          }
        }
      }
      if (isUpdated) {
        console.log(vals);
        setSprings((idx: number): Object => {
          return vals[idx];
        });
      }
    },
    {
      domTarget: window,
    },
  );

  useEffect(bind, [bind]);

  return (
    <div ref={wrapperRef} className={classNames(classes.wrapper, className)}>
      {springs.map(({ percentIn, percentOut }, idx: number): React.ReactNode => {
        const isFadingIn = fadingInIndex === idx;
        console.log({ isFadingIn, idx });
        return (
          <a.div
            key={isFadingIn ? idx : idx * springs.length}
            className={classNames(classes.scroller, scrollerClassName)}
            style={{
              transform: isFadingIn
                ? percentIn.interpolate(
                    (val: number): string => `translate3d(0px, ${windowHeight * 0.1 * val}px, 0px)`,
                  )
                : percentOut.interpolate(
                    (val: number): string => `translate3d(0px, ${windowHeight * 0.2 * val}px, 0px)`,
                  ),
              opacity: percentOut.interpolate({
                range: [0, 1],
                output: [1, 0.6],
              }),
            }}
          >
            {children[idx]}
          </a.div>
        );
      })}
      {/*<a.div*/}
      {/*  className={classes.overlay}*/}
      {/*  style={{*/}
      {/*    opacity: percentOut.interpolate({*/}
      {/*      range: [0, 1],*/}
      {/*      output: [0, 0.6],*/}
      {/*    }),*/}
      {/*    display: percentOut.interpolate((val: number): string => (val <= 0.09 ? 'none' : 'block')),*/}
      {/*    height: windowHeight,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}

function isInViewPort(el: HTMLElement) {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight,
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
}

export default memo(ScrollSections);
