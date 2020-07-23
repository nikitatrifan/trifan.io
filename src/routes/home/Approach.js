import React from 'react';
import injectStyle from 'react-jss';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import Box from '../../components/Box';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Title from '../../components/Title';
import ButtonShadow from '../../components/ButtonShadow';
import ButtonBack from '../../components/ButtonBack';
import BlockName from '../../components/BlockName';
import Spinner from '../../components/Spinner';
import GlobeIcon from '../../components/GlobeIcon';
import ButtonText from '../../components/ButtonText';
import theme from '../../theme';
import responsive from '../../helpers/responsive';

class Approach extends React.Component {
  static defaultProps = {
    textColor: theme.whiteColor,
  };

  state = {
    isSpinnerAnimated: false,
    isGlobeAnimated: false,
  };

  spinnerBlockLeaveHandler = () => this.setState({ isSpinnerAnimated: false });
  spinnerBlockEnterHandler = () => this.setState({ isSpinnerAnimated: true });

  globeBlockLeaveHandler = () => this.setState({ isGlobeAnimated: false });
  globeBlockEnterHandler = () => this.setState({ isGlobeAnimated: true });

  render() {
    const { classes, textColor } = this.props;
    const { isSpinnerAnimated, isGlobeAnimated } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.scroller}>
          <BlockName index={0} name="Approach" />
          <Container index={1} type="bootstrap">
            <Box className={classes.row} wrap align="center" justify="between">
              <React.Fragment delay={0.14}>
                <div className={classes.col}>
                  <Heading margin="medium" color={textColor} size={2}>
                    Details — matters. <br />
                    Microinteractions.
                  </Heading>
                  <Paragraph margin="medium" color={textColor}>
                    No one likes to interact with things that don’t provide feedback. Imagine you use
                    your turn signal at a left turn and nothing happens. You’d be stuck thinking
                    something is wrong with your car, even if the feature is working perfect externally.
                  </Paragraph>
                </div>
              </React.Fragment>
              <React.Fragment delay={0.18}>
                <div className={classes.col}>
                  <Card>
                    <Title margin="medium" color={textColor}>
                      Button Feedback
                    </Title>
                    <Box
                      justify="center"
                      align="start"
                      direction="column"
                      className={classes.col_content}
                    >
                      <ButtonShadow>Explore more</ButtonShadow>
                    </Box>
                    <Paragraph margin="medium" color={textColor} size={3}>
                      You feel that your mouse is over of the button because of hover animation. Try to
                      click it.
                    </Paragraph>
                  </Card>
                </div>
              </React.Fragment>
              <React.Fragment delay={0.22}>
                <div className={classes.col}>
                  <Card>
                    <Title margin="medium" color={textColor}>
                      Text Button Feedback
                    </Title>
                    <Box
                      justify="center"
                      align="start"
                      direction="column"
                      className={classes.col_content}
                    >
                      <ButtonBack
                        color={textColor}
                        text={<Paragraph color={textColor}>Go Back</Paragraph>}
                      />
                    </Box>
                    <Paragraph margin="medium" color={textColor} size={3}>
                      The small movement of the arrow to the left side is showing us an actual meaning of
                      the button.
                    </Paragraph>
                  </Card>
                </div>
              </React.Fragment>
            </Box>
            <Box className={classes.row} wrap align="center" justify="between">
              <React.Fragment delay={0.22}>
                <div className={classes.col}>
                  <Card
                    onMouseLeave={this.spinnerBlockLeaveHandler}
                    onMouseEnter={this.spinnerBlockEnterHandler}
                  >
                    <Title margin="medium" color={textColor}>
                      Avoid Preloaders
                    </Title>
                    <Box
                      justify="center"
                      align="start"
                      direction="column"
                      className={classes.col_content}
                    >
                      <Spinner isAnimating={isSpinnerAnimated} />
                    </Box>
                    <Paragraph margin="medium" color={textColor} size={3}>
                      Any app have to avoid using preloaders anywhere. But if I had to — I’m using
                      placeholders.
                    </Paragraph>
                  </Card>
                </div>
              </React.Fragment>
              <React.Fragment delay={0.18}>
                <div className={classes.col}>
                  <Card
                    onMouseLeave={this.globeBlockLeaveHandler}
                    onMouseEnter={this.globeBlockEnterHandler}
                  >
                    <Title margin="medium" color={textColor}>
                      Asynchronous Apps
                    </Title>
                    <Box
                      justify="center"
                      align="start"
                      direction="column"
                      className={classes.col_content}
                    >
                      <GlobeIcon isAnimating={isGlobeAnimated} />
                    </Box>
                    <Paragraph margin="medium" color={textColor} size={3}>
                      In 2018 each app must be an asynchronous. I'm sure any web app has no function that
                      can freeze a whole user experience.
                    </Paragraph>
                  </Card>
                </div>
              </React.Fragment>
              <React.Fragment delay={0.14}>
                <div className={classes.col}>
                  <Heading margin="medium" color={textColor} size={2}>
                    Speed — high priority. <br />
                    Optimizations.
                  </Heading>
                  <Paragraph margin="medium" color={textColor}>
                    No one wants to use pretty laggy iPhone, laptop or computer. Apps and websites
                    definitely too. So, I have some tricks in my holster to develop extremely fast web
                    and mobile apps.
                  </Paragraph>
                </div>
              </React.Fragment>
            </Box>
          </Container>
          {!responsive().isMobile && (
            <Box justify="center" align="center" className={classes.requestButton}>
              <ButtonText target="__blank" to="mailto:hello@trifan.io" color={textColor} icon>
                Send a Request
              </ButtonText>
            </Box>
          )}
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
  }),
  scroller: {
    minHeight: '100vh',
    padding: '130px 0',
    [responsive('mobile')]: {
      padding: '30px 0',
    },
    position: 'relative',
  },
  col: {
    width: '30%',
    [responsive('mobile')]: {
      width: '100%',
    },
  },
  col_content: {
    minHeight: '100px',
  },
  row: {
    padding: '87px 0',
    [responsive('mobile')]: {
      padding: '20px 0',
    },
  },
  requestButton: {
    marginBottom: '109px',
    [responsive('mobile')]: {
      marginBottom: '20px',
    },
  },
};

export default injectStyle(styles)(Approach);
