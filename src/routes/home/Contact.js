import React from 'react';
import injectStyle from 'react-jss';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import Box from '../../components/Box';
import Container from '../../components/Container';
import BlockName from '../../components/BlockName';
import TransformScroll from '../../components/TransformScroll';
import theme from '../../theme';
import responsive from '../../helpers/responsive';

class Contact extends React.Component {
  static defaultProps = {
    textColor: theme.whiteColor,
  };

  blocks = [];

  render() {
    const { classes, textColor } = this.props;
    return (
      <div ref={b => (this.wrapper = b)} id="contact" className={classes.wrapper}>
        <div className={classes.scroller}>
          <Box justify="center" align="center" className={classes.content}>
            <Container type="content">
              <React.Fragment delay={0.14}>
                <Paragraph margin="medium" color={textColor}>
                  If you’re interested in working <br />
                  or collaborating with me please contact me.
                </Paragraph>
              </React.Fragment>
              <React.Fragment delay={0.18}>
                <Heading margin="medium" color={textColor}>
                  hello@trifan.io
                </Heading>
              </React.Fragment>
            </Container>
          </Box>
          <div className={classes.bg}>
            <React.Fragment duration={0.7} delay={0.5}>
              <TransformScroll noMinHeight disabled={responsive().isMobile} offset={0.5}>
                <img className={classes.bg_image} src="/trifan-nikita.jpg" alt="Nikita Trifan" />
              </TransformScroll>
            </React.Fragment>
          </div>
          <BlockName index={1} name="Get in Touch" />
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: props => ({
    backgroundColor: theme.introBackground,
    position: 'relative',
    zIndex: props.index || 0,
    overflow: 'hidden',
  }),
  scroller: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  bg: {
    opacity: 0.2,
    position: 'relative',
    zIndex: 0,
  },
};

export default injectStyle(styles)(Contact);
