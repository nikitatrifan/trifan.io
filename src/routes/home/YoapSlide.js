import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import SlideAbout from '../../components/SlideAbout'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";
import responsive from "../../helpers/responsive";

class YoapSlide extends React.Component {
    images = [];
    componentDidMount() {
        if (responsive('mobile'))
            return false;

        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
            window.addEventListener('scroll', this.scrollHandler);
        }, 300);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
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
        const tl = new TimelineMax({ paused: true });
        const dur = 3;

        tl.staggerFromTo(this.images, dur / 3, {
            opacity: 0
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, dur / 4);

        const y = 150, x = 50, deg = 15;

        tl.staggerFromTo(this.images, dur, {
            y, x, rotation: `${deg}deg`
        }, {
            y: -y, x: -x,
            rotation: `-${deg}deg`,
            ease: Power0.easeNone
        }, 0.7, '0');

        tl.fromTo(this.content, dur / 2, {
            opacity: 0,
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, '0');
        tl.fromTo(this.content, dur, {
            y,
        }, {
            y: -y,
            ease: Power0.easeNone
        }, '0');
        tl.staggerFromTo([...this.images].reverse(), dur, {
            opacity: 1,
        }, {
            opacity: 0,
            ease: Power0.easeNone
        }, 0.7, dur);
        tl.to(this.content, dur / 2, {
            opacity: 0,
            ease: Power0.easeNone
        }, dur);

        return tl;
    };

    buttonClickHandler = () =>
        TweenMax.to(window, .7, {scrollTo: (this.props.index * 2) * window.innerHeight});

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <Container>
                    <div ref={b => this.content = b}>
                        <SlideAbout
                            onButtonClick={this.buttonClickHandler}
                            buttonGradientLink="/yoap"
                            buttonGradient={['#ff899b', '#ff4d66']}
                            className={classes.about}
                            labels={['front-end', 'back-end']}
                            title={(
                                'Yoap Real Estate\n' +
                                'Web-Application'
                            )}
                            description={(
                                'The app is designed to make user’s trainings at a gym\n' +
                                'easier and help to improve his body by the right way.'
                            )}
                        />
                    </div>
                </Container>
                <div className={classes.images}>
                    <img
                        ref={b => this.images[0] = b}
                        className={classes.image}
                        src="/yoap/yoap-map.png" alt=""
                    />
                    <img
                        ref={b => this.images[1] = b}
                        className={classes.image}
                        src="/yoap/yoap-door-white.png" alt=""
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
        //marginBottom: '100vh',
        padding: '60px 0 20px',
        zIndex: 0,
        [responsive('mobile')]: {
            height: 'auto', flexDirection: 'column-reverse'
        }
    },

    images: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
        flexWrap: 'nowrap',
        left: '-40%', top: '-4%',
        width: '55%', height: '100%',
        [responsive('mobile')]: {
            width: '100%', position: 'relative',
            height: 'auto',
        }
    },
    image: {
        width: '110%',
        '&:last-child': {
            marginLeft: '-20%',
            marginTop: '10%'
        }
    },
    about: {
        margin: '0 0 0 auto'
    }
};

export default windowSize(injectStyles(styles)(YoapSlide));