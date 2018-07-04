import React from 'react'
import PropTypes from 'prop-types'
import Paragraph from './Paragraph'
import { TweenMax } from 'gsap'
import injectStyles from 'react-jss'
import responsive from "../helpers/responsive";

class CallToScroll extends React.Component {
    static propTypes = {
        color: PropTypes.string
    };

    setBarRef = b => this.indicator = b;
    dur = 2;

    indicatorAnimation = () => {
        const block = this.indicator;
        const wrapperHeight = block.parentNode.getBoundingClientRect().height;
        const blockHeight = block.getBoundingClientRect().height;

        this.tween = TweenMax.fromTo(block, this.dur, {
            y: -blockHeight,
        }, {
            y: wrapperHeight,
            //ease: Cubic.easeOut
        })
    };

    componentDidMount() {
        setTimeout(() => {
            this.indicatorAnimation();
            this.interval = setInterval(
                this.indicatorAnimation,
                (this.dur * 2) * 1000
            );
        }, 300)
    }
    componentWillUnmount() {
        this.tween.kill();
        clearInterval(this.interval);
    }

    render() {
        const { classes, color = '#121212' } = this.props;
        return (
            <div className={classes.wrapper}>
                <Paragraph
                    className={classes.paragraph}
                    color={color} margin="small"
                    upperCase size={5}
                >
                    Explore my work
                </Paragraph>
                <div className={classes.indicator}>
                    <div
                        ref={this.setBarRef}
                        style={{backgroundColor: color}}
                        className={classes.indicator_bar}
                    />
                    <div
                        style={{backgroundColor: color}}
                        className={classes.indicator_bg}
                    />
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        display: 'block'
    },
    paragraph: {
        letterSpacing: .4,
        [responsive('mobile')]: {
            fontSize: '10px'
        }
    },
    indicator: {
        height: '57px',
        width: '1px',
        position: 'relative',
        overflow: 'hidden',
        [responsive('mobile')]: {
            height: '37px'
        }
    },
    indicator_bg: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%',
        height: '100%',
        opacity: .35
    },
    indicator_bar: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translateY(-100%)'
    }
};

export default injectStyles(styles)(CallToScroll)