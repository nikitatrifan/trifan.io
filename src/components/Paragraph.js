import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import theme from '../theme'

function Paragraph(__props) {
    const {
        size = 2, classes, color, style = {},
        weight = '300', margin, upperCase,
        className, children, opacity, ...props
    } = __props;
    const __className = classNames(
        classes.wrapper,
        classes[`size_${size}`],
        upperCase && classes.upperCase,
        opacity && classes.opacity,
        className
    );
    const __margin = margin ? {
        margin: theme[`${margin}Margin`]
    } : {};

    return (
        <p {...props}
           className={__className}
           style={{
               ...style,
               ...(color ? {color} : {}),
               ...(weight ? {weight} : {}),
               ...__margin
           }}
        >
            {children}
        </p>

    )
}

const styles = {
    wrapper: {
        fontFamily: theme.mainFont,
        margin: 0, padding: 0,
        color: theme.textColor,
        fontWeight: '400'
    },
    upperCase: {
        textTransform: 'upperCase'
    },
    opacity: { opacity: .55 },
    size_2: {
        fontSize: '21px',
        lineHeight: '26px',
    },
    size_3: {
        fontSize: '19px',
        lineHeight: '24px',
    },
    size_4: {
        fontSize: '16px',
        lineHeight: '19px'
    },
    size_5: {
        fontSize: '14px',
        lineHeight: '21px',
    },
    size_6: {
        fontSize: '12px',
        lineHeight: '16px'
    }
};

Paragraph.propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    className: PropTypes.string,
};

export default injectStyles(styles)(Paragraph);