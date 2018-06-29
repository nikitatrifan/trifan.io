import React from 'react'
import injectStyles from 'react-jss'

const Container = ({className, type, classes, children, ...props}) => (
    <div className={[classes.wrapper, classes[type], className].join(' ')} {...props}>
        {children}
    </div>
);

const styles = {
    wrapper: {
        width: '90%',
        maxWidth: '1440px',
        margin: '0 auto'
    },
    content: {
        maxWidth: '767px',
    }
};

export default injectStyles(styles)(Container);