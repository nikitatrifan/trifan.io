import React from 'react';
import injectStyle from 'react-jss';
import getNodeRelativeViewportPercentPosition from '../helpers/getNodeRelativeViewportPercentPosition';
import theme from '../theme';
import responsive from '../helpers/responsive';
import { Power0, TimelineMax, TweenMax } from 'gsap';

class BlockName extends React.Component {
  static defaultProps = {
    color: theme.whiteColor,
  };

  componentDidMount() {
    // if (responsive().isMobile) return null;
    //
    // const upd = () => {
    //   this.tl = this.tween();
    //   this.scrollHandler();
    // };
    // setTimeout(() => {
    //   upd();
    //   setTimeout(upd, 300);
    // }, 300);
    // window.addEventListener('resize', this.resizeHandler);
    // window.onScroll(this.scrollHandler);
  }
  componentWillUnmount() {
    // window.addEventListener('resize', this.resizeHandler);
    // window.offScroll(this.scrollHandler);
  }
  resizeHandler = () => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.tl = this.tween();
      this.scrollHandler();
    }, 60);
  };
  scrollHandler = () => {
    if (this.props.disabled || responsive().isMobile) return;

    const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

    if (percent === undefined) return false;

    if (!this.tl) return false;

    TweenMax.to(this.tl, 0, {
      progress: percent,
      ease: Power0.easeNone,
    });
  };

  tween = () => {
    if (!this.block) return false;

    const tl = new TimelineMax({ paused: true });
    const height = parseFloat(this.wrapper.clientHeight);
    const dur = 3;

    tl.fromTo(
      this.block,
      dur / 2,
      {
        y: 0,
        opacity: 0,
        ease: Power0.easeNone,
      },
      {
        y: height / 2,
        opacity: 1,
        ease: Power0.easeNone,
      },
    );

    tl.to(this.block, dur / 2, {
      y: height,
      opacity: 0,
      ease: Power0.easeNone,
    });

    return tl;
  };

  render() {
    const { classes, color, name } = this.props;
    if (responsive().isMobile) return null;

    return (
      <div ref={b => (this.wrapper = b)} className={classes.wrapper}>
        <div ref={b => (this.block = b)} className={classes.block}>
          <div className={classes.container}>
            <span style={{ color }} className={classes.text}>
              {name}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: props => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: props.index || 0,
    userSelect: 'none',
  }),
  block: {
    position: 'static',
  },
  text: {
    fontFamily: theme.mainFont,
    display: 'inline-block',
    fontSize: '22px',
    letterSpacing: '0.4px',
    lineHeight: '22px',
    fontWeight: '500',
    transform: 'translateY(100%) rotateZ(90deg)',
    whiteSpace: 'pre',
    transformOrigin: 'center 0',
    [responsive('mobile')]: {
      fontSize: '16px',
      lineHeight: '16px',
      height: '16px',
      transform: 'translateX(-8px) translateY(100%) rotateZ(90deg)',
    },
  },
  container: {
    maxWidth: '1440px',
    width: '90%',
    margin: '0 auto',
    [responsive('mobile')]: {
      width: '16px',
      margin: '0',
      position: 'absolute',
      left: 0,
      top: 0,
    },
  },
};

export default injectStyle(styles)(BlockName);
