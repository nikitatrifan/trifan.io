import React from 'react'
import windowSize from 'react-window-size'
import injectStyle from 'react-jss'
import { TweenMax, TimelineMax, Power0 } from 'gsap'
import Carousel from '../../components/Carousel'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import theme from '../../theme'
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class Brandbook extends React.Component {
    getArray = l => {
        let arr = [];

        for (let i = 1; i <= l; i++) {
            arr.push(i);
        }

        return arr;
    };
    getData = () => {
        return this.getArray(31).map(it => (
            `/us/brandbook/${it}.jpg`
        ))
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
        const height = parseInt(this.wrapper.clientHeight / 2, 10);
        const dur = 1;
        const entryPoint = dur * 0.9;

        tl.fromTo(this.scroller, dur - entryPoint, {
            y: 0
        }, {
            y: height,
            ease: Power0.easeNone
        }, entryPoint);

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container className={classes.header} type="content">
                        <Heading size="2">
                            Brandbook
                        </Heading>
                        <Paragraph  opacity size="3" margin="small">
                            Nikita Nikiforof designed this brandbook for the client.
                        </Paragraph>
                    </Container>

                    <Container>
                        <Carousel
                            minOpacity={.3}
                            images={this.getData()}
                        />
                    </Container>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        position: 'relative',
        zIndex: props.index
    }),
    scroller: {
        minHeight: '100vh',
        backgroundColor: theme.lightGrayColor,
        padding: '90px 0'
    }
};

export default windowSize(
    injectStyle(styles)(Brandbook)
)