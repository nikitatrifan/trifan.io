import React from 'react'
import PropTypes from 'prop-types'
import {TimelineMax, TweenMax, Power0} from 'gsap'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import BrowserScreen from '../../components/BrowserScreen'
import Box from '../../components/Box'
import injectStyle from 'react-jss'
import theme from "../../theme";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class YoapCms extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    static screens = [
        {
            image: 1,
            title: 'yoap'
        },
        {
            image: 2,
            title: 'yoap'
        },
        {
            image: 3,
            title: 'yoap'
        }
    ];
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
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
        window.removeEventListener('scroll', this.scrollHandler);
    }

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 300);

        window.addEventListener('scroll', this.scrollHandler);
    }
    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container className={classes.content} type="content">
                        <ComponentFadeIn>
                            <Heading size="2">
                                Content Management System
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.04}>
                            <Paragraph opacity size="3" margin="small">
                                We designed and developed custom content management system for YOAP team needs.
                                They can manage their objects and users without wasting time on loadings.
                            </Paragraph>
                        </ComponentFadeIn>
                    </Container>
                    <Container className={classes.images}>
                        <Box wrap jusityf="start" align="start">
                            {YoapCms.screens.map(it => (
                                <ComponentFadeIn delay={0.2 + (it * 0.04)} key={it.image}>
                                    <div className={classes.image_wrapper}>
                                        <BrowserScreen className={classes.image_screen}>
                                            <img alt={it.title}
                                                 src={`/yoap/cms/${it.image}.jpg`} className={classes.image}
                                            />
                                        </BrowserScreen>
                                    </div>
                                </ComponentFadeIn>
                            ))}
                        </Box>
                    </Container>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index,
        position: 'relative'
    }),
    scroller: {
        backgroundColor: theme.lightGrayColor,
        padding: '70px 0',
    },
    content: {
        paddingBottom: '37px'
    },
    image_screen: {
        width: '95%', margin: '0 auto',
    },
    image: {
        width: '100%', userSelect: 'none', pointerEvents: 'none',
        display: 'block'
    },
    images: {
        paddingTop: '15px'
    },
    image_wrapper: {
        width: '50%', marginBottom: '37px',
        '@media only screen and (max-width: 960px)': {
            width: '100%'
        }
    }
};

export default injectStyle(styles)(YoapCms);