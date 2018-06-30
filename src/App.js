import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Home from './routes/Home'
import YoapPage from './routes/yoap'
import USPage from './routes/ultrastore'
import normalizeScroll from './helpers/normalizeScroll'
import { TweenMax } from 'gsap'

class App extends Component {
    componentDidMount() {
        normalizeScroll(true)
    }
    componentWillUnmount() {
        normalizeScroll(false)
    }
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
    render() {
        return (
            <div ref={b => this.wrapper = b}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/yoap" exact component={YoapPage}/>
                    <Route path="/ultrastore" exact component={USPage}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
