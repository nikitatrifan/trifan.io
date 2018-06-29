import React from 'react'
import { TweenMax } from 'gsap'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import injectStyle from 'react-jss'
import theme from "../../theme";

class YoapCms extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <Container className={classes.content} type="content">
                    <Heading size="2">
                        Content Management System
                    </Heading>
                    <Paragraph opacity size="3" margin="small">
                        We designed and developed custom content management system for YOAP team needs.
                        They can manage their objects and users without wasting time on loadings.
                    </Paragraph>
                </Container>
                <Container className={classes.images}>
                    <Box wrap jusityf="start" align="start">
                        <div className={classes.image_wrapper}>
                            <img src="/yoap/cms/1.jpg" className={classes.image}/>
                        </div>
                        <div className={classes.image_wrapper}>
                            <img src="/yoap/cms/2.jpg" className={classes.image}/>
                        </div>
                        <div className={classes.image_wrapper}>
                            <img src="/yoap/cms/3.jpg" className={classes.image}/>
                        </div>
                    </Box>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        padding: '70px 0',
        backgroundColor: theme.lightGrayColor
    },
    content: {
        paddingBottom: '37px'
    },
    image: {
        width: '95%', margin: '0 auto',
        userSelect: 'none', pointerEvents: 'none'
    },
    image_wrapper: {
        width: '50%', marginBottom: '37px',
        '@media only screen and (max-width: 960px)': {
            width: '100%'
        }
    }
};

export default injectStyle(styles)(YoapCms);