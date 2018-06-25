import React from 'react'
import classNames from 'classnames'
import theme from '../theme'
import injectStyles from 'react-jss'

class ButtonText extends React.Component {
    render() {
        const { classes, className, children, ...props } = this.props;
        return (
            <div className={classNames(classes.wrapper, className)}>
                <button {...props} className={classes.button}>
                    {children}
                </button>
                <span className={classes.shadow}/>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 0, overflow: 'hidden',
        '&:hover span': {
            opacity: 1,
            transform: 'translateX(100%)'
        },
        '&:hover button': {
            transform: 'scale(0.95)'
        }
    },
    button: {
        fontSize: '22px',
        lineHeight: '22px',
        letterSpacing: '0.4px',
        fontFamily: theme.mainFont,
        fontWeight: '600',
        color: theme.textColor,
        padding: '20px 40px',
        textAlign: 'center',
        outline: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        zIndex: 0,
        border: 'none',
        transition: 'transform .25s ease-in-out',
        whiteSpace: 'pre', backgroundColor: 'transparent'
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
    }
};

export default injectStyles(styles)(ButtonText);