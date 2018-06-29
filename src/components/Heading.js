import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import theme from '../theme'

function Heading({ size = 2, classes, weight, margin, style, color, className, children, ...props }) {
    const __className = classNames(
        classes.wrapper,
        classes[`size_${size}`], className,
    );
    const __margin = margin ? {
        margin: theme[`${margin}Margin`]
    } : {};

    const Tag = `h${size}`;

    return (
        <Tag
            {...props}
            className={__className}
            style={{
                ...style,
                ...(color ? {color} : {}),
                ...(weight ? {weight} : {}),
                ...__margin
            }}
        >
            {children}
        </Tag>

    )
}

const styles = {
    wrapper: {
        fontFamily: theme.mainFont,
        margin: 0, padding: 0
    },
    size_1: {
        fontSize: '39px',
        lineHeight: '50px',
        fontWeight: '500',
        color: theme.textColor,
    },
    size_2: {
        fontSize: '36px',
        lineHeight: '46px',
        fontWeight: '500'
    }
};

Heading.propTypes = {
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

export default injectStyles(styles)(Heading);