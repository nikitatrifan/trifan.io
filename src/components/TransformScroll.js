import React from 'react'
import PropTypes from "prop-types";
import classNames from 'classnames'
import injectStyles from 'react-jss'
import responsive from '../helpers/responsive'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../helpers/getNodeRelativeViewportPercentPosition";

class TransformScroll extends React.Component {
    static propTypes = {
        wrapperClassName: PropTypes.string,
        scrollerClassName: PropTypes.string,
        scrollRef: PropTypes.func,
        offset: PropTypes.number,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        if (props.scrollRef) {
            props.scrollRef(this)
        }
    }

    componentDidMount() {
        const upd = () => {
            this.tl = this.tween();
            this.scrollHandler();
        };
        setTimeout(() => {
            upd(); setTimeout(upd, 300);
        }, 300);
        window.addEventListener('resize', this.resizeHandler);
        window.onScroll(this.scrollHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
        window.offScroll(this.scrollHandler);
    }
    resizeHandler = () => {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 60)
    };
    scrollHandler = () => {
        if (this.props.disabled)
            return;

        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        if (!this.tl)
            return false;

        this.log(percent);

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    log = (arg, arg1) => {
        if (this.props.name === 'Todos') {
            if (typeof arg === "function") {
                return console.log(arg())
            }
            if (arg1)
                return console.log(arg, arg1);

            return console.log(arg);
        }
    };

    calcRatio = () => {
        const offsetTop = parseFloat(this.wrapper.offsetTop);
        const wrapperHeight = parseFloat(this.wrapper.clientHeight);
        const windowHeight = parseFloat(window.innerHeight);
        const percent = wrapperHeight / 100;
        let offset = (windowHeight) / percent;

        if (responsive().isDesktop) {
            // on desktop each offset
            // needs to be detected manually
            // of course this is a bug :(
            // but I hope it's a temporary solution
            offset = (windowHeight * (this.props.offset || 1)) / percent
        }

        const ratio = (100 - offset) / 100;

        this.log(() => (
            window.data = {
                percent, ratio, windowHeight, wrapperHeight,
            }
        ));

        // if wrapper height looks similar
        // by height to window height
        // the animation begins when bottom block bezel
        // reach the bottom of a viewport
        const heightRatio = wrapperHeight / windowHeight;
        if (heightRatio >= .95 && heightRatio <= 1) {
            if (offsetTop <= wrapperHeight) {
                return offsetTop / wrapperHeight;
            }

            return 0.5;
        }

        return ratio;
    };

    tween = () => {
        if (!this.scroller)
            return false;

        const tl = new TimelineMax({ paused: true });
        const windowHeight = parseFloat(window.innerHeight);
        const dur = 3;
        const entryPoint = dur * this.calcRatio();

        this.log('ratio result:', this.calcRatio());
        this.log('entryPoint is', entryPoint);
        this.log(windowHeight / 2);

        tl.to(this.scroller, entryPoint,{
            y: 0, opacity: 1,
            ease: Power0.easeNone
        });

        tl.fromTo(this.scroller, dur - entryPoint, {
            opacity: 1,
            y: 0
        }, {
            y: windowHeight / 2,
            opacity: .4,
            ease: Power0.easeNone
        });

        return tl;
    };

    setWrapperRef = b => this.wrapper = b;
    setScrollerRef = b => this.scroller = b;

    render() {
        const { classes, wrapperClassName, scrollerClassName, id, children } = this.props;
        return (
            <div
                className={classNames(classes.wrapper, wrapperClassName)}
                ref={this.setWrapperRef} id={id}
            >
                <div
                    className={classNames(classes.scroller, scrollerClassName)}
                    ref={this.setScrollerRef}
                >
                    {children}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index || 0,
        position: 'relative',
        backgroundColor: '#000'
    }),
    scroller: {
        minHeight: '100vh',
        backgroundColor: '#fff',
        willChange: 'transform, opacity'
    },
};

export default injectStyles(styles)(TransformScroll);