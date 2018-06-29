import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import theme from '../theme'

function Title({ size = 2, classes, style, margin, color, className, children, ...props }) {
    const __className = classNames(
        classes.wrapper,
        classes[`size_${size}`],
        className
    );
    const __margin = margin ? {
        margin: theme[`${margin}Margin`]
    } : {};

    return (
        <strong
            {...props}
            className={__className}
            style={{
                ...style,
                ...(color ? {color} : {}),
                ...__margin
            }}
        >
            {children}
        </strong>
    )
}

const styles = {
    wrapper: {
        fontFamily: theme.secondaryFont,
        margin: 0, padding: 0, display: 'block'
    },
    size_1: {
        fontSize: '21px',
        lineHeight: '26px',
        fontWeight: '500',
        color: theme.textColor,
    },
    size_2: {
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: '500',
        color: theme.textColor,
    }
};

Title.propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    className: PropTypes.string,
    weight: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    margin: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string
};

export default injectStyles(styles)(Title);