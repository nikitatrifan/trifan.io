import React from 'react'
import Svg from './Svg'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import { TweenMax, Power2 } from 'gsap'
import theme from "../theme";

class PulsingIcon extends React.Component {
    static defaultProps = {
        color: theme.whiteColor
    };
    loadIconHandler = () => {
        this.wrapper = document.querySelector('#pulsing-icon');
        this.startAnimation();
    };

    dur = .56;
    ease = Power2.easeInOut;
    intervalTiming = 5000;
    interval;

    pulseIn = (onComplete) => {
        if (this.isUnMounted)
            return;

        TweenMax.to(this.wrapper, this.dur, {
            fill: '#121212', scale: .98,
            ease: this.ease, transformOrigin: '50% 50%',
            onComplete
        })
    };

    pulseOut = (props = {}) => {
        if (this.isUnMounted)
            return;

        TweenMax.to(this.wrapper, this.dur, {
            fill: '#fff', scale: 1,
            ease: this.ease, transformOrigin: '50% 50%',
            ...props
        })
    };

    animate = () => {
        this.pulseIn(() => {
            this.pulseOut()
        })
    };

    startAnimation = () => {
        clearInterval(this.interval);
        this.animate();
        this.interval = setInterval(this.animate, this.intervalTiming);
    };

    componentWillUnmount() {
        this.isUnMounted = true;
        clearInterval(this.interval);
    }

    render() {
        const { classes, color, className } = this.props;
        return (
            <Svg
                onLoad={this.loadIconHandler}
                src="/icons/services.svg"
                style={{fill: color}}
                className={classNames(
                    classes.wrapper, className
                )}
            />
        )
    }
}

const styles = {
    wrapper: {
        width: '100%'
    }
};

export default injectStyle(styles)(PulsingIcon);