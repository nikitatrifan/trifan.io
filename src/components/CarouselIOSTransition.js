import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from './Waypoint'
import { TweenMax } from 'gsap'
import classNames from 'classnames'
import injectStyle from 'react-jss'

class CarouselIOSTransition extends React.Component {
    static propTypes = {
        images: PropTypes.array.isRequired,
        delay: PropTypes.number
    };

    static defaultProps = {
        delay: 5
    };

    state = {
        slide: 0,
    };

    dur = .7;
    inactiveOpacity = 0.3;
    isUnMounted = true;

    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
        setTimeout(() => {
            [...this.wrapper.children].forEach((node, idx) => {
                let data = {
                    opacity: 0,
                };
                if (idx === 0) {
                    data = {
                        x: 0, opacity: 1
                    }
                }

                TweenMax.set(node, data)
            });

            this.initializeResize()
        }, 100);
    }
    initializeResize = () => {
        setTimeout(() => {
            this.resizeHandler();
            this.startAnimation();
        }, 300);
    };

    componentWillUnmount() {
        this.isUnMounted = true;
        clearInterval(this.animationTimeout);
        window.removeEventListener('resize', this.resizeHandler)
    }

    startAnimation = () => {
        clearInterval(this.animationTimeout);
        this.animationTimeout = setInterval(this.nextSlide, this.props.delay * 1000);
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

    prevSlide = () => {
        if (this.isUnMounted)
            return;

        const { images } = this.props;
        const { slide } = this.state;
        const maxSlide = images.length - 1;

        if (images.length <= 0) {
            return false;
        }

        if (slide < 0) {
            return this.setSlide(maxSlide);
        }

        this.setSlide(slide - 1);
    };

    setRef = b => this.wrapper = b;
    setWrapperRef = b => this.nodeWrapper = b;

    setSlide = slide => {
        if (this.isAnimating)
            return false;
        this.isAnimating = true;
        this.startAnimation();

        const { wrapper, dur } = this;
        const slides = [...wrapper.children];
        const maxSlide = slides.length - 1;
        const nextSlide = slides[slide];
        const prevSlide = slides[slide < 1 ? maxSlide : slide-1];
        const width = parseFloat(nextSlide.clientWidth);

        const animate = () => {
            TweenMax.fromTo(nextSlide, dur, {
                opacity: 1, x: width,
            }, {
                x: 0, opacity: 1,
                onComplete: () => this.setState({slide})
            });

            TweenMax.fromTo(prevSlide, dur, {
                opacity: 1, x: 0
            }, {
                opacity: this.inactiveOpacity, x: -width/2,
                onComplete: () => {
                    this.isAnimating = false;
                    TweenMax.set(prevSlide, {
                        opacity: 0
                    })
                }
            });
        };

        TweenMax.set(slides, {
            opacity: 0, x: width,
            top: 0, left: 0,
            onComplete: animate
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
            const { slide } = this.state;
            const nodeWrapper = this.nodeWrapper;
            const node = this.wrapper;
            const slideNode = node.children[slide]
                .querySelector(`.${this.props.classes.image}`);

            const parentNodeWidth = nodeWrapper.parentElement.clientWidth;
            const slideNodeHeight = slideNode.getBoundingClientRect().height;

            nodeWrapper.style.width = `${parentNodeWidth}px`;
            nodeWrapper.style.height = `${slideNodeHeight}px`;
        }, 60);
    };

    slideClickHandler = idx => {
        this.startAnimation();
        this.setSlide(idx);
    };

    render() {
        const { classes, images } = this.props;
        const { slide, } = this.state;

        return (
            <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
                <div ref={this.setWrapperRef} className={classes.wrapper}>
                    <div ref={this.setRef} className={classes.container}>
                        {images.map((it, idx) => (
                            <div key={idx}
                                 style={{zIndex: idx+1}}
                                 className={classNames(classes.slide, idx === slide && classes.slide_current)}
                                 onClick={this.nextSlide}>
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
        width: '100%', height: '100%', position: 'relative',
        backgroundColor: '#000000'
    },
    slide: {
        position: 'absolute',
        width: '100%', height: '100%',
        top: '0', left: '0',
        cursor: 'pointer',
        transition: 'box-shadow .15s ease-in-out',
    },
    slide_current: {
        cursor: 'default',
        zIndex: '0 !important'
    },
    image: {
        display: 'block',
        position: 'absolute',
        left: 0, top: 0,
        width: '100%',
        height: 'auto',
        pointerEvents: 'none',
    },
    container: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%',
        height: '100%'
    }
};

export default injectStyle(styles)(CarouselIOSTransition)