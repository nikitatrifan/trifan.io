import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import injectStyles from 'react-jss'
import theme from '../theme'

const Link = ({classes, icon, to, color = theme.textColor, className, children, ...props}) => {
    const Route = to.indexOf('http') !== -1 ? 'a' : RouterLink;
    const linkData = Route === 'a' ? {href: to} : {to};
    return (
        <Route
            style={{color}}
            className={classNames(classes.link, className)}
            {...linkData}
            {...props}
        >
            {icon ?
                (
                    <span className={classes.wrapper}>
                    {children}
                        <span
                            style={{backgroundColor: color}}
                            className={classes.icon}
                        />
                </span>
                ) :
                children
            }
        </Route>
    )
};

const styles = {
    link: {
        display: 'inline-block',
        outline: 'none', textDecoration: 'none',
        cursor: 'pointer', color: theme.textColor,
        transition: 'opacity .3s ease-in-out',
        '&:hover': {
            opacity: .6
        }
    },
    wrapper: {
        display: 'flex', justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        width: '12px',
        height: '12px',
        '-webkit-mask': 'url(/icons/link.svg) no-repeat 100% 100%',
        mask: 'url(/icons/link.svg) no-repeat 100% 100%',
        '-webkit-mask-size': 'cover',
        'mask-size': 'cover',
        display: 'inline-block',
        marginLeft: '6px',
        opacity: .8
    }
};

Link.propTypes = {
    icon: PropTypes.bool,
    to: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};

Link.defaultProps = {
    color: theme.textColor
};

export default injectStyles(styles)(Link)