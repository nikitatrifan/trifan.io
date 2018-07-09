import React from 'react'
import IntroSlide from './IntroSlide'
import YoapSlide from './YoapSlide'
import USSlide from './USSlide'
import BGASlide from './BGASlide'
import About from './About'
import Contact from './Contact'
import Approach from './Approach'
import TransformScroll from '../../components/TransformScroll'
import Footer from '../../components/Footer'
import NavigationContainer, { NavigationWaypoint } from "../../containers/NavigationContainer";
import { TweenMax, Power0 } from 'gsap'
import injectStyles from 'react-jss'
import responsive from "../../helpers/responsive";

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
        if (Home.noAnimation)
            return this.completeRainingCodeHandler();

        this.logoFlashingAnimation();
    }
    componentWillUnmount() {
        this.isUnMounted = true;
    }

    static noAnimation = false;

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
                        <IntroSlide index={0}
                            noAnimation={Home.noAnimation}
                            onMatrixRainingCodeComplete={
                                this.completeRainingCodeHandler
                            }
                        />
                    </NavigationWaypoint>
                    <NavigationWaypoint theme="dark">
                        <TransformScroll
                            scrollerClassName={classes.slidesScroller}
                            offset={.8} index={1} id={"work"}
                        >
                            <BGASlide />
                            <YoapSlide />
                            <USSlide />
                        </TransformScroll>
                    </NavigationWaypoint>
                    <NavigationWaypoint theme="light">
                        <About index={2} />
                        <Approach index={3} />
                        <Contact index={4} />
                    </NavigationWaypoint>
                    <Footer />
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
    },
    slidesScroller: {
        [responsive('mobile')]: {
            paddingBottom: '100px'
        }
    }
};

export default injectStyles(styles)(Home);