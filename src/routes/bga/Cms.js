import React from 'react'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import BrowserScreen from '../../components/BrowserScreen'
import OpacityCarousel from '../../components/OpacityCarousel'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import responsive from "../../helpers/responsive";

class Cms extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };


    static images = [
        '/bga/screens/cms/login.jpg', '/bga/screens/cms/programs.jpg',
        '/bga/screens/cms/program-edit.jpg', '/bga/screens/cms/training-edit.jpg'
    ];

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <NavigationWaypoint theme="dark">
                        <Container className={classes.header} type="content">
                            <ComponentFadeIn delay={.04}>
                                <Heading size="2">
                                    Content Management System
                                </Heading>
                            </ComponentFadeIn>
                            <ComponentFadeIn delay={.08}>
                                <Paragraph size="3" margin="small">
                                    Created to manage the app content: exercises, programs and users. Based on React.js, Redux and Grommet.io.
                                </Paragraph>
                            </ComponentFadeIn>
                        </Container>
                        <Container type="bootstrap">
                            <BrowserScreen>
                                <OpacityCarousel>
                                    {Cms.images.map(it => (
                                        <img
                                            src={it} key={it}
                                            alt="Gym Assistant Content Management System"
                                        />
                                    ))}
                                </OpacityCarousel>
                            </BrowserScreen>
                        </Container>
                    </NavigationWaypoint>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
    }),
    scroller: {
        minHeight: '100vh', backgroundColor: '#E8E8E8',
        padding: '109px 0',
        [responsive('mobile')]: {
            padding: '66px 0 100px'
        }
    },
    header: {
        paddingBottom: '68px',
        [responsive('mobile')]: {
            paddingBottom: '45px',
        }
    }
};

export default windowSize(
    injectStyles(styles)(Cms)
)