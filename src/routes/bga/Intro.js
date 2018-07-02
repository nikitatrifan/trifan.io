import React from 'react'
import { findDOMNode } from 'react-dom'
import Waypoint from '../../components/Waypoint'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import SlideAbout from '../../components/SlideAbout'
import IPhoneMockup from '../../components/IPhoneMockup'
import CarouselIOSTransition from '../../components/CarouselIOSTransition'
import Box from '../../components/Box'
import LogoAnimation from './LogoAnimation'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'
import { TweenMax, TimelineMax, Power0, Elastic, Back } from 'gsap'
import theme from '../../theme'
import getScrollY from "../../helpers/getScrollY";

class BGAIntro extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    state = {
        animationStarted: false
    };

    isAnimationInFocus = () => {
        const { windowHeight } = this.props;
        const scrollY = getScrollY() - windowHeight;

        if (scrollY <= windowHeight) {
            return this.enterHandler();
        }
    };

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();

            this.isAnimationInFocus();
        }, 300);
        window.addEventListener('scroll', this.scrollHandler);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.windowWidth !== this.props.windowWidth) {
            return this.resizeHandler()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
    resizeHandler = () => {
        this.tl = this.tween();
        this.scrollHandler();
    };
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        if (!this.tl)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        if (!this.scroller)
            return false;

        const tl = new TimelineMax({ paused: true });
        const height = parseInt(this.props.windowHeight / 2, 10);
        const dur = 3;

        tl.fromTo(this.scroller, dur, {
            opacity: 1, y: 0
        }, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        });

        return tl;
    };

    setAboutRef = b => {
        this.about = findDOMNode(b);
    };

    fadeIn = () => {
        const { mockup, about } = this;
        const mockupTl = new TimelineMax();
        const dur = 2;

        TweenMax.fromTo(about, dur / 3, {
            opacity: 0,
            y: -100
        }, {
            opacity: 1, y: 0,
            delay: .3,
            ease: Back.easeOut
        });

        mockupTl.to(mockup, dur / 3, {
            opacity: 1,
        });

        mockupTl.fromTo(mockup, dur, {
            y: -window.innerHeight/3,
        }, {
            y: 0, ease: Elastic.easeOut.config(1, 0.5)
        }, '0')
    };

    enterHandler = () => {
        this.setState({animationStarted: true})
    };

    render() {
        const { classes } = this.props;
        return (
            <Waypoint onEnter={this.enterHandler}>
                <div ref={b => this.wrapper = b} className={classes.wrapper}>
                    <div ref={b => this.scroller = b} className={classes.scroller}>
                        <Box justify="center" align="center"
                             ref={b => this.scroller = b}
                             className={classes.scroller}>
                            <LogoAnimation
                                index={0}
                                isAllowed={this.state.animationStarted}
                                onComplete={this.fadeIn}
                            />
                            <div className={classes.container}>
                                <Box justify="between" align="center" className={classes.content}>
                                    <SlideAbout
                                        className={classes.about}
                                        ref={this.setAboutRef}
                                        onButtonClick={this.buttonClickHandler}
                                        title={(
                                            'Boosted Gym Assistant \n' +
                                            'iOS Application'
                                        )}
                                        description={(
                                            'The app is designed to make user’s trainings at a gym\n' +
                                            'easier and help to improve his body by the right way.'
                                        )}
                                    />
                                    <div ref={b => this.mockup = b} className={classes.mockup}>
                                        <IPhoneMockup>
                                            <CarouselIOSTransition
                                                noAnimate
                                                images={[
                                                    '/bga/screens/Custom-Program-Choose-Exercise.jpg',
                                                    '/bga/screens/Custom-Program-Day.jpg',
                                                    '/bga/screens/Custom-Program-Days.jpg',
                                                ]}
                                            />
                                        </IPhoneMockup>
                                    </div>
                                </Box>
                            </div>
                        </Box>
                    </div>
                </div>
            </Waypoint>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
    }),
    scroller: {
        backgroundColor: theme.lightGrayColor,
        height: '100vh', overflow: 'hidden'
    },
    mockup: {
        width: '40%',
        opacity: 0,
        willChange: 'transform, opacity'
    },
    container: {
        width: '90%', margin: '0 auto',
        maxWidth: '960px', position: 'relative',
        zIndex: 10
    },
    about: {
        opacity: 0,
        willChange: 'transform, opacity'
    }
};

export default windowSize(
    injectStyles(styles)(BGAIntro)
)