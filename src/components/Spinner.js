import React from 'react'
import { findDOMNode } from 'react-dom'
import injectStyle from 'react-jss'
import Waypoint from './Waypoint'
import Svg from './Svg'
import { TweenMax, Power0 } from 'gsap'
import theme from "../theme";

class Spinner extends React.Component {
    static defaultProps = {
        fill: theme.whiteColor,
        size: 54, isAnimated: true
    };

    dur = 1.3;
    delay = 0;

    animate = () => {
        if (this.isUnMounted || !this.props.isAnimated)
            return false;

        const block = findDOMNode(this);

        if (!block)
            return false;

        TweenMax.fromTo(block, this.dur, {
            rotationZ: '0deg'
        }, {
            rotationZ: '720deg',
            transformOrigin: '50% 50%',
            ease: Power0.easeNone,
            delay: this.delay,
            onComplete: this.animate
        })
    };

    enterHandler = () => {
        this.inFocus = true;
        this.startAnimation();
    };
    leaveHandler = () => {
        this.inFocus = false;
        this.removeAnimation();
    };

    startAnimation = () => {
        this.isUnMounted = false;
        this.animate();
    };

    removeAnimation = () => {
        this.isUnMounted = true;
    };

    componentWillUnmount() {
        this.inFocus = false;
        this.removeAnimation();
    }
    componentDidUpdate() {
        if (!this.inFocus)
            return;

        if (this.props.isAnimating) {
            return this.startAnimation();
        }

        this.removeAnimation();
    }

    componentDidMount() {
        setTimeout(() => {
            if (!this.props.isAnimating) {
                this.removeAnimation();
            }
        }, 60)
    }

    render() {
        const { classes, fill, size } = this.props;
        return (
            <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
                <Svg
                    style={{fill, width: `${size}px`, height: `${size}px`}}
                    src="/icons/spinner.svg"
                    className={classes.wrapper}
                />
            </Waypoint>
        )
    }
}

const styles = {
    wrapper: {
    }
};

export default injectStyle(styles)(Spinner)