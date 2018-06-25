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
        <span
            {...props}
            className={__className}
            style={{
                ...style,
                ...(color ? {color} : {}),
                ...__margin
            }}
        >
            {children}
        </span>
    )
}

const styles = {
    wrapper: {
        fontFamily: theme.mainFont,
        margin: 0, padding: 0
    },
    size_2: {
        fontSize: '21px',
        lineHeight: '26px',
        color: theme.textColor,
        opacity: .6
    }
};

Title.propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    className: PropTypes.string,
};

export default injectStyles(styles)(Title);