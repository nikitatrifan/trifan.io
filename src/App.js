import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Scroller from './components/Scroller'
import Home from './routes/home'
import BGAPage from './routes/bga'
import YoapPage from './routes/yoap'
import USPage from './routes/ultrastore'
import TerminalPage from './routes/terminal'
import AppLoader from './components/AppLoader'
import { TweenMax } from 'gsap'

class App extends Component {
    getSnapshotBeforeUpdate(prevProps) {
        if (this.props.location.key !== prevProps.location.key) {
            TweenMax.to(window, 0, {
                scrollTo: 0
            });
            TweenMax.set(this.wrapper, {
                opacity: 0
            });

            return true;
        }

        return null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            TweenMax.to(this.wrapper, .35, {
                opacity: 1
            });
        }
    }

    setWrapperRef = b => this.wrapper = b;

    render() {
        return (
            <div ref={this.setWrapperRef}>
                <AppLoader>
                    <Scroller>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/yoap" exact component={YoapPage}/>
                            <Route path="/ultrastore" exact component={USPage}/>
                            <Route path="/gym-assistant" exact component={BGAPage}/>
                            <Route path="/terminal" exact component={TerminalPage}/>
                            <Route component={TerminalPage}/>
                        </Switch>
                    </Scroller>
                </AppLoader>
            </div>
        );
    }
}

export default withRouter(App);
