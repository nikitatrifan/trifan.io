import React from 'react'
import injectStyle from 'react-jss'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import Container from '../../components/Container'
import CallToScroll from '../../components/CallToScroll'
import PulsingIcon from '../../components/PulsingIcon'
import BlockName from '../../components/BlockName'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'
import responsive from '../../helpers/responsive'
import theme from '../../theme'
import { Power0, TimelineMax, TweenMax } from "gsap";

class About extends React.Component {
    static defaultProps = {
        textColor: theme.whiteColor
    };
    componentDidMount() {
        if (responsive().isMobile) {
            return false;
        }

        const upd = () => {
            this.tl = this.tween();
            this.scrollHandler();
        };
        setTimeout(() => {
            upd(); setTimeout(upd, 300);
        }, 300);
        window.addEventListener('resize', this.resizeHandler);
        window.onScroll(this.scrollHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
        window.offScroll(this.scrollHandler);
    }
    resizeHandler = () => {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 60)
    };
    scrollHandler = () => {
        if (this.props.disabled)
            return;

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
        if (!this.wrapper)
            return false;

        const tl = new TimelineMax({ paused: true });
        const dur = 3, gap = 100, gapPulse = 200;

        tl.fromTo(this.pulse, dur / 2, {
            opacity: 0, y: gapPulse
        }, {
            opacity: 1, y: 0
        });

        tl.staggerFromTo(this.blocks, dur / 2, {
            opacity: 0, y: gap
        }, {
            opacity: 1, y: 0
        }, 0.4, '0');

        tl.staggerFromTo(this.blocks, dur / 2, {
            opacity: 1, y: 0
        }, {
            opacity: 0, y: -gap
        }, 0.2);

        return tl;
    };

    blocks = [];

    render() {
        const { classes, textColor } = this.props;
        return (
            <div id="about" ref={b => this.wrapper = b} className={classes.wrapper}>
                <div className={classes.scroller}>
                    <BlockName index={0} name="About"/>
                    <Container index={1} type="content">
                        <Box wrap className={classes.grid} justify="between">
                            <div className={classes.icon}>
                                <div ref={b => this.pulse = b} className={classes.icon_wrapper}>
                                    <PulsingIcon />
                                </div>
                            </div>
                            <div className={classes.text}>
                                <div ref={b => this.blocks[0] = b}>
                                    <Heading margin="medium" color={textColor} size={2}>
                                        My name is Nikita Trifan and I’m a
                                        full-stack developer with good
                                        UX—UI feeling.
                                    </Heading>
                                </div>
                                <div ref={b => this.blocks[1] = b}>
                                    <Heading margin="medium" color={textColor} size={2}>
                                        I believe that in a future all websites
                                        will works like my web apps —
                                        asynchronous and interactive.
                                    </Heading>
                                </div>
                                <div ref={b => this.blocks[2] = b}>
                                    <Paragraph margin="medium" color={textColor}>
                                        I’m always using the best practises and technologies to get
                                        best at developing time user experience. My 2-3 years old works
                                        still relevant by performance speed and a design at least to this day.
                                    </Paragraph>
                                </div>
                            </div>
                        </Box>
                    </Container>
                    <div className={classes.callToScroll}>
                        <Container type="content">
                            <CallToScroll text="Explore my approach" color={textColor} />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        backgroundColor: theme.introBackground,
        position: 'relative',
        zIndex: props.index || 0
    }),
    scroller: {
        minHeight: '100vh',
        padding: '130px 0',
        position: 'relative',
        [responsive('mobile')]: {
            padding: '60px 0',
        }
    },
    icon: {
        width: '30%',
        [responsive('mobile')]: {
            width: '100%'
        }
    },
    icon_wrapper: {
        width: '85%',
        maxWidth: '120px',
        margin: '0 auto',
        [responsive('mobile')]: {
            marginLeft: '0',
            width: '100%'
        }
    },
    text: {
        width: '70%',
        [responsive('mobile')]: {
            width: '100%'
        }
    },
    callToScroll: {
        position: 'absolute',
        left: 0, bottom: 0,
        width: '100%'
    },
    grid: {
        [responsive('mobile')]: {
            justifyContent: 'flex-start'
        }
    }
};

export default injectStyle(styles)(About)