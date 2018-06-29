import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Heading from '../../components/Heading'
import Title from '../../components/Title'
import Paragraph from '../../components/Paragraph'
import Container from '../../components/Container'
import OpacityCarousel from '../../components/OpacityCarousel'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import Link from '../../components/Link'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'
import { TweenMax, TimelineMax, Power0 } from 'gsap'
import theme from '../../theme'
import PropTypes from "prop-types";

class YoapIntroSlide extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
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

        if (percent === undefined)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        const tl = new TimelineMax({ paused: true });
        const height = parseInt(this.props.windowHeight / 2, 10);
        const dur = 3;
        const entry = dur/3;

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

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container className={classes.header} type="content">
                        <ComponentFadeIn delay={1}>
                            <Heading size="1">
                                Yoap
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={1.04}>
                            <Paragraph opacity margin="small">
                                Real Estate Web Application
                            </Paragraph>
                        </ComponentFadeIn>
                    </Container>
                    <ComponentFadeIn delay={1.08}>
                        <Container className={classes.carousel_container}>
                            <OpacityCarousel>
                                <img className={classes.image} src="/yoap/yoap-door-white.png" alt=""/>
                                <img className={classes.image} src="/yoap/yoap-map.png" alt=""/>
                            </OpacityCarousel>
                        </Container>
                    </ComponentFadeIn>
                    <Container className={classes.bottomContent} type="content">
                        <Title size="1">
                            Objective
                        </Title>
                        <Paragraph opacity margin="medium">
                            To develop new real-estate web service YOAP including front-end, back-end,
                            and content management system.
                            <br/> <br/>
                            The project is developed in collaboration with designer
                            {" "}
                            <Link target="__blank" to="//nikitanikiforov.it" icon>Nikita Nikiforov</Link>
                        </Paragraph>
                    </Container>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
        minHeight: '100vh'
    }),
    scroller: {
        backgroundColor: theme.lightGrayColor,
        paddingBottom: '97px',
    },
    header: {paddingTop: '154px'},
    image: {
        display: 'block',
        width: '100%',
        margin: '-60px auto 0',
        '@media only screen and (max-width: 1160px)': {
            width: '130%',
            margin: '-20px auto 20px',
            marginLeft: '-15%'
        },
        '@media only screen and (max-width: 930px)': {
            margin: '-10px auto 40px',
            marginLeft: '-20%',
            width: '140%'
        }
    },
    bottomContent: {
        marginTop: '-80px'
    },
    carousel_container: {
        '@media only screen and (max-width: 1024px)': {
            width: '100%',
            overflowX: 'hidden'
        },
    }
};

export default windowSize(
    injectStyles(styles)(YoapIntroSlide)
)