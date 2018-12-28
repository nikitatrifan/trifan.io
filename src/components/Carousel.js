import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from './Waypoint'
import { TweenMax } from 'gsap'
import classNames from 'classnames'
import Svg from './Svg'
import Box from './Box'
import injectStyle from 'react-jss'
import Paragraph from './Paragraph'
import theme from '../theme'
import windowSize from '../containers/windowSize';

class Carousel extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    interval: PropTypes.number,
  };
  static defaultProps = {
    interval: 2
  }

  state = {
    slide: 0,
  };

  dur = .7;
  inactiveOpacity = 0.3;
  isUnMounted = true;

  componentDidMount() {
    setTimeout(() => {
      this.resizeHandler();
      this.startAnimation()
    }, 300);
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount() {
    this.isUnMounted = true;
    clearInterval(this.animationTimeout);
    window.removeEventListener('resize', this.resizeHandler)
  }

  startAnimation = () => {
    clearInterval(this.animationTimeout);
    this.animationTimeout = setInterval(this.nextSlide, this.props.interval * 1000);
  };
  nextSlide = () => {
    if (this.isUnMounted)
      return;

    const { images } = this.props;
    const { slide } = this.state;
    const maxSlide = images.length - 1;

    if (images.length <= 0) {
      return false;
    }

    if (slide >= maxSlide) {
      return this.setSlide(0);
    }

    this.setSlide(slide + 1);
  };

  prevSlide = () => {
    if (this.isUnMounted)
      return;

    const { images } = this.props;
    const { slide } = this.state;
    const maxSlide = images.length - 1;

    if (images.length <= 0) {
      return false;
    }

    if (slide < 0) {
      return this.setSlide(maxSlide);
    }

    this.setSlide(slide - 1);
  };

  setRef = b => this.wrapper = b;
  setWrapperRef = b => this.nodeWrapper = b;

  setSlide = slide => {
    const { wrapper, dur } = this;
    const slides = [...this.wrapper.children];

    TweenMax.to(wrapper, dur, {
      x: -parseInt(wrapper.clientWidth, 10) * slide,
      onComplete: () => this.setState({slide})
    });

    slides.forEach((node, idx) => {
      const opacity = idx === slide ? 1 : this.inactiveOpacity;

      TweenMax.to(node, dur, {
        opacity
      })
    });
  };

  enterHandler = () => {
    this.isUnMounted = false;
  };
  leaveHandler = () => {
    this.isUnMounted = true;
  };

  resizeHandler = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const { slide } = this.state;
      const nodeWrapper = this.nodeWrapper;
      const node = this.wrapper;
      const slideNode = node.children[slide]
        .querySelector(`.${this.props.classes.image}`);

      const parentNodeWidth = nodeWrapper.parentElement.clientWidth;
      const slideNodeHeight = slideNode.getBoundingClientRect().height;

      nodeWrapper.style.width = `${parentNodeWidth}px`;
      nodeWrapper.style.height = `${slideNodeHeight}px`;
      this.setSlide(slide);
    }, 60);
  };

  slideClickHandler = idx => {
    this.startAnimation();
    this.setSlide(idx);
  };

  static slidesOffset = 3;

  render() {
    const { classes, images, windowWidth } = this.props;
    const { slide, } = this.state;
    const arrowSrc = '/icons/keyboard_arrow.svg';
    return (
      <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
        <div ref={this.setWrapperRef} className={classes.wrapper}>
          <Box align="center" className={classes.info}>
            {slide !== 0 &&
            <Svg
              className={classNames(classes.arrow, classes.arrow_left)}
              src={arrowSrc} onClick={this.prevSlide}
            />
            }
            <Paragraph size={4} weight={400} className={classes.info_text}>Page {slide+1}</Paragraph>
            <Svg
              className={classNames(classes.arrow, classes.arrow_right)}
              onClick={this.nextSlide} src={arrowSrc}
            />
          </Box>
          <div ref={this.setRef} className={classes.container}>
            {images.map((it, idx) => (
              <div key={idx}
                   className={classNames(classes.slide, idx === slide && classes.slide_current)}
                   onClick={() => this.slideClickHandler(idx)}
                   style={{
                     left: windowWidth <= 1000 ? `${idx*100}%` : `${(idx*100) + Carousel.slidesOffset}%`,
                     opacity: idx === slide ? 1 : this.inactiveOpacity
                   }}>
                <img className={classes.image} src={it} alt="YOAP Website Screen" />
              </div>
            ))}
          </div>
        </div>
      </Waypoint>
    )
  }
}

const styles = {
  wrapper: {
    width: '100%', height: '588px', borderRadius: '3.5%', position: 'relative',
    marginTop: '35px',
    '@media only screen and (max-width: 1330px)': {
      marginTop: '55px'
    },
    '@media only screen and (max-width: 1000px)': {
      marginTop: '75px'
    },
  },
  slide: {
    position: 'absolute',
    width: `${100 - Carousel.slidesOffset * 2}%`,
    height: `${100 - Carousel.slidesOffset * 2}%`,
    top: `${Carousel.slidesOffset}%`,
    left: `${Carousel.slidesOffset}%`,
    cursor: 'pointer',
    transition: 'box-shadow .15s ease-in-out',
    '@media only screen and (max-width: 1000px)': {
      width: '100%', left: 0, top: 0
    },
    '& img': {
      boxShadow: '0px 1px 60px 10px rgba(0,0,0,0.1)',
      '@media only screen and (max-width: 700px)': {
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)',
      },
    }
  },
  slide_current: {
    cursor: 'default',
  },
  info: {
    marginLeft: '8%',
    userSelect: 'none',
    transform: 'translateY(-16px)',
    '@media only screen and (max-width: 1000px)': {
      marginLeft: '0%',
      transform: 'translateY(-31px)',
    },
  },
  info_text: {
    color: theme.textColor
  },
  arrow: {
    fill: theme.textColor,
    width: '24px', height: '24px',
    transition: 'opacity .25s ease-out',
    cursor: 'pointer',
    opacity: .3,
    '&:hover': {
      opacity: 1,
    }
  },
  arrow_left: {
    transform: 'rotateZ(180deg)'
  },
  arrow_right: {},
  image: {
    display: 'block',
    position: 'absolute',
    left: 0, top: 0,
    width: '100%',
    height: 'auto',
    pointerEvents: 'none',
    boxShadow: '0 0 0 0 rgba(0,0,0,0)',
  },
  container: {
    position: 'absolute',
    left: 0, top: 0,
    width: '100%',
    height: '100%'
  }
};

export default windowSize(
  injectStyle(styles)(Carousel)
);
