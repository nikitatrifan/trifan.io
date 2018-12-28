import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import { withRouter, Link } from 'react-router-dom'
import Paragraph from '../../components/Paragraph'
import ButtonBack from '../../components/ButtonBack'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import Box from '../../components/Box'
import theme from "../../theme";
import responsive from "../../helpers/responsive";

class TerminalHeader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    notFoundTitle: PropTypes.string,
  };

  render() {
    const { classes, title, notFoundTitle, className, history } = this.props;
    const isNavBack =
      history.location.pathname !== '/' && history.action === 'PUSH';

    const isNotFoundPage = history.location.pathname !== '/';

    return (
      <div className={classNames(classes.wrapper, className)}>
        <Helmet>
          <title>
            {isNotFoundPage ? notFoundTitle : title}
          </title>
        </Helmet>
        <nav className={classes.nav}>
          <ComponentFadeIn gap={0}>
            <Box justify="between" align="center">
              {isNavBack ? (
                <ButtonBack onClick={history.goBack} text="Go Back" />
              ) : (
                <Link className={classes.link} to="/">
                  <Paragraph
                    color={theme.whiteColor}
                    weight={500} size={4}
                    font={theme.secondaryFont}
                  >
                    trifan.io
                  </Paragraph>
                </Link>
              )}

              <Paragraph
                color={theme.whiteColor}
                weight={500} size={4}
                font={theme.secondaryFont}
              >
                {title}
              </Paragraph>
            </Box>
          </ComponentFadeIn>

          <ComponentFadeIn gap={-5}>
            <Paragraph
              color={theme.whiteColor}
              weight={400} size={2}
              font={theme.monoFont}
              margin="medium"
            >
              {
                !isNotFoundPage ? (
                  <span>
                                        Hey, you’re in the website terminal! <br/>
                                    </span>
                ) : (
                  <span>
                                        Oops, something went wrong! <br/>
                                        Maybe terminal can help you figure out. <br/><br/>
                                    </span>
                )
              }

              Type
              {' '}
              <Paragraph tag="span"
                         color={theme.primaryColor}
                         weight={600} size={2}
                         font={theme.monoFont}
              >
                help
              </Paragraph>
              {' '}
              to see all the commands. <br/>
              Good luck <span role="img" aria-label="cheers">✌</span>
            </Paragraph>
          </ComponentFadeIn>
        </nav>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    padding: '50px 0',
    [responsive('mobile')]: {
      padding: '15px 0 25px',
    },
  },
  nav: {},
  link: {
    textDecoration: 'none',
    transition: 'opacity .15s ease-in-out',
    '&:hover': {
      opacity: .3
    }
  }
};

export default withRouter(injectStyle(styles)(TerminalHeader))
