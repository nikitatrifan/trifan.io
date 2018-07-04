import React from 'react'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import ScreensLayout from './ScreensLayout'
import TransformScroll from '../../components/TransformScroll'
import { NavigationWaypoint } from "../../containers/NavigationContainer";

class AppInterface extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    static data = [
        {
            title: 'Smart trainings process',
            about: 'The app will track your training progress, calculate exercises sets, measure relax time between exercises, show you statistics and exercises how to.',
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
            about: 'You can choose program, let define the program by app or write by yourself new one in 2 minutes.',
            screens: [
                '/bga/screens/Training-Programs-List.jpg',
                '/bga/screens/Custom-Program-Days.jpg',
                '/bga/screens/Custom-Program-Day.jpg',
                '/bga/screens/Custom-Program-Choose-Exercise.jpg',
            ]
        }
    ];

    componentDidMount() {
        setTimeout(() => {
            this.scroller.resizeHandler();
            setTimeout(this.scroller.resizeHandler, 1500);
        }, 300);
    }

    render() {
        const { classes } = this.props;
        return (
            <TransformScroll
                name={'AppInterface'}
                offset={0.71}
                scrollRef={b => this.scroller = b}
                wrapperClassName={classes.wrapper}
                scrollerClassName={classes.scroller}
            >
                <NavigationWaypoint theme="dark">
                    {AppInterface.data.map((it, key) => (
                        <ScreensLayout
                            key={key}
                            title={it.title}
                            about={it.about}
                            screens={it.screens}
                        />
                    ))}
                </NavigationWaypoint>
            </TransformScroll>
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