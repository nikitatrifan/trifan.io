import React from 'react'
import windowSize from '../../containers/windowSize';
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import SidebarAnimation from './SidebarAnimation'
import theme from '../../theme'
import {Power0, TimelineMax, TweenMax} from "gsap";
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class USAbout extends React.Component {
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
        const height = parseInt(window.innerHeight / 2, 10);
        const dur = 1;
        const entry = dur * 0.65;

        tl.to(this.scroller, entry, {
            y: 0, opacity: 1,
            ease: Power0.easeNone
        });

        tl.to(this.scroller, dur - entry, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        });

        return tl;
    };

    componentWillUnmount() {
        window.offScroll(this.scrollHandler);
    }

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 300);

        window.onScroll(this.scrollHandler);
    }
    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <NavigationWaypoint theme="dark">
                        <Container className={classes.header} type="content">
                            <ComponentFadeIn delay={.1}>
                                <Heading size="2">
                                    Objective
                                </Heading>
                            </ComponentFadeIn>
                            <ComponentFadeIn delay={.14}>
                                <Paragraph opacity size="3" margin="small">
                                    The client has so many ecommerce shops which uses website templates.
                                    He messaged me he’s tired of limitations of ecommerce platforms and he wants to create something fast, unique and modern.
                                    <br/><br/>
                                    There we are go.
                                </Paragraph>
                            </ComponentFadeIn>
                        </Container>
                        <Container>
                            <Box wrap>
                                {[1,2,3].map(it => (
                                    <ComponentFadeIn delay={.3 + (.04 * it)} key={it}>
                                        <div className={classes.imageWrapper}>
                                            <img className={classes.image} src={`/us/${it}.png`} alt=""/>
                                        </div>
                                    </ComponentFadeIn>
                                ))}
                            </Box>
                        </Container>
                        <Container className={classes.header} type="content">
                            <ComponentFadeIn delay={.1}>
                                <Heading size="2">
                                    The Idea
                                </Heading>
                            </ComponentFadeIn>
                            <ComponentFadeIn delay={.14}>
                                <Paragraph opacity size="3" margin="small">
                                    We are decided with Nikita Nikiforov that user will have access to main shop
                                    features like cart, checkout and account everywhere and immediately.
                                </Paragraph>
                            </ComponentFadeIn>
                        </Container>
                        <ComponentFadeIn delay={.1}>
                            <Container type="bootstrap" className={classes.sideBarAnimation}>
                                <SidebarAnimation />
                            </Container>
                        </ComponentFadeIn>
                    </NavigationWaypoint>
                </div>
            </div>
        )
    }
}

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    wrapper: {
        minHeight: '100vh',
        position: 'relative',
    },
    scroller: {
        position: 'relative',
        padding: '60px 0',
        backgroundColor: theme.lightGrayColor
    },
    header: {
        padding: '60px 0',
        [mobileMedia]: {
            padding: '10px 0'
        }
    },
    imageWrapper: {
        width: '50%',
        [mobileMedia]: {
            width: '100%'
        }
    },
    image: {
        width: '100%', margin: '0 auto'
    },
    sideBarAnimation: {
        paddingBottom: '150px',
        [mobileMedia]: {
            padding: '40px 0'
        }
    }
};

export default windowSize(
    injectStyles(styles)(USAbout)
);
