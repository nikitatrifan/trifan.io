import React from 'react'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import ScreensLayout from './ScreensLayout'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class AppInterface extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    static data = [
        {
            title: 'Smart trainings process',
            about: 'The app will track: your training progress, calculate sets, measure relax time, show you statistics and instructions of exercise.',
            screens: [
                '/bga/screens/Todays-Training.jpg',
                '/bga/screens/Todays-Exercise.jpg',
                '/bga/screens/Todays-Exercise-Done.jpg',
                '/bga/screens/Todays-Exercise-Relax.jpg',
            ]
        },
        {
            title: 'Motivation system',
            about: 'Track changes of your body weight for better control. Compare progress of your trainings by photos.',
            screens: [
                '/bga/screens/Training-is-today.jpg',
                '/bga/screens/Training-is-done.jpg',
                '/bga/screens/Training-is-tomorrow.jpg',
                '/bga/screens/Compare.jpg',
            ]
        },
        {
            title: 'Unique programs',
            about: 'You can: choose program, let define the program by app or write by yourself new one in 2 minutes.',
            screens: [
                '/bga/screens/Training-Programs-List.jpg',
                '/bga/screens/Custom-Program-Days.jpg',
                '/bga/screens/Custom-Program-Day.jpg',
                '/bga/screens/Custom-Program-Choose-Exercise.jpg',
            ]
        }
    ];

    componentDidMount() {
        const upd = () => {
            this.tl = this.tween();
            this.scrollHandler();
        };
        setTimeout(() => {
            upd();
            setTimeout(upd, 1500);
        }, 300);
        window.addEventListener('scroll', this.scrollHandler);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.windowWidth !== this.props.windowWidth) {
            return this.resizeHandler()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
    resizeHandler = () => {
        this.tl = this.tween();
        this.scrollHandler();
    };
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        if (!this.tl)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        if (!this.scroller)
            return false;

        const tl = new TimelineMax({ paused: true });
        const height = parseInt(this.props.windowHeight / 2, 10);
        const dur = 3;
        const entryPoint = dur * .75;

        tl.to(this.scroller, entryPoint, {
            y: 0, opacity: 1,
            ease: Power0.easeNone
        });

        tl.to(this.scroller, dur - entryPoint, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        }, entryPoint);

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    {AppInterface.data.map((it, key) => (
                        <ScreensLayout
                            key={key}
                            title={it.title}
                            about={it.about}
                            screens={it.screens}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
    }),
    scroller: {
        minHeight: '100vh', backgroundColor: '#F9FAFC',
        paddingBottom: '109px'
    },
};

export default windowSize(
    injectStyles(styles)(AppInterface)
)