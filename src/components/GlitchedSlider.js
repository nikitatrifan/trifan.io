import React from 'react'
import PropTypes from 'prop-types'
import injectStyle from 'react-jss'
import Waypoint from './Waypoint'
import { TweenMax } from 'gsap'
import Box from './Box'
import theme from "../theme"
import GlitchScene from "../helpers/GlitchScene"
import windowSize from '../containers/windowSize';

class GlitchPage extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    data: [
      {
        image: '/slider/5.jpg',
        text: 'HIGH QUALITY',
        scale: 1
      },
      {
        image: '/slider/3.jpg',
        text: 'DEVELOPMENT',
        scale: 1.1
      },
      {
        image: '/slider/1.jpg',
        text: 'BETTER UX/UI',
        scale: 1
      },
      {
        image: '/slider/2.jpg',
        text: 'DESIGN',
        scale: 1.5
      },
      {
        image: '/slider/4.jpg',
        text: 'UNIQUE',
        scale: 1
      },
      {
        image: '/slider/2.jpg',
        text: 'WEBSITES',
        scale: 2
      },
      {
        image: '/slider/1.jpg',
        text: 'NIKITA TRIFAN',
        scale: 1,
        timer: 3
      }
    ]
  };

  componentDidMount() {
    this.glitchScene = new GlitchScene(this.canvas);
    this.startCycle();
  }

  dur = .1; interval = 1500;

  flashImage = (isToShow, data, onComplete) => {
    const dur = this.dur, ease = "Cubic.easeOut";

    if (data) {
      if (data.text) {
        this.overlay.firstChild.innerText = data.text;
      }
      if (data.scale) {
        TweenMax.set(this.canvas, {
          scale: data.scale
        })
      }
    }

    TweenMax.to(this.overlay, dur, {
      opacity: isToShow ? 0 : .5, ease,
      onComplete
    });
  };

  startCycle = () => {
    const { data } = this.props;

    this.i = this.i || 0;
    this.glitchScene.start();
    const cycle = () => {
      if (this.isUnMounted)
        return;

      if (this.i >= data.length) {
        this.i = 0;
      }

      const item = data[this.i++];
      this.flashImage(0, item, () => {
        this.glitchScene &&
        this.glitchScene.initialize(item.image, () => {
          if (item.timer) {
            return setTimeout(() => {
              this.flashImage(1)
            }, item.timer * 1000)
          }
          return this.flashImage(1);
        })
      });
    };

    cycle();
    this.sliderInterval = setInterval(cycle, this.interval)
  };
  stopCycle = () => {
    clearInterval(this.sliderInterval);
    if (this.glitchScene)
      this.glitchScene.stop();
  };
  componentWillUnmount() {
    this.isUnMounted = true;
    this.startCycle();
    this.glitchScene.kill();
    this.glitchScene = null;
  }

  enterHandler = () => {
    if (this.glitchScene) {
      this.glitchScene.kill();
      this.glitchScene = null;
    }

    this.isUnMounted = true;

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.isUnMounted = false;
      this.glitchScene = new GlitchScene(this.canvas);

      this.startCycle();
    }, 100);
  };
  leaveHandler = () => {
    this.stopCycle();
  };

  render() {
    const { classes } = this.props;
    return (
      <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
        <div className={classes.wrapper} ref={b => this.wrapper = b}>
          <canvas ref={b => this.canvas = b} className={classes.canvas}/>
          <Box
            className={classes.overlay}
            setRef={b => this.overlay = b}
            justify="center" align="center"
            direction="column"
          >
            <span className={classes.text}/>
          </Box>
        </div>
      </Waypoint>
    )
  }
}

const styles = {
  wrapper: ({windowHeight}) => ({
    height: `${windowHeight}px`,
    width: '100%', position: 'relative',
    backgroundColor: '#000'
  }),
  overlay: {
    willChange: 'opacity',
    backgroundColor: '#000',
    zIndex: 10,
    position: 'absolute',
    left: 0, top: 0,
    width: '100%', height: '100%',
    opacity: 0,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    display: 'block',
    opacity: 1,
    color: '#fff',
    fontSize: '10vw',
    fontFamily: theme.monoFont,
    fontWeight: '100',
    letterSpacing: '.5vw'
  },
  canvas: ({windowHeight}) => ({
    height: `${windowHeight}px`,
    backgroundColor: '#000',
    zIndex: 0,
    position: 'relative',
  })
};

export default windowSize(
  injectStyle(styles)(GlitchPage)
)
