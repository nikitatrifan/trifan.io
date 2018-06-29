import React from 'react'
import windowSize from 'react-window-size'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Intro from './Intro'
import Interface from './Interface'
import Cms from './Cms'
import ComponentsSystem from './ComponentsSystem'
import Technologies from './Technologies'
import injectStyles from 'react-jss'

class YoapPage extends React.Component {
    render() {
        return (
            <div>
                <Navigation theme="black" />
                <Intro />
                <Interface />
                <Cms />
                <ComponentsSystem />
                <Technologies />
                <Footer theme="black" />
            </div>
        )
    }
}

const styles = {
    wrapper: {

    }
};

export default windowSize(
    injectStyles(styles)(YoapPage)
)