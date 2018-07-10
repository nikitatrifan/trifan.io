import React from 'react'
import windowSize from 'react-window-size'
import injectStyle from 'react-jss'
import Container from './Container'
import theme from "../theme";
import { TweenMax } from 'gsap'
import HexToRGBA from 'hex-to-rgba'
import preloadImages from '../helpers/preloadImages'
import responsive from "../helpers/responsive";

class AppLoader extends React.Component {
    constructor(props) {
        super(props);

        const value = process.env.NODE_ENV !== 'production';
        this.state = {
            isLoaded: value, isHidden: value
        };
    }


    fadeIn = (onComplete) => {
        TweenMax.fromTo(this.logo_text, .4, {
            opacity: 0
        }, {
            opacity: 1, onComplete
        })
    };

    animatePlaceholder = () => {
        if (this.isPlaceHolderHidden)
            return;

        TweenMax.fromTo(this.placeholder, .7, {
            opacity: 1,
            x: '-100%'
        }, {
            x: '100%',
            delay: .7,
            onComplete: this.animatePlaceholder
        })
    };

    hide = () => {
        this.isPlaceHolderHidden = true;
        TweenMax.to(this.logo_text, .35, {
            opacity: 0,
            onComplete: () => {
                this.setState({ isLoaded: true }, () => {
                    TweenMax.to(this.overlay, .35, {
                        delay: .3,
                        opacity: 0, display: 'none',
                        onComplete: () => {
                            this.setState({ isHidden: true })
                        }
                    })
                })
            }
        })
    };

    componentDidMount() {
        if (process.env.NODE_ENV !== 'production')
            return false;
        setTimeout(() => {
            this.preloadContent();
            this.fadeIn(this.animatePlaceholder);
        }, 100)
    }

    preloadContent = () => {
        Promise.all([
            ...preloadImages(['/trifan-touched.jpg']),
            document.fonts.ready
        ]).then(res => {
            console.log('CONTENT WAS LOADED', res);
            this.hide();
        })
    };

    render() {
        const { classes, children } = this.props;

        if (this.state.isLoaded) {
            return (
                <div ref={b => this.wrapper = b}>
                    {children}
                    {
                        !this.state.isHidden &&
                            <div ref={b => this.overlay = b}
                                 className={classes.wrapper}
                            />
                    }
                </div>
            );
        }

        return (
            <div className={classes.wrapper}>
                <Container className={classes.container}>
                    <div className={classes.logo}>
                        <span ref={b => this.logo_text = b} className={classes.logo_text}>trifan.io</span>
                        <span ref={b => this.placeholder = b} className={classes.placeholder} />
                    </div>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        position: 'fixed',
        left: 0, top: 0,
        width: `${props.windowWidth}px`,
        height: `${props.windowHeight}px`,
        zIndex: 999,
        backgroundColor: theme.darkBackground,
        willChange: 'opacity'
    }),
    container: {
        padding: '45px 0',
        [responsive('mobile')]: {
            padding: '15px 0'
        }
    },
    logo: {
        fontSize: '18px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        color: '#fff',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
    },
    logo_text: {
        display: 'inline-block',
        opacity: 0,
        position: 'relative',
        zIndex: 0
    },
    placeholder: {
        position: 'absolute',
        zIndex: 0, width: '100%',
        height: '100%', left: 0,
        opacity: 0,
        transform: 'translate(-100%)',
        background: 'linear-gradient(to right, ' + [
            HexToRGBA(theme.darkBackground, 0),
            HexToRGBA(theme.darkBackground, 0.7),
            HexToRGBA(theme.darkBackground, 0.9),
            HexToRGBA(theme.darkBackground, 0.7), HexToRGBA(theme.darkBackground, 0),
        ].join(', ') + ')'
    }
};

export default windowSize(
    injectStyle(styles)(AppLoader)
)