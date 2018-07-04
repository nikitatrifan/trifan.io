import React from 'react'
import PropTypes from 'prop-types'
import windowSize from 'react-window-size'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import CallToScroll from '../../components/CallToScroll'
import MatrixRainingCode from '../../components/MatrixRainingCode'
import { TweenMax, TimelineMax, Power0 } from 'gsap'
import injectStyles from 'react-jss'
import getNodeRelativeViewportPercentPosition from '../../helpers/getNodeRelativeViewportPercentPosition'

class IntroSlide extends React.Component{
    static propTypes = {
        onMatrixRainingCodeComplete: PropTypes.func
    };

    content = [];
    componentDidMount() {
        this.showContent();

        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
            window.addEventListener('scroll', this.scrollHandler, false);
        }, 300);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = () => {
        const percent =
            getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };

    tween = () => {
        const tl = new TimelineMax({ paused: true });
        const dur = .1;
        tl
            .to(this.content, dur, {
                opacity: 0,
                y: this.props.windowHeight / 3,
                ease: Power0.easeNone
            })
            .to(this.bg, dur, {
                y: this.props.windowHeight / 2,
                //opacity: 0,
                ease: Power0.easeNone
            }, '0');

        return tl;
    };

    showContent = () => {
        TweenMax.fromTo(this.content, .7, {
            opacity: 0
        }, {
            opacity: 1,
            delay: .5
        })
    };

    render() {
        const { classes, onMatrixRainingCodeComplete } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.content[0] = b} className={classes.content}>
                    <Container>
                        <Paragraph size={3} color="#fff">
                            Non-template <br/>
                            web-sites & mobile apps
                        </Paragraph>
                        <Heading margin="small" size={1} color="#fff">
                            Trifan is about to create something <br/>
                            unique with creative scenarios <br/>
                            of user experience.
                        </Heading>
                    </Container>
                </div>
                <div ref={b => this.content[1] = b} className={classes.callToScroll}>
                    <Container>
                        <CallToScroll color="#fff" />
                    </Container>
                </div>

                <div className={classes.background}>
                    <div ref={b => this.bg = b} className={classes.backgroundContent}>
                        <MatrixRainingCode
                            noAnimation={this.props.noAnimation}
                            onComplete={onMatrixRainingCodeComplete}
                        />
                    </div>
                    <div className={classes.overlay}/>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%', height: '100vh',
        position: 'relative',
        zIndex: 2, overflow: 'hidden'
    },
    content: {
        width: '100%',
        position: 'absolute',
        left: 0, bottom: '20%',
        zIndex: 10, opacity: 0,
        willChange: 'opacity, transform'
    },
    callToScroll: {
        position: 'absolute',
        left: 0, width: '100%',
        bottom: 0, zIndex: 10,
        opacity: 0,
        willChange: 'opacity, transform'
    },
    background: {
        position: 'absolute',
        zIndex: 0, left: 0,
        top: 0, width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        userSelect: 'none',
        overflow: 'hidden'
    },
    backgroundContent: {
        position: 'absolute',
        zIndex: 0, left: 0,
        top: 0, width: '100%',
        height: '100%',
        willChange: 'opacity, transform'
    },
    overlay: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        backgroundColor: '#151b23',
        opacity: .76
    }
};

export default windowSize(injectStyles(styles)(IntroSlide));