import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import SlideAbout from '../../components/SlideAbout'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";
import responsive from "../../helpers/responsive";

class USSLide extends React.Component {
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
            getNodeRelativeViewportPercentPosition(this.wrapper);

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

        // images in animation
        tl.staggerFromTo(this.images, dur / 4, {
            opacity: 0,
            display: 'none'
        }, {
            display: 'block',
            opacity: 1,
            ease: Power0.easeNone
        }, 0.1);

        // images end animation
        tl.staggerFromTo(this.images, dur * 0.9, {
            y: windowHeight,
        }, {
            y: -windowHeight * .4,
            ease: Power0.easeNone
        }, 0.1, '0');

        tl.fromTo(this.content, dur / 2, {
            opacity: 0,
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, '0');

        tl.to(this.imagesWrapper, dur, {
            y: -windowHeight,
            ease: Power0.easeNone,
            opacity: 0
        }, dur);
        // tl.set(this.wrapper, {
        //     overflow: 'hidden'
        // }, dur);

        tl.to(this.content, dur, {
            y: -100,
            ease: Power0.easeNone,
            opacity: 0
        }, dur * 1.2);

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <Container>
                    <div ref={b => this.content = b}>
                        <SlideAbout
                            buttonGradientLink="/ultrastore"
                            buttonGradient={['#525252', '#121212']}
                            labels={['front-end', 'back-end']}
                            title={(
                                'Ultrastore\n' +
                                'High-end Ecommerce Web App'
                            )}
                            description={(
                                'The app is designed to make user’s trainings at a gym\n' +
                                'easier and help to improve his body by the right way.'
                            )}
                        />
                    </div>
                </Container>
                <div ref={b => this.imagesWrapper = b} className={classes.images}>
                    <img
                        ref={b => this.images[0] = b}
                        className={classes.image}
                        src="/us/2.png" alt=""
                    />
                    <img
                        ref={b => this.images[1] = b}
                        className={classes.image}
                        src="/us/1.png" alt=""
                    />
                    <img
                        ref={b => this.images[2] = b}
                        className={classes.image}
                        src="/us/3.png" alt=""
                    />
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
        //overflow: 'hidden',
        zIndex: 0,
        padding: '60px 0 20px',
        [responsive('mobile')]: {
            height: 'auto', flexDirection: 'column-reverse'
        }
    },
    images: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        flexWrap: 'no-wrap',
        top: '0%', width: '55%',
        right: '0%',
        height: '100%',
        [responsive('mobile')]: {
            height: 'auto', flexDirection: 'column-reverse',
            position: 'static', width: '100%',
            marginBottom: '30px'
        }
    },
    image: {
        width: '100%'
    }
};

export default windowSize(injectStyles(styles)(USSLide));