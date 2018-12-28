import React from 'react'
import windowSize from '../../containers/windowSize';
import VideoSlide from './VideoSlide'
import injectStyle from 'react-jss'
import Waypoint from '../../components/Waypoint'
import { TweenMax, TimelineMax, Power0 } from 'gsap'
import theme from '../../theme'
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class VideoSlidesSection extends React.Component {
    current = 0;
    componentDidMount() {
        setTimeout(() => {
            this.scrollTl = this.scrollTween();
            this.scrollHandler();
        }, 300);

        window.onScroll(this.scrollHandler);
    }
    componentWillUnmount() {
        window.offScroll(this.scrollHandler);
    }

    scrollTween = () => {
        const tl = new TimelineMax({ paused: true });
        const dur = 3;
        const entryPoint = dur * .85;

        tl.to(this.scroller, entryPoint, {
            opacity: 1, y: 0,
            ease: Power0.easeNone
        });

        tl.fromTo(this.scroller, dur - entryPoint, {
            opacity: 1, y: 0,
        }, {
            opacity: .4,
            y: this.props.windowHeight/2,
            ease: Power0.easeNone
        }, entryPoint);

        return tl;
    };
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined || !this.scrollTl)
            return false;

        TweenMax.to(this.scrollTl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };

    enterHandler = index => {
        this.current = index;
        this.backgroundColor = this.colors[index];

        TweenMax.to(this.scroller, .35, {
            backgroundColor: this.backgroundColor,
            delay: .35
        })
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.windowWidth !== this.props.windowWidth ||
            prevProps.windowHeight !== this.props.windowHeight
        ) {
            return this.scrollTl = this.scrollTween();
        }
    }

    colors = [
        "#50E3C2", '#FAFAFA',
        '#2660DC', '#121212'
    ];

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Waypoint onEnter={() => this.enterHandler(0)}>
                        <VideoSlide
                            lineSrc="/us/lines/yellow.svg"
                            videoSrc="/us/vids/404.mp4"
                            title="Unique UX"
                            description="As the result of development we have supa-fast single page web application."
                            backgroundColor={this.colors[0]}
                            textColor={theme.whiteColor}
                            navTheme="light"
                            index={0}
                        />
                    </Waypoint>
                    <Waypoint onEnter={() => this.enterHandler(1)}>
                        <VideoSlide
                            lineSrc="/us/lines/red.svg"
                            videoSrc="/us/vids/catalog.mp4"
                            title="Interactive catalog of goods"
                            description={(
                                "We designed and developed a long amount of features like adding any of goods to " +
                                "the cart without any delays, mixing a catalog with promo-banners, infinity scrolling " +
                                "and fast as hell catalog filters."
                            )}
                            backgroundColor={this.colors[1]}
                            textColor={theme.textColor}
                            navTheme="dark"
                            index={1}
                        />
                    </Waypoint>
                    <Waypoint onEnter={() => this.enterHandler(2)}>
                        <VideoSlide
                            lineSrc="/us/lines/blue.svg"
                            videoSrc="/us/vids/interactive-accessories.mp4"
                            title="Smart recommended accessories"
                            description={(
                                "In item page we’ve implemented recommended accessories which helps users to find best " +
                                "accessories matches. System will automatically find accessories matches for a device and manager " +
                                "in admin panel can manually add accessories."
                            )}
                            backgroundColor={this.colors[2]}
                            textColor={theme.whiteColor}
                            navTheme="light"
                            index={2}
                        />
                    </Waypoint>
                    <Waypoint onEnter={() => this.enterHandler(3)}>
                        <VideoSlide
                            lineSrc="/us/lines/dark-blue.svg"
                            videoSrc="/us/vids/ultrastore-admin.mp4"
                            title="Custom CMS"
                            description={(
                                "We’re designed and developed super fast content management system which solves all admin needs."
                            )}
                            backgroundColor={this.colors[3]}
                            textColor={theme.whiteColor}
                            navTheme="light"
                            index={3}
                        />
                    </Waypoint>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        width: '100%', minHeight: '100vh',
        position: 'relative',
        zIndex: props.index
    }),
    scroller: {
        backgroundColor: '#50E3C2',
        willChange: 'backgroundColor, transform, opacity'
    }
};

export default windowSize(
    injectStyle(styles)(VideoSlidesSection)
);
