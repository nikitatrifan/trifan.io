import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import Box from './Box'

class BrowserScreen extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        className: PropTypes.string,
        title: PropTypes.any
    };
    state = {
        contentWidth: 0,
    };
    componentDidMount() {
        setTimeout(this.resizeHandler, 300);
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler)
    }
    resizeHandler = () => {
        this.setState({
            contentWidth: parseFloat(this.contentWrapper.clientWidth)
        })
    };

    render() {
        const { classes, className, title, children } = this.props;
        const { contentWidth } = this.state;
        const calculatedBarHeight = contentWidth / 23;
        const barHeight = calculatedBarHeight < 35 ? 35 : calculatedBarHeight > 55 ? 55 : calculatedBarHeight;
        const dotSize = barHeight / 3.5;
        const addressBarHeight = barHeight / 2;
        const dotStyle = {
            height: dotSize, marginRight: dotSize / 2,
            width: dotSize
        };
        const titleStyle = {
            fontSize: `${barHeight / 3}px`,
            lineHeight: `${barHeight / 3}px`
        };

        return (
            <div className={classNames(classes.wrapper, className)}>
                <Box justify="between" align="center" style={{height: barHeight}} className={classes.bar}>
                    <Box justify="start" align="center">
                        {[0,1,2].map(it => (
                            <span key={it} style={dotStyle} className={classes.dot}/>
                        ))}
                    </Box>
                    <Box justify="center" align="center"
                         style={{height: addressBarHeight}} className={classes.addressBar}>
                        <span style={titleStyle} className={classes.title}>{title}</span>
                    </Box>
                </Box>
                <div ref={b => this.contentWrapper = b}>
                    {children}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        boxShadow: '0px 0px 60px 10px rgba(0,0,0,0.1)'
    },
    bar: {
        height: '0px',
        backgroundColor: '#D3D3D3',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
        transition: 'height .3s ease-in-out',
        padding: '0 1.5%'
    },
    dot: {
        backgroundColor: '#000',
        borderRadius: '50%',
        '&:nth-child(1)': {
            backgroundColor: '#E96E4C'
        },
        '&:nth-child(2)': {
            backgroundColor: '#E6A935'
        },
        '&:nth-child(3)': {
            backgroundColor: '#85C33D'
        }
    },
    addressBar: {
        width: '91%',
        backgroundColor: '#fff'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        opacity: .7
    }
};

export default injectStyles(styles)(BrowserScreen)