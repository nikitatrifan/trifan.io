import React from 'react'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Link from '../../components/Link'
import Box from '../../components/Box'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import theme from "../../theme";

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
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <Container type="content">
                    <Heading color={theme.whiteColor} size="2">
                        Technologies
                    </Heading>
                    <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                        The client-side is single-page web app developed on React and MobX.
                        Transition between pages is instant because of no page reloading.
                        The server-side is written on Node.js and as database we are using MongoDB.
                    </Paragraph>

                    <Box className={classes.tech} align="start" justify="start">
                        {YoapTechnologies.data.map(item => (
                            <div key={item.title} className={classes.item}>
                                <Link to={item.link} target="__blank" color={theme.whiteColor} icon>
                                    <Paragraph size={3} color={theme.whiteColor}  margin="small">
                                        {item.title}
                                    </Paragraph>
                                </Link>
                                <div className={classes.image_wrapper}>
                                    <img className={classes.image} src={item.image} alt={item.title}/>
                                </div>
                            </div>
                        ))}
                    </Box>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: '#1C1C26',
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