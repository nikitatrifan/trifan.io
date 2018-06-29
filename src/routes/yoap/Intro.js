import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Heading from '../../components/Heading'
import Title from '../../components/Title'
import Paragraph from '../../components/Paragraph'
import Container from '../../components/Container'
import OpacityCarousel from '../../components/OpacityCarousel'
import Link from '../../components/Link'

class YoapIntroSlide extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <Container className={classes.header} type="content">
                    <Heading size="1">
                        Yoap
                    </Heading>
                    <Paragraph opacity margin="small">
                        Real Estate Web Application
                    </Paragraph>
                </Container>
                <Container>
                    <OpacityCarousel>
                        <img className={classes.image} src="/yoap/yoap-door-white.png" alt=""/>
                        <img className={classes.image} src="/yoap/yoap-map.png" alt=""/>
                    </OpacityCarousel>
                </Container>
                <Container className={classes.bottomContent} type="content">
                    <Title size="1">
                        Objective
                    </Title>
                    <Paragraph opacity margin="medium">
                        To develop new real-estate web service YOAP including front-end, back-end,
                        and content management system.
                        <br/> <br/>
                        The project is developed in collaboration with designer
                        {" "}
                        <Link target="__blank" to="//nikitanikiforov.it" icon>Nikita Nikiforov</Link>
                    </Paragraph>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {paddingBottom: '97px'},
    header: {marginTop: '154px'},
    image: {
        display: 'block',
        width: '100%',
        margin: '-60px auto 0'
    },
    bottomContent: {
        marginTop: '-80px'
    }
};

export default windowSize(
    injectStyles(styles)(YoapIntroSlide)
)