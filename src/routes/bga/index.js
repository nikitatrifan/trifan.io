import React from 'react'
import Helmet from 'react-helmet'
import windowSize from '../../containers/windowSize';
import Footer from '../../components/Footer'
import Intro from './Intro'
import Todos from './Todos'
import Cms from './Cms'
import Technologies from '../../components/Technologies'
import AppInterface from './AppInterface'
import injectStyles from 'react-jss'
import NavigationContainer from "../../containers/NavigationContainer";

const { body } = document || {};

class BGAPage extends React.Component {
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
          <title>
            Gym Assistant — Nikita Trifan
          </title>
        </Helmet>
        <Intro index={1}/>
        <Todos index={2}/>
        <AppInterface index={3}/>
        <Cms index={4}/>
        <Technologies
          backgroundColor="#0e0d2b" index={4}
          data={[
            {
              image: '/icons/logos/react.png',
              title: 'React',
              link: 'https://reactjs.org/'
            }, {
              image: '/icons/logos/react-native.png',
              title: 'React Native',
              link: 'https://facebook.github.io/react-native/'
            },
            {
              image: '/icons/logos/redux.png',
              title: 'Redux',
              link: 'https://redux.js.org/'
            },
            {
              image: '/icons/logos/node.png',
              link: 'https://nodejs.org/',
              title: 'Node.js'
            },
            {
              image: '/icons/logos/mongo.png',
              link: 'https://mongodb.com/',
              title: 'MongoDB'
            },
            {
              image: '/icons/logos/grommet.png',
              link: 'https://grommet.io/',
              title: 'Grommet'
            }
          ]}
          content={(
            'The app is based on React Native and Redux.' +
            'CMS is based on React, Redux and Grommet.' +
            'The server-side is written on Node.js with MongoDB.'
          )}
        />
        <Footer theme="black" />
      </NavigationContainer>
    )
  }
}

const styles = {};

export default windowSize(
  injectStyles(styles)(BGAPage)
)
