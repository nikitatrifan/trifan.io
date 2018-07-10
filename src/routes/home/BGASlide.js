import React from 'react'
import windowSize from 'react-window-size'
import classNames from 'classnames'
import Container from '../../components/Container'
import injectStyles from 'react-jss'
import SlideAbout from '../../components/SlideAbout'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";
import responsive from "../../helpers/responsive";

class BGASlide extends React.Component {
    images = [];
    componentDidMount() {
        if (responsive().isMobile)
            return false;

        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
            window.onScroll(this.scrollHandler);
        }, 300);
    }
    componentWillUnmount() {
        window.offScroll(this.scrollHandler);
    }

    scrollHandler = () => {
        const percent =
            getNodeRelativeViewportPercentPosition(this.wrapper, true);

        if (percent === undefined)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };

    tween = () => {
        const { windowHeight } = this.props;
        const tl = new TimelineMax({ paused: true });
        const dur = 3;

        tl.staggerFromTo(this.images, dur / 2, {
            opacity: 0
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, 1);

        const y = windowHeight / 5;

        tl.staggerFromTo(this.images, dur,
            {y},
            {
                y: -y, ease: Power0.easeNone
            },
            1,
            '0'
        );

        tl.fromTo(this.content, dur / 2, {
            opacity: 0,
            y: 100,
        }, {
            y: - 100,
            opacity: 1,
            ease: Power0.easeNone
        }, '0');

        tl.fromTo([...this.images].reverse(), dur / 2, {
            opacity: 1,
        }, {
            opacity: 0,
            ease: Power0.easeNone
        }, dur * 1.1);

        tl.to(this.content, dur / 2, {
            opacity: 0,
            ease: Power0.easeNone
        }, dur);

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <Container>
                    <div ref={b => this.content = b}>
                        <SlideAbout
                            onButtonClick={this.buttonClickHandler}
                            buttonGradientLink="/gym-assistant"
                            labels={['design', 'front-end', 'back-end']}
                            title={(
                                'Boosted Gym Assistant \n' +
                                'iOS Application'
                            )}
                            description={(
                                'The app is designed to make user’s trainings at a gym\n' +
                                'easier and help to improve his body by the right way.'
                            )}
                        />
                    </div>
                </Container>
                <div className={classes.images}>
                    <div ref={b => this.images[0] = b}
                         className={classes.images_col}>
                        <img
                            className={classes.image}
                            src="/bga/1.png" alt=""
                        />
                        <img
                            className={classes.image}
                            src="/bga/2.png" alt=""
                        />
                    </div>
                    <div ref={b => this.images[1] = b}
                         className={classNames(classes.images_col, classes.image_col_second)}>
                        <img
                            className={classes.image}
                            src="/bga/3.png" alt=""
                        />
                        <img
                            className={classes.image}
                            src="/bga/4.png" alt=""
                        />
                    </div>
                    <div ref={b => this.images[2] = b}
                         className={classNames(classes.images_col, classes.image_col_third)}>
                        <img
                            className={classes.image}
                            src="/bga/5.png" alt=""
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        position: 'relative',
        zIndex: 1,
        [responsive('mobile')]: {
            flexDirection: 'column-reverse',
            height: 'auto', padding: '60px 0 20px'
        }
    },
    images: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
        flexWrap: 'nowrap',
        top: '-10%', right: '-10%',
        width: '55%',
        height: '100%',
        transform: 'rotateZ(45deg)',
        [responsive('mobile')]: {
            position: 'static',
            transform: 'rotateZ(0deg)',
            width: '100%', height: 'auto'
        }
    },
    images_col: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '33.3%',
        willChange: 'transform, opacity'
    },
    image_col_second: {
        marginTop: '30%'
    },
    image_col_third: {
        marginTop: '60%'
    },
    image: {
        width: '125%',
        marginTop: '-20%'
    }
};

export default windowSize(injectStyles(styles)(BGASlide));