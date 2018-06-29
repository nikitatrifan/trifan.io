import React from 'react'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Link from '../../components/Link'
import Box from '../../components/Box'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import theme from "../../theme";
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class YoapTechnologies extends React.Component {
    static data = [
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
        }
    ];
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
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

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <Container type="content">
                        <ComponentFadeIn>
                            <Heading color={theme.whiteColor} size="2">
                                Technologies
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.04}>
                            <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                                The client-side is single-page web app developed on React and MobX.
                                Transition between pages is instant because of no page reloading.
                                The server-side is written on Node.js and as database we are using MongoDB.
                            </Paragraph>
                        </ComponentFadeIn>

                        <Box wrap className={classes.tech} align="start" justify="start">
                            {YoapTechnologies.data.map((item, idx) => (
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
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: '#1C1C26',
    },
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

export default injectStyles(styles)(YoapTechnologies)