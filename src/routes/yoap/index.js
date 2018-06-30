import React from 'react'
import windowSize from 'react-window-size'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Intro from './Intro'
import Interface from './Interface'
import Cms from './Cms'
import ComponentsSystem from './ComponentsSystem'
import Technologies from '../../components/Technologies'
import injectStyles from 'react-jss'

const { body } = document || {};

class YoapPage extends React.Component {
    componentDidMount() {
        this.bgBackup = body.style.background;
        body.style.background = 'rgb(0,0,0)'
    }
    componentWillUnmount() {
        body.style.background = this.bgBackup;
    }
    render() {
        return (
            <div>
                <Navigation theme="black" />
                <Intro index={1}/>
                <Interface index={2}/>
                <Cms index={3}/>
                <ComponentsSystem index={4}/>
                <Technologies index={5} />
                <Footer theme="black" />
            </div>
        )
    }
}

const styles = {};

export default windowSize(
    injectStyles(styles)(YoapPage)
)