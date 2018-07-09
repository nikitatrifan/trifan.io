import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Svg from './Svg'
import theme from '../theme'
import { TweenMax, Power2 } from 'gsap'
import injectStyles from 'react-jss'

class ButtonText extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        className: PropTypes.string,
        icon: PropTypes.bool,
        children: PropTypes.any
    };

    dur = .3;
    ease = Power2.easeOut;

    mouseDownHandler = (e) => {
        TweenMax.to(this.wrapper, this.dur, {
            scale: .98, ease: this.ease,
            transformOrigin: '50% 50%'
        });

        if (this.props.onMouseDown) {
            this.props.onMouseDown(e)
        }
    };
    mouseUpHandler = (e) => {
        TweenMax.to(this.wrapper, this.dur, {
            scale: 1, ease: this.ease,
            transformOrigin: '50% 50%'
        });

        if (this.props.onMouseUp) {
            this.props.onMouseUp(e)
        }
    };

    render() {
        const { classes, color = "#121212", className, icon, children, ...props } = this.props;
        const __className = classNames(
            classes.wrapper, icon && classes.wrapperWithIcon, className
        );
        return (
            <div ref={b => this.wrapper = b}
                 onMouseDown={this.mouseDownHandler}
                 onMouseUp={this.mouseUpHandler}
                 style={{color}}
                 className={__className}>
                <button {...props} className={classes.button}>
                    {
                        icon ? (
                            <span className={classes.iconWrapper}>
                                {children}
                                <Svg
                                    tag="strong" src="/icons/arrow.svg"
                                    style={{fill: color}}
                                    className={classes.icon}
                                />
                            </span>
                        ) : children
                    }
                </button>
                <i
                    style={{backgroundColor: color}}
                    className={classes.shadow}
                />
            </div>
        )
    }
}

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    wrapper: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 0, overflow: 'hidden',
        '&:hover i': {
            opacity: 1,
            transform: 'translateX(100%)'
        },
        '&:hover button': {
            transform: 'scale(0.95)'
        }
    },
    wrapperWithIcon: {
        overflow: 'visible',
        '& g': {
            opacity: '1 !important'
        },
        '& i': {
            display: 'none !important'
        },
        '& button': {
            padding: '20px 0'
        },
        '&:hover strong': {
            transform: 'translateX(2px)',
        },
        '&:hover button': {
            transform: 'translateX(5px)'
        }
    },
    button: {
        fontSize: '22px',
        lineHeight: '22px',
        letterSpacing: '0.4px',
        fontFamily: theme.mainFont,
        fontWeight: '600',
        color: 'inherit',
        padding: '20px 40px',
        textAlign: 'center',
        outline: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        zIndex: 0,
        border: 'none',
        transition: 'transform .25s ease-in-out',
        whiteSpace: 'pre', backgroundColor: 'transparent',
        [mobileMedia]: {
            fontSize: '18px',
            lineHeight: '18px',
        }
    },
    shadow: {
        display: 'block',
        position: 'absolute',
        left: 0, bottom: 0,
        width: '100%',
        height: '3px',
        backgroundColor: theme.textColor,
        zIndex: 0, opacity: 0,
        transform: 'translateX(-100%)',
        transition: 'opacity .5s ease-in-out, transform .7s ease-in-out'
    },
    iconWrapper: {
        display: 'flex', justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        width: '19px',
        height: '10px',
        display: 'inline-block',
        marginLeft: '6px',
        transition: 'transform .3s ease-in-out'
    }
};

export default injectStyles(styles)(ButtonText);