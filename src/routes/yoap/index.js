import React from 'react'
import Helmet from 'react-helmet'
import windowSize from '../../containers/windowSize';
import NavigationContainer from '../../containers/NavigationContainer'
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
    window.isPageLoaded = true;
    this.bgBackup = body.style.background;
    body.style.background = 'rgb(0,0,0)'
  }
  componentWillUnmount() {
    body.style.background = this.bgBackup;
  }
  render() {
    return (
      <NavigationContainer>
        <Helmet>
          <title>yoap project — Nikita Trifan</title>
        </Helmet>
        <Intro index={1}/>
        <Interface index={2}/>
        <Cms index={3}/>
        <ComponentsSystem index={4}/>
        <Technologies index={5} />
        <Footer theme="black" />
      </NavigationContainer>
    )
  }
}

const styles = {};

export default windowSize(
  injectStyles(styles)(YoapPage)
)
