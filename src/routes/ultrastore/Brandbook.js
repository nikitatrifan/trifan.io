import React from 'react'
import windowSize from '../../containers/windowSize';
import injectStyle from 'react-jss'
import Carousel from '../../components/Carousel'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import theme from '../../theme'

class Brandbook extends React.Component {
    getArray = l => {
        let arr = [];

        for (let i = 1; i <= l; i++) {
            arr.push(i);
        }

        return arr;
    };
    getData = () => {
        return this.getArray(31).map(it => (
            `/us/brandbook/${it}.jpg`
        ))
    };

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b} className={classes.scroller}>
                    <NavigationWaypoint theme="dark">
                        <Container className={classes.header} type="content">
                            <Heading size="2">
                                Brandbook
                            </Heading>
                            <Paragraph  opacity size="3" margin="small">
                                Nikita Nikiforov designed this awesome brandbook for the client.
                            </Paragraph>
                        </Container>

                        <Container type="bootstrap">
                            <Carousel
                                minOpacity={.3}
                                images={this.getData()}
                            />
                        </Container>
                    </NavigationWaypoint>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        position: 'relative',
        zIndex: props.index
    }),
    scroller: {
        minHeight: '100vh',
        backgroundColor: theme.lightGrayColor,
        padding: '90px 0'
    }
};

export default windowSize(
    injectStyle(styles)(Brandbook)
)
