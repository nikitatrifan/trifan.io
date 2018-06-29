import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Waypoint from '../../components/Waypoint'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Container from '../../components/Container'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import BrowserScreen from '../../components/BrowserScreen'
import IPadCarousel from '../../components/IPadCarousel'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'
import IScroll from 'iscroll/build/iscroll-probe.js'
import theme from '../../theme'
import {TweenMax, TimelineMax, Power0} from "gsap";

class YoapInterface extends React.Component {
    iScroll = null;

    setMapRef = b => this.map = b;
    setWrapperRef = b => this.mapWrapper = b;

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
        this.iScroll = new IScroll(this.mapWrapper, {
            disableMouse: false,
            disablePointer: false,
            disableTouch: false,
            probeType: 3,
            bounce: false
        });

        const fixedMapBlock = this.map.children[0];
        this.iScroll.on('scroll', function () {
            fixedMapBlock.style.transform = `translate3d(0px, ${-this.y}px, 0)`
        });

        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
            this.updateScrollSize();
        }, 300);

        window.addEventListener('scroll', this.scrollHandler);
    }

    updateScrollSize = () => {
        const [shortImage, longImage] = this.map.children;
        this.map.style.height = parseInt(longImage.clientHeight, 10) + 'px';
        this.mapWrapper.style.height = parseInt(shortImage.clientHeight, 10) + 'px';

        this.tl = this.tween();
        this.scrollHandler();

        this.iScroll.refresh();
    };

    mapFocusIn = () => {
        const longImage = this.map.children[1];
        const imageHeight = parseInt(longImage.clientHeight, 10);
        setTimeout(() => {
            this.iScroll.scrollTo(0, -imageHeight, 0);
        }, 60);
        setTimeout(() => {
            this.iScroll.scrollTo(0, 0, 900, IScroll.utils.ease.circular);
        }, 300)
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.windowWidth !== this.props.windowWidth ||
            prevProps.windowHeight !== this.props.windowHeight
        ) {
            return this.updateScrollSize();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container className={classes.header} type="content">
                        <ComponentFadeIn delay={.1}>
                            <Heading color={theme.whiteColor} size="2">
                                The Idea
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.14}>
                            <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                                YOAP team is working to help locals find a new apartment for a long-term rent: they are looking for
                                best offers for rent on local market and then upload to their website with huge amount of parameters of
                                accomodation that user can filter by.
                                <br/><br/>
                                Also, they wanted to create simple and fast service with all users needs.
                            </Paragraph>
                        </ComponentFadeIn>

                    </Container>
                    <ComponentFadeIn delay={.14}>
                        <Container type="content" className={classes.ipadCarousel}>
                            <IPadCarousel images={[
                                '/yoap/ipad-slides/1.jpg',
                                '/yoap/ipad-slides/2.jpg',
                                '/yoap/ipad-slides/1.jpg',
                                '/yoap/ipad-slides/2.jpg',
                            ]}/>
                        </Container>
                    </ComponentFadeIn>
                    <Container className={classes.article} type="content">
                        <ComponentFadeIn delay={.04}>
                            <Heading color={theme.whiteColor} size="2">
                                Find Routes
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.14}>
                            <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                                In Russian cities like Moscow and Saint Petersburg people measure a location of an apartment at
                                a distance from a nearest subway station.
                                We are developed an interactive map where user can get routes from an apartment to subway station
                                on foot, car or bus with approximate time of.
                                <br/><br/>
                                User can save his favorite addresses like office address or parents
                                and get routes from an apartment to that addresses.
                            </Paragraph>
                        </ComponentFadeIn>

                        <ComponentFadeIn delay={.14}>
                            <BrowserScreen className={classes.scrollMapWrapper}>
                                <Waypoint onEnter={this.mapFocusIn}>
                                    <div ref={this.setWrapperRef} className={classes.scrollMap}>
                                        <div ref={this.setMapRef} className={classes.scrollMapContainer}>
                                            <img src="/yoap/map.jpg" className={classes.map}/>
                                            <img src="/yoap/map-content.jpg" className={classes.map_content}/>
                                        </div>
                                    </div>
                                </Waypoint>
                            </BrowserScreen>
                        </ComponentFadeIn>
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
        backgroundColor: '#1C1C26',
        padding: '70px 0',
    },
    header: {},
    image: {
        display: 'block',
        width: '100%',
        margin: '-60px auto 0'
    },
    bottomContent: {
        marginTop: '-80px'
    },
    ipadCarousel: {
        padding: '50px 0'
    },
    article: {
        padding: '50px 0'
    },
    scrollMap: {
        position: 'relative',
        width: '100%',
        height: '573px',
        overflowY: 'hidden',
        cursor: 'move'
    },
    scrollMapWrapper: {
        marginTop: '50px',
    },
    scrollMapContainer: {
        position: 'relative',
        minHeight: '600px'
    },
    map: {
        position: 'absolute',
        left: 0, top: 0,
        width: '50%',
        display: 'block',
    },
    map_content: {
        marginLeft: '50%',
        width: '50%',
        display: 'block'
    }
};

export default windowSize(
    injectStyles(styles)(YoapInterface)
)