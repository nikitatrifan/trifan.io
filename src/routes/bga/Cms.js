import React from 'react'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import BrowserScreen from '../../components/BrowserScreen'
import OpacityCarousel from '../../components/OpacityCarousel'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class Cms extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    componentDidMount() {
        const upd = () => {
            this.tl = this.tween();
            this.scrollHandler();
        };
        setTimeout(() => {
            upd();
            setTimeout(upd, 1500);
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
        const entryPoint = dur * .55;

        tl.to(this.scroller, entryPoint, {
            y: 0, opacity: 1,
            ease: Power0.easeNone
        });

        tl.to(this.scroller, dur - entryPoint, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        }, entryPoint);

        return tl;
    };


    static images = [
        '/bga/screens/cms/login.jpg', '/bga/screens/cms/programs.jpg',
        '/bga/screens/cms/program-edit.jpg', '/bga/screens/cms/training-edit.jpg'
    ];

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container className={classes.header} type="content">
                        <ComponentFadeIn delay={.04}>
                            <Heading size="2">
                                Content Management System
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.08}>
                            <Paragraph size="3" margin="small">
                                Created to manage the app content: exercises, programs and users. Based on React.js, Redux and Grommet.io.
                            </Paragraph>
                        </ComponentFadeIn>
                    </Container>
                    <Container type="bootstrap">
                        <BrowserScreen>
                            <OpacityCarousel>
                                {Cms.images.map(it => (
                                    <img
                                        src={it} key={it}
                                        alt="Gym Assistant Content Management System"
                                    />
                                ))}
                            </OpacityCarousel>
                        </BrowserScreen>
                    </Container>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
    }),
    scroller: {
        minHeight: '100vh', backgroundColor: '#E8E8E8',
        padding: '109px 0'
    },
    header: {
        paddingBottom: '68px'
    }
};

export default windowSize(
    injectStyles(styles)(Cms)
)