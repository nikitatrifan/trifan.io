import React, { Component } from 'react';
//import Home from './routes/Home'
import YoapPage from './routes/yoap'
import normalizeScroll from './helpers/normalizeScroll'

class App extends Component {
    componentDidMount() {
        normalizeScroll(true)
    }
    componentWillUnmount() {
        normalizeScroll(false)
    }
    render() {
        return (
            <YoapPage />
        );
    }
}

export default App;
