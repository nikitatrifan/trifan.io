import React from 'react'
import NavigationContainer from '../../containers/NavigationContainer'
import Intro from './Intro'
import About from './About'
import VideoSlidesSection from './VideoSlidesSection'
import Brandbook from './Brandbook'
import Technologies from '../../components/Technologies'
import Footer from '../../components/Footer'

const { body } = document;

export default class USPage extends React.Component {
    componentDidMount() {
        this.bgBackup = body.style.background;
        body.style.background = 'rgb(0,0,0)'
    }
    componentWillUnmount() {
        body.style.background = this.bgBackup;
    }
    render() {
        return (
            <NavigationContainer>
                <Intro index={0} />
                <About index={1} />
                <VideoSlidesSection index={2} />
                <Brandbook index={3} />
                <Technologies
                    backgroundColor="#121212" index={4}
                    data={[{
                        image: '/icons/logos/react.png',
                        title: 'React',
                        link: 'https://reactjs.org/'
                    }, {
                        image: '/icons/logos/redux.png',
                        title: 'Redux',
                        link: 'https://redux.js.org/'
                    }, {
                        image: '/icons/logos/symfony.png',
                        title: 'Symfony',
                        link: 'https://symfony.com/'
                    }]}
                    content={(
                        'The client-side is single-page web app developed on React and Redux.\n' +
                        'Transition between pages is instant because of no page reloading. \n' +
                        'The project supports server-side rendering for increasing app loading speed. ' +
                        'The server-side is written on PHP using Symfony framework.'
                    )}
                />
                <Footer />
            </NavigationContainer>
        )
    }
}