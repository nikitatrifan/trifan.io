import React from 'react'
import { findDOMNode } from 'react-dom'
import Waypoint from '../../components/Waypoint'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import SlideAbout from '../../components/SlideAbout'
import IPhoneMockup from '../../components/IPhoneMockup'
import CarouselIOSTransition from '../../components/CarouselIOSTransition'
import Box from '../../components/Box'
import LogoAnimation from './LogoAnimation'
import { TweenMax, TimelineMax, Elastic, Back } from 'gsap'
import theme from '../../theme'
import TransformScroll from '../../components/TransformScroll'
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import getScrollY from "../../helpers/getScrollY";
import responsive from "../../helpers/responsive";

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
        setTimeout(this.isAnimationInFocus, 300);
    }
    setAboutRef = b => {
        this.about = findDOMNode(b);
    };

    fadeIn = () => {
        const { mockup, about, scrollMore } = this;
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
        }, '0');
    };

    enterHandler = () => {
        this.setState({animationStarted: true})
    };

    render() {
        const { classes } = this.props;
        return (
            <Waypoint onEnter={this.enterHandler}>
                <TransformScroll
                    name="Intro"
                    wrapperClassName={classes.wrapper}
                    scrollerClassName={classes.scroller}
                >
                    <NavigationWaypoint theme="dark">
                        <Box justify="center" align="center"
                             ref={b => this.scroller = b}
                             className={classNames(classes.scroller, classes.scoller_wrapper)}>
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
                                                    '/bga/screens/Todays-Training.jpg',
                                                    '/bga/screens/Todays-Exercise.jpg',
                                                    '/bga/screens/Todays-Exercise-Relax.jpg',
                                                    '/bga/screens/Todays-Exercise.jpg',
                                                    '/bga/screens/Todays-Exercise-Done.jpg',
                                                ]}
                                            />
                                        </IPhoneMockup>
                                    </div>
                                </Box>
                            </div>
                        </Box>
                    </NavigationWaypoint>
                </TransformScroll>
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
        height: '100vh', overflow: 'hidden',
        willChange: 'transform, opacity',
        [responsive('mobile')]: {
            height: 'auto',
            minHeight: '100vh',
        }
    },
    scoller_wrapper: {
        [responsive('mobile')]: {
            padding: '50px 0 100px',
        }
    },
    mockup: {
        width: '40%',
        opacity: 0,
        minWidth: '200px',
        willChange: 'transform, opacity',
        [responsive('desktop')]: {
            width: '34%',
        },
        [responsive('mobile')]: {
            width: '50%', padding: '40px 0 30px'
        }
    },
    container: {
        width: '90%', margin: '0 auto',
        maxWidth: '960px', position: 'relative',
        zIndex: 10
    },
    content: {
        [responsive('mobile')]: {
            flexWrap: 'wrap',
            flexDirection: 'column-reverse',
            //alignItems: 'flex-start'
        }
    },
    about: {
        opacity: 0,
        willChange: 'transform, opacity',
        [responsive('mobile')]: {
            width: '100%',
        }
    },
};

export default windowSize(
    injectStyles(styles)(BGAIntro)
)