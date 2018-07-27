import React from 'react'
import injectStyle from 'react-jss'
import windowSize from 'react-window-size'
import IScroll from 'iscroll/build/iscroll-probe'
import classNames from 'classnames'
import {withRouter} from "react-router-dom";

class Scroller extends React.Component {
    setWrapperRef = b => this.wrapper = b;
    setScrollerRef = b => this.scroller = b;
    initScrollFns = [];

    constructor(props) {
        super(props);

        window.onScroll = this.addScrollEvent;
        window.offScroll = this.offScrollEvent;
    }

    addScrollEvent = fn => {
        if (!this.scroll || !this.scroll.on)
            return this.initScrollFns.push(fn);

        this.scroll.on('scroll', fn);
    };

    offScrollEvent = fn => {
        if (!this.scroll)
            return;

        this.scroll.off('scroll', fn)
    };

    initScroll = () => {
        const scroll = new IScroll(this.wrapper, {
            mouseWheel: true,
            scrollX: false, scrollY: true,
            scrollbars: 'custom', probeType: 3,
            interactiveScrollbars: true,
            deceleration: 0.0015,
            //bounceTime: 350,
            bounce: false,
            shrinkScrollbars: true
            //useTransition: false,
        });

        this.scroll = window.scroll = scroll;

        this.scroll.on('scroll', this.scrollHandler);
        this.scroll.on('scrollStart', this.scrollStartHandler);
        this.scroll.on('scrollEnd', this.scrollEndHandler);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.updateScrollTimer();

        setTimeout(() => {
            if (this.initScrollFns.length) {
                this.initScrollFns.forEach(fn => (
                    this.scroll.on('scroll', fn)
                ))
            }
        }, 60)
    };

    scrollStartHandler = () => {
        this.isScrolling = true;

        const { classes } = this.props;
        this.scroller.className = classNames(classes.scroller, classes.scrolling);
    };
    scrollEndHandler = () => {
        this.isScrolling = false;

        this.scroller.className = this.props.classes.scroller;
    };

    scrollHandler() {
        window.iScrollY = this.y;
    }

    updateScrollTimer = () => {
        this.updateScrollInterval = setInterval(() => {
            if (this.isScrolling || this.isUnMounted) {
                return;
            }

            this.scroll.refresh();
        }, 1500);
    };

    componentDidMount() {
        this.initScroll();
        this.update();
    }

    getSnapshotBeforeUpdate(prevProps) {
        if (this.props.location.key !== prevProps.location.key) {
            return true;
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            this.update();
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true;
        this.scroll.destroy();
        this.scroll = window.scroll = null;
        clearInterval(this.updateScrollInterval);
    }

    refreshScrollWithTime = delay => {
        return new Promise(resolve => {
            setTimeout(() => {
                this.scroll.refresh();
                resolve();
            }, delay)
        })
    };

    update = () => {
        const { refreshScrollWithTime, scroll } = this;

        scroll.refresh();
        scroll.scrollTo(0, 0, 0, IScroll.utils.ease.quadratic);
        window.iScrollY = 0;

        refreshScrollWithTime(60)
            .then(() => (
                refreshScrollWithTime(100)
            ))
            .then(() => (
                refreshScrollWithTime(200)
            ))
            .then(() => (
                refreshScrollWithTime(300)
            ))
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={this.setWrapperRef} className={classes.wrapper}>
                <div id="scroller" ref={this.setScrollerRef} className={classes.scroller}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        position: 'absolute',
        left: 0, top: 0, zIndex: 0,
        width: `${props.windowWidth}px`,
        height: `${props.windowHeight}px`,
        overflow: 'hidden'
    }),
    scroller: {
        position: 'relative',
    },
    scrolling: {
        willChange: 'transform'
    }
};

export default withRouter(windowSize(
    injectStyle(styles)(Scroller)
))