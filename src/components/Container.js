import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'

const Container = ({className, type, classes, offset, index, children, ...props}) => {
    const __className = classNames(
        classes.wrapper, classes[type],
        classes[offset],
        className
    );

    return (
        <div className={__className} {...props}>
            {children}
        </div>
    )
};

const styles = {
    wrapper: props => ({
        margin: '0 auto',
        ...(props.index ? {
            zIndex: props.index,
            position: 'relative'
        } : {})
    }),
    small: {
        width: '90%',
    },
    medium: {
        width: '85%'
    },
    large: {
        width: '80%'
    },
    content: {
        maxWidth: '767px',
    },
    default: {
        maxWidth: '1440px',
    },
    bootstrap: {
        maxWidth: '1160px'
    }
};

Container.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    index: PropTypes.number,
    type: PropTypes.oneOf([
        'content', 'default', 'bootstrap'
    ]),
    offset: PropTypes.oneOf([
        'small', 'medium', 'large'
    ])
};

Container.defaultProps = {
    type: 'default',
    offset: 'small'
};

export default injectStyles(styles)(Container);