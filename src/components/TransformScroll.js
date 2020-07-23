import React, { memo, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { type Classes, createUseStyles } from 'react-jss';
import { useSpring, a } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import useIsInViewport from 'use-is-in-viewport';
import useWindowSize from '../hooks/useWindowSize';

type Props = {
  className: ?string,
  classes: ?Classes,
  children: React.ReactNode,
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
    willChange: 'transfrom',
    // overflow: 'hidden',
  }),
  overlay: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    willChange: 'opacity',
    backgroundColor: '#000',
  },
});

function TransformScroll(props: Props): React.ReactNode {
  const { className, scrollerClassName, children, logged } = props;
  const classes = useStyles(props);
  const wrapperRef = useRef();
  const { windowHeight } = useWindowSize();
  const [isFadingIn, setFadingIn] = useState(true);
  const [{ percentIn, percentOut }, set, stop] = useSpring((): Object => ({
    percentIn: 0,
    percentOut: 0,
    immediate: false,
  }));

  const [isInViewport, targetRef] = useIsInViewport({
    viewport: document.body,
    target: wrapperRef,
  });

  const bind = useScroll(
    ({ xy: [, y] }) => {
      if (!isInViewport || !wrapperRef.current) return;
      const $node = wrapperRef.current;
      const posY = y - $node.offsetTop + windowHeight;
      const isEligibleToFadeOut = posY >= $node.clientHeight;
      const isEligibleToFadeIn = posY <= windowHeight;
      if (isEligibleToFadeOut) {
        const percent = +((posY - $node.clientHeight) / windowHeight).toFixed(2);
        setFadingIn(false);
        set({
          percentOut: percent,
          percentIn: 0,
        });
      } else if (isEligibleToFadeIn) {
        const percent = +(posY / windowHeight).toFixed(2);
        setFadingIn(true);
        set({
          percentIn: percent,
          percentOut: 0,
        });
      }
    },
    {
      domTarget: window,
    },
  );

  useEffect(bind, [bind]);

  return (
    <div ref={targetRef} className={classNames(classes.wrapper, className)}>
      <a.div
        className={classNames(classes.scroller, scrollerClassName)}
        style={{
          transform: isFadingIn
            ? percentIn.interpolate(
                (val: number): string => `translate3d(0px, ${windowHeight * 0.1 * val}px, 0px)`,
              )
            : percentOut.interpolate(
                (val: number): string => `translate3d(0px, ${windowHeight * 0.45 * val}px, 0px)`,
              ),
          visibility: isInViewport ? 'visible' : 'hidden',
          opacity: percentOut.interpolate({
            range: [0, 1],
            output: [1, 0.2],
          }),
        }}
      >
        {children}
      </a.div>
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

export default memo(TransformScroll);
