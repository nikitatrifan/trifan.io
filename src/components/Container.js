import React from 'react'
import injectStyles from 'react-jss'

const Container = ({className, classes, children, ...props}) => (
    <div className={[classes.wrapper, className].join(' ')} {...props}>
        {children}
    </div>
);

const styles = {
    wrapper: {
        width: '90%',
        maxWidth: '1440px',
        margin: '0 auto'
    }
};

export default injectStyles(styles)(Container);