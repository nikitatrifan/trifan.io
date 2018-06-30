import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import { TweenMax } from 'gsap'
import BrowserScreen from '../../components/BrowserScreen'
import Waypoint from '../../components/Waypoint'

class SidebarAnimation extends React.Component {
    static cartSlides = [
        'empty-cart', 'sync-fail', 'sync-cart', 'goods',
        'buy', 'checkout-success', 'portait-cart'
    ];
    static accountSlides = [
        'account-login', 'account', 'account-tap', 'account-success'
    ];

    slides = [];
    dur = .6;
    slideDur = 2;
    slidesLoop = () => {
        this.isBlocked = false;

        setTimeout(() => {
            if (this.isBlocked)
                return;
            this.nextSlide(0, () => {
                setTimeout(
                    () => this.nextSlide(1, this.slidesLoop),
                    this.slideDur * 1000
                )
            })
        }, 300)
    };

    nextSlide = (__slide, onComplete) => {
        if (this.isBlocked)
            return;

        let slide = __slide;
        if (slide >= this.slides.length)   {
            slide = 0;
        }

        // find all slides items
        // and set them initial styles
        const allSlidesItems = this.slides
            .map(it => [...it.children]);
        TweenMax.set(allSlidesItems, {
            opacity: 0, x: '0%',
            onComplete: () => {
                // show overlay
                TweenMax.fromTo(this.overlay, this.dur, {
                    opacity: 0
                }, {
                    opacity: .35
                });

                // start showing slides inside current slide
                this.showSlides(this.slides[slide], (lastSlide) => {
                    // when all slides was showed
                    // we have to hide overlay
                    // and last slide
                    this.leaveHandler(lastSlide, onComplete);
                })
            }
        });
    };

    showSlides = (block, onComplete) => {
        const slides = [...block.children];
        const animate = (index) => {
            if (this.isBlocked)
                return;

            const prevSlide = slides[index-1];
            const slide = slides[index];
            if (!slide) {
                return onComplete(prevSlide)
            }
            // if it's first slide
            // we have to move him inside
            // viewport
            if (index === 0) {
                return TweenMax.fromTo(slide, this.dur, {
                    x: '100%', opacity: 1
                }, {
                    x: '0%', onComplete: () => {
                        setTimeout(() => animate(index+1), this.slideDur * 1000)
                    }
                })
            }

            // show current slide
            TweenMax.fromTo(slide, this.dur, {
                opacity: 0,
            }, {
                opacity: 1,
                onComplete: () => (
                    setTimeout(() => animate(index+1), this.slideDur * 1000)
                )
            });
            // hide prev slide
            TweenMax.fromTo(prevSlide, this.dur, {
                opacity: 1,
            }, {
                opacity: 0,
            })
        };

        animate(0);
    };

    leaveHandler = (__lastSlide, onComplete) => {
        if (!onComplete || !__lastSlide)
            this.isBlocked = true;

        const lastSlide = __lastSlide || this.slides.map(it => [...it.children]);
        TweenMax.fromTo(this.overlay, this.dur, {
            opacity: .35
        }, {
            opacity: 0
        });
        TweenMax.fromTo(lastSlide, this.dur, {
            x: '0%'
        }, {
            x: '100%',
            // when all things are done do a callback
            onComplete: () => {
                TweenMax.set(lastSlide, {
                    opacity: 0,
                    onComplete
                })
            }
        });
    };

    componentWillUnmount() {
        this.isBlocked = true;
    }


    render() {
        const { classes } = this.props;
        return (
            <BrowserScreen className={classes.wrapper}>
                <Waypoint onEnter={this.slidesLoop} onLeave={this.leaveHandler}>
                    <div className={classes.container}>
                        <div className={classes.bg}>
                            <img className={classes.bg_image} src="/us/sidebar/bg.jpg" alt=""/>
                            <div ref={b => this.overlay = b} className={classes.bg_overlay} />
                        </div>
                        <div className={classes.sidebar}>
                            <div ref={b => this.slides[0] = b} className={classes.slide}>
                                {SidebarAnimation.cartSlides.map((it, idx) => (
                                    <img key={it} className={classes.sidebar_image}
                                         style={{zIndex: idx}}
                                         src={`/us/sidebar/${it}.jpg`} alt={it}/>
                                ))}
                            </div>
                            <div ref={b => this.slides[1] = b} className={classes.slide}>
                                {SidebarAnimation.accountSlides.map((it, idx) => (
                                    <img key={it} className={classes.sidebar_image}
                                         style={{zIndex: idx}}
                                         src={`/us/sidebar/${it}.jpg`} alt={it}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </Waypoint>
            </BrowserScreen>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%',
    },
    container: {
        position: 'relative',
        overflowX: 'hidden'
    },
    bg: {
        width: '100%',
        position: 'relative',
        zIndex: 0
    },
    bg_image: {
        position: 'relative',
        zIndex: 0
    },
    bg_overlay: {
        position: 'absolute',
        left: 0, top: 0, zIndex: 10,
        width: '100%', height: '100%',
        backgroundColor: '#8A8A8A',
        //opacity: .35,
        opacity: 0
    },
    sidebar: {
        position: 'absolute',
        left: 0, top: 0, zIndex: 10,
        width: '100%', height: '100%',
    },
    sidebar_image: {
        position: 'absolute',
        right: 0, top: 0, zIndex: 10,
        width: 'auto', height: '100%',
        boxShadow: '-7px 0 24px 0 rgba(141, 141, 141, .5)',
        opacity: 0
    },
    slide: {
        display: 'inline'
    }
};

export default windowSize(
    injectStyles(styles)(SidebarAnimation)
);