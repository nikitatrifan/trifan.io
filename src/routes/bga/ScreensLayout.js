import React from 'react'
import PropTypes from "prop-types";
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import IPhoneMockup from '../../components/IPhoneMockup'
import Box from '../../components/Box'

class ScreensLayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        screens: PropTypes.arrayOf(PropTypes.string).isRequired
    };
    render() {
        const { classes, title, about, screens } = this.props;
        return (
            <div  className={classes.wrapper}>
                <Container className={classes.header} type="content">
                    <ComponentFadeIn delay={.04}>
                        <Heading size="2">
                            {title}
                        </Heading>
                    </ComponentFadeIn>
                    <ComponentFadeIn delay={.08}>
                        <Paragraph opacity size="3" margin="small">
                            {about}
                        </Paragraph>
                    </ComponentFadeIn>
                </Container>
                <Container>
                    <Box className={classes.grid} justify="between" wrap>
                        {screens.map((it, key) => (
                            <ComponentFadeIn duration={.6} delay={.3 + (key * .04)} key={key}>
                                <div className={classes.screen}>
                                    <div className={classes.screen_wrapper}>
                                        <IPhoneMockup>
                                            <img src={it} alt="Boosted Gym Assistant Screenshot"/>
                                        </IPhoneMockup>
                                    </div>
                                </div>
                            </ComponentFadeIn>
                        ))}
                    </Box>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        padding: '85px 0 65px'
    },
    grid: {
        marginTop: '95px'
    },
    screen: {
        width: '23%'
    },
    screen_wrapper: {
        width: '95%',
        margin: '0 auto'
    }
};

export default injectStyles(styles)(ScreensLayout)