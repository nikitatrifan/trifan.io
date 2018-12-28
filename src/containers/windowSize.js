import React from 'react';
import throttle from 'lodash/throttle';

export default function windowSize(WrappedComponent) {
  class WindowSize extends React.Component {
    state = {
      windowWidth: 1366,
      windowHeight: 768,
    };

    resizeHandler = () => {
      if (this.isUnMounted) return;
      this.setState({
        windowWidth: parseInt(window.innerWidth, 10),
        windowHeight: parseInt(window.innerHeight, 10),
      });
    };

    triggerInitialResize = () => {
      this.resizeHandler();
      setTimeout(this.resizeHandler, 800);
    };

    componentDidMount() {
      if (typeof window !== 'undefined') {
        this.triggerInitialResize();
        this.resize = throttle(this.resizeHandler, 300);
        window.addEventListener('resize', this.resize);
      }
    }

    componentWillUnmount() {
      this.isUnMounted = true;
      window.removeEventListener('resize', this.resize);
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  const composedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WindowSize.displayName = `windowSize(${composedComponentName})`;
  return WindowSize;
}
