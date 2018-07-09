import React from 'react'
import injectStyle from 'react-jss'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import Container from '../../components/Container'
import BlockName from '../../components/BlockName'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'
import theme from '../../theme'
import {Power0, TimelineMax, TweenMax} from "gsap";

class Contact extends React.Component {
    static defaultProps = {
        textColor: theme.whiteColor
    };
    componentDidMount() {
        const upd = () => {
            this.tl = this.tween();
            this.scrollHandler();
        };
        setTimeout(() => {
            upd(); setTimeout(upd, 300);
        }, 300);
        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('scroll', this.scrollHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
        window.removeEventListener('scroll', this.scrollHandler);
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
        return;

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
            <div ref={b => this.wrapper = b} id="contact" className={classes.wrapper}>
                <div className={classes.scroller}>
                    <Box justify="center" align="center" className={classes.content}>
                        <Container type="content">
                            <Paragraph margin="medium" color={textColor}>
                                If you’re interested in working <br/>
                                or collaborating with me please contact me.
                            </Paragraph>
                            <Heading margin="medium" color={textColor}>
                                hello@trifan.io
                            </Heading>
                        </Container>
                    </Box>
                    <div className={classes.bg}>
                        <img
                            className={classes.bg_image}
                            src="/trifan-nikita.jpg" alt="Nikita Trifan"
                        />
                    </div>
                    <BlockName index={1} name="Get in Touch" />
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        backgroundColor: '#000000',
        position: 'relative',
        zIndex: props.index || 0
    }),
    scroller: {
        position: 'relative',
    },
    content: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%', height: '100%',
        zIndex: 10
    },
    bg: {
        opacity: .2, position: 'relative',
        zIndex: 0
    }
};

export default injectStyle(styles)(Contact)