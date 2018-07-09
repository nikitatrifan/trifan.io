import React from 'react'
import { findDOMNode } from 'react-dom'
import injectStyle from 'react-jss'
import Waypoint from './Waypoint'
import Svg from './Svg'
import { TimelineMax, Power2 } from 'gsap'
import theme from "../theme";

class GlobeIcon extends React.Component {
    static defaultProps = {
        fill: theme.whiteColor,
        size: 54, isAnimated: true
    };

    dur = 3;
    gap = 3;
    ease = Power2.easeInOut;

    animate = () => {
        if (this.isUnMounted || !this.props.isAnimated)
            return false;

        const block = findDOMNode(this);

        if (!block)
            return;

        if (this.tl) {
            this.tl.kill();
        }

        const tl = this.tl = new TimelineMax({
            onComplete: this.animate
        });
        const paths = [...(block.querySelectorAll('path') || [])];

        if (!paths || !paths.length)
            return this.animate();

        const { dur, gap, ease } = this;

        tl.staggerFromTo(paths, dur / 3, {
            y: 0
        }, {
            y: gap, ease
        }, .04);

        tl.staggerFromTo(paths, dur / 3, {
            y: gap
        }, {
            y: -gap, ease
        }, .04);

        tl.staggerFromTo(paths, dur / 3, {
            y: -gap
        }, {
            y: 0, ease
        }, .04, '+=0');
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
        window.anim = this.animate;
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
                    src="/icons/globe.svg"
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

export default injectStyle(styles)(GlobeIcon)