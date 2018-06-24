import React from 'react'
import windowSize from 'react-window-size'
import classNames from 'classnames'
import Container from '../components/Container'
import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import ButtonShadow from '../components/ButtonShadow'
import ButtonText from '../components/ButtonText'
import Box from '../components/Box'
import injectStyles from 'react-jss'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../helpers/getNodeRelativeViewportPercentPosition";

class Work extends React.Component {
    images = [];
    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            window.addEventListener('scroll', this.scrollHandler);
        }, 300);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = () => {
        const percent =
            getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent
        })
    };

    tween = () => {
        const { windowHeight } = this.props;
        const tl = new TimelineMax({ paused: true });
        const dur = 3;

        tl.staggerFromTo(this.images, dur / 2, {
            opacity: 0
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, 1);

        tl.staggerFromTo(this.images, dur, {
            y: windowHeight / 5
        }, {
            y: - windowHeight / 5,
            ease: Power0.easeNone
        }, 1, '0');

        tl.fromTo(this.content, dur, {
            opacity: 0,
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, '0');

        return tl;
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <Container>
                    <div ref={b => this.content = b} className={classes.content}>
                        <Box justify="start" align="start">
                            <Paragraph className={classes.label} size={6}>
                                design
                            </Paragraph>
                            <Paragraph className={classes.label} size={6}>
                                front-end
                            </Paragraph>
                            <Paragraph className={classes.label} size={6}>
                                back-end
                            </Paragraph>
                        </Box>
                        <Heading className={classes.title}>
                            Boosted Gym Assistant <br/>
                            iOS Application
                        </Heading>
                        <Paragraph className={classes.paragraph}>
                            The app is designed to make user’s trainings at a gym
                            easier and help to improve his body by the right way.
                        </Paragraph>
                        <Box justify="start" align="center">
                            <ButtonShadow>
                                Explore more
                            </ButtonShadow>
                            <ButtonText className={classes.textButton}>
                                Show demo
                            </ButtonText>
                        </Box>
                    </div>
                </Container>
                <div className={classes.images}>
                    <div ref={b => this.images[0] = b}
                         className={classes.images_col}>
                        <img
                            className={classes.image}
                            src="/bga/1.png" alt=""
                        />
                        <img
                            className={classes.image}
                            src="/bga/2.png" alt=""
                        />
                    </div>
                    <div ref={b => this.images[1] = b}
                         className={classNames(classes.images_col, classes.image_col_second)}>
                        <img
                            className={classes.image}
                            src="/bga/3.png" alt=""
                        />
                        <img
                            className={classes.image}
                            src="/bga/4.png" alt=""
                        />
                    </div>
                    <div ref={b => this.images[2] = b}
                         className={classNames(classes.images_col, classes.image_col_third)}>
                        <img
                            className={classes.image}
                            src="/bga/5.png" alt=""
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '100vh'
    },
    content: {
        maxWidth: '450px'
    },
    label: {
        marginRight: '12px',
    },
    title: {
        margin: '20px 0 30px'
    },
    paragraph: {
        marginBottom: '50px',
        opacity: .5
    },
    textButton: {
        marginLeft: 50
    },
    images: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
        flexWrap: 'no-wrap',
        top: '-10%', right: '-10%',
        width: '55%',
        height: '100%',
        transform: 'rotateZ(45deg)'
    },
    images_col: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '33.3%',
        willChange: 'transform, opacity'
    },
    image_col_second: {
        marginTop: '30%'
    },
    image_col_third: {
        marginTop: '60%'
    },
    image: {
        width: '125%',
        marginTop: '-20%'
    }
};

export default windowSize(injectStyles(styles)(Work));