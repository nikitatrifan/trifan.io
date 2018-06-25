import React from 'react'
import Navigation from '../components/Navigation'
import Work from '../routes/Work'
import IntroSlide from '../components/slides/IntroSlide'
import { TweenMax, Power0 } from 'gsap'
import 'gsap/ScrollToPlugin'
import injectStyles from 'react-jss'

class Home extends React.Component{
    state = {
        isLogoFlashing: true
    };

    logoFlashingAnimation = () => {
        if (!this.state.isLogoFlashing)
            return false;

        const opacityPropVal = parseFloat(this.logo.style.opacity);
        const minOpacity = .3;
        const maxOpacity = .9;
        const opacity = isNaN(opacityPropVal) ? minOpacity :
            opacityPropVal === minOpacity ? maxOpacity : minOpacity;
        TweenMax.to(this.logo, .5, {
            opacity, onComplete: this.logoFlashingAnimation,
            ease: Power0.easeNone
        })
    };
    completeRainingCodeHandler = () => {
        this.setState({ isLogoFlashing: false })
    };
    componentDidMount() {
        this.logoFlashingAnimation();
    }

    scrollTo = () => {
        TweenMax.to(window, .7, {scrollTo: window.innerHeight});
    };

    render() {
        const { classes } = this.props;
        const { isLogoFlashing } = this.state;
        return (
            <div onClick={this.scrollTo} className={classes.wrapper}>
                <Navigation className={classes.nav} logo={isLogoFlashing && (
                    <span className={classes.loading} ref={b => this.logo = b}>
                        reading image...
                    </span>
                )}  />
                <IntroSlide
                    onMatrixRainingCodeComplete={this.completeRainingCodeHandler}
                />
                <Work />
            </div>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%', minHeight: '100vh',
    },
    nav: {zIndex:10},
    loading: {
        willChange: 'opacity'
    }
};

export default injectStyles(styles)(Home);