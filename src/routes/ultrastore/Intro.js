import React from 'react'
import windowSize from 'react-window-size'
import Paragraph from '../../components/Paragraph'
import Svg from '../../components/Svg'
import injectStyles from 'react-jss'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import CallToScroll from '../../components/CallToScroll'
import Container from '../../components/Container'
import {Power0, TimelineMax, TweenMax} from 'gsap'
import theme from '../../theme'
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class USIntro extends React.Component {
    dur = .3;
    blocks = [];
    fixer = 20;

    mouseMove = (e) => {
        const { dur, ease, fixer } = this;
        const { windowWidth, windowHeight } = this.props;
        const pageX = e.clientX - (windowWidth / 2);
        const pageY = e.clientY - (windowHeight / 2);

        this.blocks.forEach((item, idx) => {
            if (!item) return;
            const index = idx + 1;

            const x = pageX * (index / fixer);
            const y = pageY * (index / fixer);

            TweenMax.to(item, dur, {
                x, y, ease,
            });
        })
    };

    setBlocksRefs = () => {
        this.blocks[1] = this.wrapper.querySelector('svg#intro-svg g#intro-icons');
        this.blocks[2] = this.wrapper.querySelector('svg#intro-svg g#intro-line');
    };

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
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

        if (percent === undefined || !this.tl)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        const tl = new TimelineMax({ paused: true });
        const height = parseInt(window.innerHeight * 0.6, 10);
        const dur = 1;

        tl.fromTo(this.scroller, dur, {
            opacity: 1, y: 0
        }, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        });

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} onMouseMove={this.mouseMove} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <NavigationWaypoint theme="dark">
                        <ComponentFadeIn delay={1.01}>
                            <div className={classes.imageWrapper}>
                                <Svg onLoad={this.setBlocksRefs} className={classes.image} src="/us/lines/intro.svg" />
                            </div>
                        </ComponentFadeIn>
                        <div className={classes.contentWrapper} ref={b => this.blocks[0] = b}>
                            <div className={classes.content}>
                                <ComponentFadeIn delay={1.05}>
                                    <Svg className={classes.logo} src="/us/logo.svg" />
                                </ComponentFadeIn>
                                <ComponentFadeIn delay={1.06}>
                                    <Paragraph opacity margin="small">
                                        High-End Ecommerce Web App
                                    </Paragraph>
                                </ComponentFadeIn>
                            </div>
                        </div>
                        <div className={classes.scrollForMore}>
                            <Container>
                                <CallToScroll text="Scroll To Learn More" />
                            </Container>
                        </div>
                    </NavigationWaypoint>
                </div>
            </div>
        )
    }
}

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    wrapper: props => ({
        minHeight: '100vh',
        position: 'relative',
        zIndex: props.index,
    }),
    scroller: {
        position: 'absolute',
        left: 0, top: 0, width: '100%',
        height: '100%', backgroundColor: theme.lightGrayColor
    },
    image: {
        minWidth: '110%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        '& svg': {
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            [mobileMedia]: {
                width: '150%',
                marginLeft: '-25%'
            }
        }
    },
    imageWrapper: {
        position: 'absolute',
        left: 0, top: 0, width: '100%',
        height: '100%',
    },
    logo: {
        marginBottom: '35px',
        '@media only screen and (max-width: 600px)': {
            width: '300px'
        },
        '@media only screen and (max-width: 350px)': {
            width: '250px'
        },
    },
    content: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center'
    },
    contentWrapper: {
        position: 'absolute',
        width: '100%', height: '100%',
        willChange: 'transform'
    },
    scrollForMore: {
        position: 'absolute',
        left: 0, bottom: 0,
        width: '100%'
    }
};

export default windowSize(
    injectStyles(styles)(USIntro)
);