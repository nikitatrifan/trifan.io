import React from 'react'
import PropTypes from 'prop-types'
import BrowserScreen from '../../components/BrowserScreen'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import Svg from '../../components/Svg'
import WayPoint from '../../components/Waypoint'
import injectStyle from 'react-jss'
import theme from '../../theme'

class VideoSlide extends React.Component {
    static propTypes = {
        videoSrc: PropTypes.string.isRequired,
        lineSrc: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string,
        textColor: PropTypes.string,
    };

    static defaultProps = {
        textColor: '#ffffff',
        backgroundColor: '#121212',
    };


    leaveHandler = () => {
        this.video && this.video.pause();
    };
    enterHandler = () => {
        this.video && this.video.play();
    };

    render() {
        const {
            classes, videoSrc, lineSrc, title, description,
            textColor
        } = this.props;

        return (
            <Box wrap direction="column" justify="center" align="center" className={classes.wrapper}>
                <Container className={classes.header} type="content">
                    <Heading color={textColor} size="2">
                        {title}
                    </Heading>
                    <Paragraph color={textColor} opacity size="3" margin="small">
                        {description}
                    </Paragraph>
                </Container>
                <WayPoint onLeave={this.leaveHandler} onEnter={this.enterHandler}>

                    <div className={classes.video_wrapper}>
                        <Container type="bootstrap" className={classes.browser}>
                            <BrowserScreen>
                                <video ref={b => this.video = b}
                                       className={classes.video} loop>
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video.
                                </video>
                            </BrowserScreen>
                        </Container>

                        <div className={classes.lineWrapper}>
                            <Svg className={classes.line} src={lineSrc} />
                        </div>
                    </div>
                </WayPoint>
            </Box>
        )
    }
}

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    wrapper: {
        width: '100%', minHeight: '100vh',
        padding: '120px 0',
        [mobileMedia]: {
            padding: '40px 0'
        }
    },
    lineWrapper: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%', height: '100%',
        zIndex: 0
    },
    line: {
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%', zIndex: 0,
    },
    header: {
        paddingBottom: '60px'
    },
    browser: {
        zIndex: 10, position: 'relative'
    },
    video: {
        display: 'block',
        width: '100%'
    },
    video_wrapper: {
        position: 'relative',
        width: '100%'
    }
};

export default injectStyle(styles)(VideoSlide);