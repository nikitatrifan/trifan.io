import React from 'react'
import PropTypes from 'prop-types'
import injectStyles from 'react-jss'
import Container from './Container'
import Link from './Link'
import Box from './Box'
import Heading from './Heading'
import Paragraph from './Paragraph'
import ComponentFadeIn from './ComponentFadeIn'
import theme from "../theme";
import {Power0, TimelineMax, TweenMax} from "gsap";
import {NavigationWaypoint} from "../containers/NavigationContainer";
import responsive from '../helpers/responsive'
import getNodeRelativeViewportPercentPosition from "../helpers/getNodeRelativeViewportPercentPosition";

class Technologies extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    static defaultProps = {
        data: [
            {
                image: '/icons/logos/react.png',
                link: 'https://reactjs.org/',
                title: 'React'
            },
            {
                image: '/icons/logos/mobx.png',
                link: 'https://mobx.js.org/',
                title: 'MobX'
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
        ],
        content: 'The client-side is single-page web app developed on React and MobX.\n' +
        'Transition between pages is instant because of no page reloading.\n' +
        'The server-side is written on Node.js and as database we are using MongoDB.',
    };
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined || !this.tl)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        const tl = new TimelineMax({ paused: true });
        const dur = 1;

        tl.fromTo(this.scroller, dur / 3, {
            opacity: 0,
        }, {
            opacity: 1,
            ease: Power0.easeNone
        }, '0');

        tl.fromTo(this.scroller, dur, {
            y: 30,
        }, {
            y: -30,
            ease: Power0.easeNone
        }, '0');

        return tl;
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 300);

        window.addEventListener('scroll', this.scrollHandler);
    }

    Wrapper = ({children, theme}) => {
        if (responsive().isMobile) {
            return (
                <NavigationWaypoint theme={theme}>
                    {children}
                </NavigationWaypoint>
            )
        }

        return children;
    };

    render() {
        const { classes, content, data } = this.props;
        const { Wrapper } = this;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Wrapper theme="light">
                        <Container type="content">
                            <ComponentFadeIn>
                                <Heading color={theme.whiteColor} size="2">
                                    Technologies
                                </Heading>
                            </ComponentFadeIn>
                            <ComponentFadeIn delay={.04}>
                                <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                                    {content}
                                </Paragraph>
                            </ComponentFadeIn>

                            <Box wrap className={classes.tech} align="start" justify="start">
                                {data.map((item, idx) => (
                                    <ComponentFadeIn key={item.title} delay={idx * .04}>
                                        <div className={classes.item}>
                                            <Link to={item.link} target="__blank" color={theme.whiteColor} icon>
                                                <Paragraph size={3} color={theme.whiteColor}  margin="small">
                                                    {item.title}
                                                </Paragraph>
                                            </Link>
                                            <div className={classes.image_wrapper}>
                                                <img className={classes.image} src={item.image} alt={item.title}/>
                                            </div>
                                        </div>
                                    </ComponentFadeIn>
                                ))}
                            </Box>
                        </Container>
                    </Wrapper>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        backgroundColor: (props.backgroundColor || '#1C1C26'),
        position: 'relative',
        zIndex: props.index
    }),
    scroller: {
        padding: '60px 0 80px',
    },
    image_wrapper: {
        width: '55px',
        height: '55px',
        position: 'relative'
    },
    tech: {
        marginTop: '33px'
    },
    item: {
        marginRight: '30px'
    },
    image: {
        display: 'block',
        width: '90%',
        height: 'auto',
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default injectStyles(styles)(Technologies)