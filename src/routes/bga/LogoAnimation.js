import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Svg from '../../components/Svg'
import responsive from '../../helpers/responsive'
import { TimelineMax, Back } from 'gsap'

class LogoAnimation extends React.Component {
    static propTypes = {
        onComplete: PropTypes.func,
        isAllowed: PropTypes.bool
    };

    animate = () => {
        if (!this.props.isAllowed)
            return;

        if (this.isAnimated)
            return false;

        this.isAnimated = true;

        const tl = new TimelineMax();
        const windowWidth = parseInt(window.innerWidth, 10);
        const dur = 1;

        tl.to(this.wrapper, dur / 2, {
            borderRadius: '50%',
            onComplete: this.props.onComplete
        });
        tl.to(this.wrapper, dur, {
            width: windowWidth / 2,
            height: windowWidth / 2,
            ease: Back.easeOut,
        }, dur / 3);

        tl.to(this.wrapper, dur, {
            right: '15%', top: '15%',
        }, `-=${dur}`);
        tl.to(this.icon, dur, {
            opacity: .5,
            width: '90%',
            height: '90%',
            ease: Back.easeOut,
        }, `-=${dur/2}`);
    };

    startAnimation = () => {
        setTimeout(this.animate, 500)
    };

    componentDidMount() {
        this.startAnimation();
    }

    componentDidUpdate() {
        if (this.props.isAllowed) {
            this.startAnimation();
        }
    }

    setIconRef = b => {
        this.icon = findDOMNode(b);
    };

    render() {
        const { classes, windowWidth, windowHeight } = this.props;
        const size = windowWidth > windowHeight ? windowWidth : windowHeight;
        const style = {
            width: size,
            height: size
        };

        return (
            <div ref={b => this.wrapper = b}
                 style={style}
                 className={classes.wrapper}>
                <Svg
                    ref={this.setIconRef}
                    src="/icons/logos/bga.svg"
                    className={classes.icon}
                />
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        position: 'absolute',
        top: '50%', right: '50%',
        transform: 'translate(50%, -50%)',
        width: '100%', height: '100%',
        backgroundColor: '#6059F1',
        overflow: 'hidden',
        zIndex: props.index || 0,
        [responsive('mobile')]: {
            top: '25%'
        },
        //willChange: 'width, height, right, top, border-radius'
    }),
    icon: {
        width: '30%',
        height: '30%',
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        willChange: 'opacity',
        '& svg': {
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '65%', height: '65%'
        }
    }
};

export default windowSize(
    injectStyles(styles)(LogoAnimation)
)
