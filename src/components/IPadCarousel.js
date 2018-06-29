import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import { TweenMax } from 'gsap'
import classNames from 'classnames'
import injectStyle from 'react-jss'

class IPadCarousel extends React.Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    };

    state = {
        slide: 0,
    };

    dur = .7;
    inactiveOpacity = 0.1;

    componentDidMount() {
        setTimeout(() => {
            this.resizeHandler();
            this.startAnimation()
        }, 300);
        window.addEventListener('resize', this.resizeHandler)
    }

    componentWillUnmount() {
        this.isUnMounted = true;
        clearInterval(this.animationTimeout);
        window.removeEventListener('resize', this.resizeHandler)
    }

    startAnimation = () => {
        clearInterval(this.animationTimeout);
        this.animationTimeout = setInterval(this.nextSlide, 5000);
    };
    nextSlide = () => {
        if (this.isUnMounted)
            return;

        const { images } = this.props;
        const { slide } = this.state;
        const maxSlide = images.length - 1;

        if (images.length <= 0) {
            return false;
        }

        if (slide >= maxSlide) {
            return this.setSlide(0);
        }

        this.setSlide(slide + 1);
    };

    setRef = b => this.wrapper = b;
    setWrapperRef = b => this.nodeWrapper = b;

    setSlide = slide => {
        const { wrapper, dur } = this;
        const slides = [...this.wrapper.children];

        TweenMax.to(wrapper, dur, {
            x: -parseInt(wrapper.clientWidth, 10) * slide,
            onComplete: () => this.setState({slide})
        });

        slides.forEach((node, idx) => {
            const opacity = idx === slide ? 1 : this.inactiveOpacity;

            TweenMax.to(node, dur, {
                opacity
            })
        });
    };

    enterHandler = () => {
        this.isUnMounted = false;
    };
    leaveHandler = () => {
        this.isUnMounted = true;
    };

    resizeHandler = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const node = this.nodeWrapper;
            const parentNodeWidth = node.parentElement.clientWidth;
            node.style.width = `${parentNodeWidth}px`;
            node.style.height = `${parentNodeWidth * .73}px`;
            this.setSlide(this.state.slide);
        }, 60);
    };

    slideClickHandler = idx => {
        this.startAnimation();
        this.setSlide(idx);
    };

    render() {
        const { classes, images } = this.props;
        const { slide } = this.state;
        return (
            <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
                <div ref={this.setWrapperRef} className={classes.wrapper}>
                    <div className={classes.button} />
                    <div className={classes.camera} />
                    <div ref={this.setRef} className={classes.container}>
                        {images.map((it, idx) => (
                            <div key={idx}
                                 className={classNames(classes.slide, idx === slide && classes.slide_current)}
                                 onClick={() => this.slideClickHandler(idx)}
                                 style={{
                                     left: `${(idx*100) + 6}%`,
                                     opacity: idx === slide ? 1 : this.inactiveOpacity
                                 }}>
                                <img className={classes.image} src={it} alt="YOAP Website Screen" />
                            </div>
                        ))}
                    </div>
                </div>
            </Waypoint>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: '#fff', width: '806px', height: '588px', borderRadius: '3.5%', position: 'relative',
        boxShadow: '0 5px 15px 0 rgba(93, 97, 104, .05), 0 25px 65px 0 rgba(191, 197, 209, .05), #F2F6FA 0 -2px 10px 0 inset',
        userSelect: 'none'
    },
    button: {
        width: '4%',
        height: '5%',
        left: '1%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #F2F3F5, #FCFDFF)'
    },
    camera: {
        width: '1%',
        height: '1.4%',
        right: '3%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #F2F3F5, #FCFDFF)'
    },
    slide: {
        position: 'absolute',
        width: '88%', height: '90%',
        backgroundColor: '#000',
        top: '5%', left: '6%',
        cursor: 'pointer',
    },
    slide_current: {
        cursor: 'default'
    },
    image: {
        display: 'block',
        position: 'absolute',
        let: 0, top: 0,
        width: '100%',
        height: 'auto',
        'pointerEvents': 'none'
    },
    container: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%',
        height: '100%'
    }
};

export default injectStyle(styles)(IPadCarousel);