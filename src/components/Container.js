import React from 'react'
import PropTypes from 'prop-types'
import injectStyles from 'react-jss'

const Container = ({className, type, classes, children, ...props}) => (
    <div className={[classes.wrapper, classes[type], className].join(' ')} {...props}>
        {children}
    </div>
);

const styles = {
    wrapper: {
        width: '90%',
        margin: '0 auto'
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
    type: PropTypes.oneOf([
        'content', 'default', 'bootstrap'
    ]),
};

Container.defaultProps = {
    type: 'default',
};

export default injectStyles(styles)(Container);