import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Waypoint from '../components/Waypoint'
//import theme from '../theme'

const NavigationContext = React.createContext();
export const NavigationConsumer = NavigationContext.Consumer;

const noContextProvidedError = () => (
    console.warn('No context provided to change Navigation Theme.')
);
export const NavigationWaypoint = ({theme, children, ...props}) => (
    <NavigationConsumer>
        {context => {
            let {changeNavigationTheme} = context || {};

            if (!changeNavigationTheme) {
                changeNavigationTheme = noContextProvidedError;
            }

            return (
                <Waypoint
                    onEnter={() => changeNavigationTheme(theme)}
                    topListener
                >
                    <div {...props}>{children}</div>
                </Waypoint>
            )
        }}
    </NavigationConsumer>
);

NavigationWaypoint.propTypes = {
    theme: PropTypes.string.isRequired
};

class NavigationContainer extends React.Component{
    state = {
        theme: 'dark'
    };

    changeTheme = theme => {
        if (!this.isUnMounted)
            this.setState({theme});
    };

    componentDidMount() {
        setTimeout(() => {
            window.scrollTo(0, 10);
            window.dispatchEvent(new Event('scroll'));
            window.scrollTo(0, 0);
        }, 160)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            console.log(
                'Navigation theme was changed from',
                prevState.theme, 'to', this.state.theme
            )
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true;
    }

    render() {
        const data = {
            theme: this.state.theme,
            changeNavigationTheme: this.changeTheme
        };

        const { history, ...props } = this.props;
        const isNavBack =
            history.location.pathname !== '/' && history.action === 'PUSH';

        return (
            <NavigationContext.Provider value={data}>
                <Navigation {...props} back={isNavBack} theme={this.state.theme} />
                {this.props.children}
            </NavigationContext.Provider>
        )
    }
}

export default withRouter(NavigationContainer)