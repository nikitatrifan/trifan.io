import React from 'react'
import injectStyle from 'react-jss'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import Container from '../../components/Container'
import BlockName from '../../components/BlockName'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import TransformScroll from '../../components/TransformScroll'
import theme from '../../theme'
import responsive from "../../helpers/responsive";

class Contact extends React.Component {
    static defaultProps = {
        textColor: theme.whiteColor
    };

    blocks = [];

    render() {
        const { classes, textColor } = this.props;
        return (
            <div ref={b => this.wrapper = b} id="contact" className={classes.wrapper}>
                <div className={classes.scroller}>
                    <Box justify="center" align="center" className={classes.content}>
                        <Container type="content">
                            <ComponentFadeIn delay={0.14}>
                                <Paragraph margin="medium" color={textColor}>
                                    If you’re interested in working <br/>
                                    or collaborating with me please contact me.
                                </Paragraph>
                            </ComponentFadeIn>
                            <ComponentFadeIn delay={0.18}>
                                <Heading margin="medium" color={textColor}>
                                    hello@trifan.io
                                </Heading>
                            </ComponentFadeIn>
                        </Container>
                    </Box>
                    <div className={classes.bg}>
                        <ComponentFadeIn duration={.7} delay={.5}>
                            <TransformScroll noMinHeight disabled={responsive().isMobile} offset={.5}>
                                <img
                                    className={classes.bg_image}
                                    src="/trifan-nikita.jpg" alt="Nikita Trifan"
                                />
                            </TransformScroll>
                        </ComponentFadeIn>
                    </div>
                    <BlockName index={1} name="Get in Touch" />
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        backgroundColor: '#000000',
        position: 'relative',
        zIndex: props.index || 0,
        overflow: 'hidden'
    }),
    scroller: {
        position: 'relative',
    },
    content: {
        position: 'absolute',
        left: 0, top: 0,
        width: '100%', height: '100%',
        zIndex: 10
    },
    bg: {
        opacity: .2, position: 'relative',
        zIndex: 0
    }
};

export default injectStyle(styles)(Contact)