import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TweenMax } from 'gsap';
import Scroller from './components/Scroller';
import HomePage from './routes/home';
import TerminalPage from './routes/terminal';
import AppLoader from './components/AppLoader';

function lazyRoute(importer, fallback): React.ReactNode {
  return props => {
    const Page = lazy(importer);
    return (
      <Suspense fallback={fallback || <div />}>
        <Page {...props} />
      </Suspense>
    );
  };
}

const Showreel = lazyRoute(() => import('./routes/home/index'));
const BGAPage = lazyRoute(() => import('./routes/bga/index'));
const YoapPage = lazyRoute(() => import('./routes/yoap/index'));
const USPage = lazyRoute(() => import('./routes/ultrastore/index'));

class App extends Component {
  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      TweenMax.to(window, 0, {
        scrollTo: 0,
      });
      TweenMax.set(this.wrapper, {
        opacity: 0,
      });

      return true;
    }

    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      TweenMax.to(this.wrapper, 0.35, {
        opacity: 1,
      });
    }
  }

  setWrapperRef = b => (this.wrapper = b);

  render() {
    return (
      <div ref={this.setWrapperRef}>
        <AppLoader>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/showreel" exact component={Showreel} />
            <Route path="/yoap" exact component={YoapPage} />
            <Route path="/ultrastore" exact component={USPage} />
            <Route path="/gym-assistant" exact component={BGAPage} />
            <Route path="/terminal" exact component={TerminalPage} />
            <Route component={TerminalPage} />
          </Switch>
        </AppLoader>
      </div>
    );
  }
}

export default withRouter(App);
