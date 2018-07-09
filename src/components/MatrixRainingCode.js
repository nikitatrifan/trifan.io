import React from 'react'
import PropTypes from 'prop-types'
import windowSize from 'react-window-size';
import injectStyles from 'react-jss'
import { TweenMax } from 'gsap'
import responsive from "../helpers/responsive";


class MatrixRainingCode extends React.Component {
    static propTypes = {
        noAnimation: PropTypes.bool,
        onComplete: PropTypes.func
    };

    static initialImageScale = 1.15;
    static initialImageBlur = 200;
    columns = [];

    state = {
        isAnimationDeleted: false
    };

    makeArray = length => {
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    };

    dur = .35;
    delayValue = 30;

    isFullCode = false;

    animate = () => {
        if (this.isAnimationEnded)
            return false;

        const colMax = this.columns.length - 1;

        const cleanState = {
            y: 0, height: 0,
        };
        const fullState = {
            height: this.columns.find(it => !!it).getBoundingClientRect().height
        };
        this.columns.forEach((block, idx) => {
            if (!block)
                return;

            setTimeout(() => {
                if (this.isAnimationStopped)
                    return false;

                let onComplete = undefined;
                if (idx === colMax) {
                    onComplete = () => {
                        this.isFullCode = !this.isFullCode;
                        this.onAnimationEnd();
                        this.animate();
                    };
                }

                const startState = !this.isFullCode ? {
                    ...cleanState,
                    top: 0, bottom: 'auto'
                } : {
                    ...fullState,
                    top: 'auto', bottom: 0
                };
                const endState = !this.isFullCode ? fullState : cleanState;
                const dur = this.dur + this.getRandNumber() / 70;

                TweenMax.fromTo(block.children, dur, startState, {
                    ...endState, onComplete
                })
            }, idx * this.delayValue);
        });
    };
    getRandNumber = () => {
        const min = 10, max = 99;
        const rand = min - 0.5 + Math.random() * (max - min + 1);

        return Math.round(rand);
    };
    iterationId = 0;
    onAnimationEnd = () => {
        this.iterationId = this.iterationId + 1;
        if (this.iterationId > 1) {
            this.isAnimationEnded = true;
            this.startImageAnimation(true);
            return this.setState({ isAnimationDeleted: true });
        }

        if (this.iterationId === 1) {
            this.startImageAnimation();
            return TweenMax.fromTo(this.columns, 1, {
                background: 'rgba(0,0,0,1)'
            },{
                background: 'rgba(0,0,0,0)'
            });
        }
    };

    startImageAnimation = (isEnded) => {
        if (isEnded) {
            return TweenMax.to(this.image, .3, {
                filter: 'blur(0px)',
                scale: 1, onComplete: this.props.onComplete
            })
        }
        TweenMax.fromTo(this.image, 5, {
            filter: `blur(${MatrixRainingCode.initialImageBlur}px)`,
            scale: MatrixRainingCode.initialImageScale
            //opacity: 0
        }, {
            filter: 'blur(0px)',
            //opacity: 1
        })
    };

    componentDidMount() {
        if (this.props.noAnimation)
            return false;

        //return window.startAnimation = this.animate;
        setTimeout(() => {
            this.animate();
        }, 300);
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        this.isAnimationEnded = true;
        window.removeEventListener('resize', this.resizeHandler)
    }

    resizeHandler = () => {
        this.isAnimationStopped = true;

        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.columns.forEach(it => (
                it && [...it.children].forEach(block => (
                    TweenMax.set(block, {
                        opacity: this.iterationId >= 1 ? 0 : 1
                    })
                ))
            ));

            if (this.isAnimationEnded)
                return false;

            if (this.iterationId < 1) {
                console.log('<1');
                this.isAnimationStopped = false;
                return this.animate()
            }
            console.log('end');
            return this.onAnimationEnd();
        }, 100);
    };
    numbers = ['01', '10', '00', '11'];
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    render() {
        const { classes, windowWidth, windowHeight, noAnimation } = this.props;
        const { isAnimationDeleted } = this.state;
        const { numbers, getRandomInt } = this;
        const columns = this.makeArray(parseInt(windowWidth / 30, 10));
        const rows = this.makeArray(parseInt(windowHeight / 19, 10));

        return (
            <div className={classes.wrapper}>
                {!noAnimation && !isAnimationDeleted && columns.map(it => (
                    <div style={{width: `${100 / columns.length}%`}}
                         ref={b => this.columns[it] = b}
                         className={classes.col} key={it}>
                        <div className={classes.col_wrapper}>
                            {rows.map(idx => (
                                <span
                                    className={classes.code}
                                    key={idx}
                                >
                                    {numbers[getRandomInt(0, 3)]}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <img
                    style={noAnimation ? {zIndex: 100} : undefined}
                    ref={b => this.image = b}
                    className={classes.image}
                    src="/trifan-touched.jpg" alt="Nikita Trifan"
                />
            </div>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden'
    },
    col: {
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 10,
        background: '#000',
        willChange: 'background'
    },
    col_wrapper: {
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        opacity: 1, height: 0,
        transform: 'translateY(-100%)',
        //backgroundColor: '#000',
        willChange: 'height'
    },
    code: {
        fontSize: '19px',
        color: '#fff',
        lineHeight: '19px',
        display: 'block',
        textAlign: 'center',
        fontFamily: 'Fira Code',
        //opacity: 0, backgroundColor: '#000',
        //willChange: 'opacity'
    },
    image: {
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'absolute',
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: 0, filter: `blur(${MatrixRainingCode.initialImageBlur})`,
        transform: `scale(${MatrixRainingCode.initialImageScale})`,
        willChange: 'filter, transform',
        [responsive('mobile')]: {
            objectPosition: '80% 50%'
        }
    }
};

export default windowSize(injectStyles(styles)(MatrixRainingCode));