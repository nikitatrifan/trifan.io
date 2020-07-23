import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { withRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Waypoint from '../components/Waypoint';

const NavigationContext = React.createContext();
export const NavigationConsumer = NavigationContext.Consumer;

const noContextProvidedError = () => console.warn('No context provided to change Navigation Theme.');
export const NavigationWaypoint = ({ theme, children, ...props }) => (
  <NavigationConsumer>
    {context => {
      let { changeNavigationTheme } = context || {};

      if (!changeNavigationTheme) {
        changeNavigationTheme = noContextProvidedError;
      }

      return (
        <Waypoint offset={-context.navOffset} onEnter={() => changeNavigationTheme(theme)} topListener>
          <div {...props}>{children}</div>
        </Waypoint>
      );
    }}
  </NavigationConsumer>
);

NavigationWaypoint.propTypes = {
  theme: PropTypes.string.isRequired,
};

class NavigationContainer extends React.Component {
  state = {
    theme: 'dark',
    navOffset: 45,
  };

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.rootNode = document.querySelector('#nav-root');
  }

  changeTheme = theme => {
    if (!this.isUnMounted) this.setState({ theme });
  };

  resizeHandler = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const navWrapper = document.querySelector('#nav-wrapper');
      const { offsetTop, clientHeight } = navWrapper;

      this.setState({
        navOffset: offsetTop + clientHeight / 2,
      });
    }, 60);
  };

  componentDidMount() {
    this.rootNode.appendChild(this.el);

    try {
      window.scrollTo(0, 10);
      window.dispatchEvent(new Event('scroll'));
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn(e);
    }

    window.addEventListener('resize', this.resizeHandler);
    setTimeout(this.resizeHandler, 300);
  }

  // componentDidUpdate(prevProps, prevState) {
  //     if (prevState.theme !== this.state.theme) {
  //         console.log(
  //             'Navigation theme was changed from',
  //             prevState.theme, 'to', this.state.theme
  //         )
  //     }
  // }

  componentWillUnmount() {
    this.isUnMounted = true;
    window.removeEventListener('resize', this.resizeHandler);
    this.rootNode.removeChild(this.el);
  }

  render() {
    const data = {
      theme: this.state.theme,
      changeNavigationTheme: this.changeTheme,
      navOffset: this.state.navOffset,
    };

    const { history, ...props } = this.props;
    const isNavBack = history.location.pathname !== '/' && history.action === 'PUSH';

    return (
      <NavigationContext.Provider value={data}>
        {createPortal(<Navigation {...props} back={isNavBack} theme={this.state.theme} />, this.el)}
        {this.props.children}
      </NavigationContext.Provider>
    );
  }
}

export default withRouter(NavigationContainer);
