import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'

const Box = __props => {
    const {
        children, classes,
        align = "start", direction = "row",
        justify = "start", wrap,
        className,
        ...props
    } = __props;
    const __className = classNames(
        classes.wrapper, className,
        align === 'start' && classes.alignStart,
        align === 'center' && classes.alignCenter,
        align === 'end' && classes.alignEnd,
        direction === 'row' && classes.dirRow,
        direction === 'column' && classes.dirCol,
        direction === 'row-reverse' && classes.dirRowRev,
        direction === 'column-reverse' && classes.dirColRev,
        justify === 'between' && classes.jusBetween,
        justify === 'around' && classes.jusAround,
        justify === 'start' && classes.jusStart,
        justify === 'end' && classes.jusEnd,
        justify === 'center' && classes.jusCenter,
        wrap && classes.wrap
    );

    return (
        <div className={__className} {...props}>
            {children}
        </div>
    )
};

const styles = {
    wrapper: { display: 'flex' },
    alignStart: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    dirRow: { flexDirection: 'row' },
    dirCol: { flexDirection: 'column' },
    dirRowRev: { flexDirection: 'row-reverse' },
    dirColRev: { flexDirection: 'column-reverse' },
    jusBetween: { justifyContent: 'space-between' },
    jusCenter: { justifyContent: 'center' },
    jusAround: { justifyContent: 'space-around' },
    jusStart: { justifyContent: 'flex-start' },
    jusEnd: { justifyContent: 'flex-end' },
    wrap: { flexWrap: 'wrap' }
};

Box.propTypes = {
    children: PropTypes.any,
    justify: PropTypes.oneOf([
        'start', 'end', 'between', 'around',
    ]),
    align: PropTypes.oneOf([
        'start', 'end', 'center',
    ]),
    direction: PropTypes.oneOf([
        'row', 'column', 'row-reverse', 'column-reverse',
    ]),
    className: PropTypes.string
};

export default injectStyles(styles)(Box);