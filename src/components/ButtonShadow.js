import React from 'react'
import classNames from 'classnames'
import theme from '../theme'
import injectStyles from 'react-jss'

class ButtonShadow extends React.Component {
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
        zIndex: 0,
        '&:hover button': {
            transform: 'scale(0.95)'
        },
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
        zIndex: 10,
        border: 'none',
        transition: 'transform .25s ease-in-out',
        whiteSpace: 'pre'
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