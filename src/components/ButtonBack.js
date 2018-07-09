import React from 'react'
import { findDOMNode } from 'react-dom'
import injectStyle from 'react-jss'
import Box from './Box'
import Svg from './Svg'
import { TweenMax } from 'gsap'
import theme from '../theme'

class ButtonBack extends React.Component {
    static defaultProps = {
        color: theme.whiteColor,
        text: 'Back'
    };

    dur = .35;

    mouseDownHandler = () => {
        const block = findDOMNode(this);

        if (!block)
            return;

        TweenMax.to(block, this.dur, {
            scale: 0.98
        });

        if (this.props.onMouseDown) {
            this.props.onMouseDown();
        }
    };

    mouseUpHandler = () => {
        const block = findDOMNode(this);

        if (!block)
            return;

        TweenMax.to(block, this.dur, {
            scale: 1
        });

        if (this.props.onMouseUp) {
            this.props.onMouseUp();
        }
    };

    render() {
        const { color, classes, text, ...props } = this.props;
        return (
            <Box
                {...props} justify="start" align="center"
                onMouseDown={this.mouseDownHandler}
                onMouseUp={this.mouseUpHandler}
                className={classes.back}
            >
                <Svg style={{fill: color}} src="/icons/arrow.svg" className={classes.arrow}/>
                <span style={{color}}>{text}</span>
            </Box>
        )
    }
}

const cssTransitionTime = .25;

const styles = {
    back: {
        cursor: 'pointer',
        userSelect: 'none',
        '& span': {
            transition: `transform ${cssTransitionTime}s ease-in-out`,
            marginLeft: '10px', display: 'inline-block'
        },
        '&:hover': {
            '& svg': {
                transform: 'translateX(7px)',
            },
            '& span': {
                transform: 'translateX(-5px)',
            }
        },
    },
    arrow: {
        transform: 'rotateZ(180deg)',
        width: '19px',
        '& svg': {
            transition: `transform ${cssTransitionTime}s ease-in-out`,
            fill: 'inherit',
            '& *': {
                fill: 'inherit'
            }
        }
    }
};

export default injectStyle(styles)(ButtonBack)