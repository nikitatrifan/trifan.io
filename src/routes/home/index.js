import React from 'react'
import IntroSlide from './IntroSlide'
import YoapSlide from './YoapSlide'
import USSlide from './USSlide'
import BGASlide from './BGASlide'
import NavigationContainer, { NavigationWaypoint } from "../../containers/NavigationContainer";
import { TweenMax, Power0 } from 'gsap'
import injectStyles from 'react-jss'

class Home extends React.Component{
    state = {
        isLogoFlashing: true
    };

    logoFlashingAnimation = () => {
        if (!this.state.isLogoFlashing || this.isUnMounted || !this.logo)
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
    componentWillUnmount() {
        this.isUnMounted = true;
    }

    render() {
        const { classes } = this.props;
        const { isLogoFlashing } = this.state;
        return (
            <NavigationContainer
                className={classes.nav} logo={isLogoFlashing && (
                <span className={classes.loading} ref={b => this.logo = b}>
                    reading image...
                </span>
            )}>
                <div className={classes.wrapper}>
                    <NavigationWaypoint theme="light">
                        <IntroSlide
                            onMatrixRainingCodeComplete={
                                this.completeRainingCodeHandler
                            }
                        />
                    </NavigationWaypoint>
                    <NavigationWaypoint theme="dark">
                        <BGASlide />
                        <YoapSlide />
                        <USSlide />
                    </NavigationWaypoint>
                </div>
            </NavigationContainer>
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