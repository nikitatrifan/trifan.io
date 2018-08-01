import React from 'react'
import HexToRgba from 'hex-to-rgba'
import injectStyle from 'react-jss'
import classNames from 'classnames'
import { TweenMax } from 'gsap'
import theme from '../theme'
import responsive from "../helpers/responsive";

class Card extends React.Component {
    static defaultProps = {
        color: theme.whiteColor,
        initialOpacity: 0,
        mobileInitialOpacity: .12,
        opacity: 0.06,
        dur: .35, fixer: 50,
        ease: 'Cubic.easeOut'
    };

    mouseEnterHandler = () => {
        const { dur, opacity, color } = this.props;

        TweenMax.to(this.wrapper, dur, {
            borderColor: HexToRgba(color, opacity),
        });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter();
        }
    };
    mouseLeaveHandler = () => {
        const { dur, initialOpacity, color, } = this.props;

        TweenMax.to(this.wrapper, dur, {
            borderColor: HexToRgba(color, initialOpacity),
        });
        TweenMax.to(this.content, dur, {
            x: 0, y: 0,
        });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }
    };
    mouseMoveHandler = (e) => {
        const { dur, ease, fixer } = this.props;
        const rect = this.wrapper.getBoundingClientRect();
        const pageX = (e.clientX - rect.x) - (rect.width / 2);
        const pageY = (e.clientY - rect.y) - (rect.height / 2);

        const index = 1;

        const ratio = index / fixer;
        const x = pageX * ratio;
        const y = pageY * ratio;

        TweenMax.to(this.content, dur, {
            x, y, ease,
        });

        const percentX = pageX / (rect.width);
        const percentY = pageY / (rect.height);

        TweenMax.to(this.wrapper, dur, {
            rotationX: percentX * 5 / fixer + 'deg',
            rotationY: percentY * 5 / fixer + 'deg',
        });

        if (this.props.onMouseMove) {
            this.props.onMouseMove(e);
        }
    };

    render() {
        const {
            classes, className, wrapperClassName,
            color,
            initialOpacity,
            mobileInitialOpacity,
            opacity, // eslint-disable-line
            dur, fixer, // eslint-disable-line
            ease, // eslint-disable-line
            children, ...props
        } = this.props;
        const { mouseLeaveHandler, mouseEnterHandler, mouseMoveHandler } = this;
        const borderColor = HexToRgba(
            color, responsive().isMobile ?
                mobileInitialOpacity : initialOpacity
        );
        return (
            <div
                {...props}
                onMouseMove={mouseMoveHandler}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                ref={b => this.wrapper = b}
                style={{borderColor}}
                className={classNames(classes.wrapper, className)}
            >
                <div ref={b => this.content = b}
                     className={classNames(classes.content, wrapperClassName,)}>
                    {children}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        borderRadius: '2px',
        border: '2px solid',
        borderColor: 'rgba(255,255,255,0.06)',
        padding: '7px 0 38px',
        marginBottom: '20px'
    },
    content: {
        width: '80%', margin: '0 auto'
    }
};

export default injectStyle(styles)(Card)