import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink as RouterLink } from 'react-router-dom'
import { TweenMax } from 'gsap'
import injectStyles from 'react-jss'
import theme from '../theme'

class ButtonShadow extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        gradient: PropTypes.array,
        children: PropTypes.any,
        to: PropTypes.string
    };

    setRef = b => this.button = b;

    dur = .35;
    scale = .85;
    hoverScale = .9;

    hoverAnimation = () => {
        if (!this.button)
            return;
        TweenMax.to(this.button, this.dur, {
            scale: this.hoverScale
        })
    };

    startAnimation = () => {
        if (!this.button)
            return;
        TweenMax.to(this.button, this.dur, {
            scale: this.scale
        })
    };

    endAnimation = () => {
        if (!this.button)
            return;
        TweenMax.to(this.button, this.dur, {
            scale: 1
        })
    };

    render() {
        const { classes, className, gradient, children, to, ...props } = this.props;
        const buttonStyle = gradient && {
            background: `linear-gradient(to right, ${gradient.join(', ')})`
        };
        const shadowStyle = gradient && {
            backgroundColor: gradient[gradient.length - 1]
        };

        const Wrapper = to ? RouterLink : 'div';

        return (
            <Wrapper className={classNames(classes.wrapper, className)} to={to}>
                <button
                    ref={this.setRef}
                    onMouseOver={this.hoverAnimation}
                    onMouseLeave={this.endAnimation}
                    onTouchStart={this.startAnimation}
                    onMouseDown={this.startAnimation}
                    onTouchEnd={this.endAnimation}
                    onMouseUp={this.endAnimation}
                    style={buttonStyle} {...props}
                    className={classes.button}>
                    {children}
                </button>
                <span style={shadowStyle} className={classes.shadow}/>
            </Wrapper>
        )
    }
}

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    wrapper: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 0,
        '&:hover span': {
            transform: 'translate(-50%, -40%)'
        },
    },
    button: {
        fontSize: '22px',
        lineHeight: '22px',
        letterSpacing: '0.4px',
        fontFamily: theme.mainFont,
        fontWeight: '600',
        color: '#fff',
        background: `linear-gradient(to right, ${theme.primaryLightColor}, ${theme.primaryColor})`,
        padding: '20px 40px',
        textAlign: 'center',
        borderRadius: '30.5px',
        outline: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
        zIndex: 10,
        border: 'none',
        //transition: 'transform .25s ease-in-out',
        whiteSpace: 'pre',
        [mobileMedia]: {
            fontSize: '18px',
            lineHeight: '18px',
        }
    },
    shadow: {
        display: 'block',
        position: 'absolute',
        left: '50%', top: '70%',
        width: '70%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.primaryColor,
        zIndex: 0, borderRadius: '30.5px',
        filter: 'blur(20px)', opacity: .35,
        transition: 'transform .25s ease-in-out'
    }
};

export default injectStyles(styles)(ButtonShadow);