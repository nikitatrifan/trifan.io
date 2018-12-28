import React from "react";
import injectStyle from "react-jss";
import { withRouter } from "react-router-dom";
import Container from "./Container";
import classNames from "classnames";
import Box from "./Box";
import theme from "../theme";
import { TweenMax } from "gsap";
import HexToRGBA from "hex-to-rgba";
import preloadImages from "../helpers/preloadImages";
import responsive from "../helpers/responsive";
import windowSize from '../containers/windowSize';

function isEnabled() {
  return window.location.pathname !== '/';
}

class AppLoader extends React.Component {
  constructor(props) {
    super(props);

    const value = !isEnabled();
    this.state = {
      isLoaded: value,
      isHidden: value
    };
  }

  fadeIn = onComplete => {
    TweenMax.fromTo(
      this.logo_text,
      0.4,
      {
        opacity: 0
      },
      {
        opacity: 1,
        onComplete
      }
    );
  };

  animatePlaceholder = () => {
    if (this.isPlaceHolderHidden) return;

    TweenMax.fromTo(
      this.placeholder,
      0.7,
      {
        opacity: 1,
        x: "-100%"
      },
      {
        x: "100%",
        delay: 0.7,
        onComplete: this.animatePlaceholder
      }
    );
  };

  hide = () => {
    this.isPlaceHolderHidden = true;
    TweenMax.to([this.logo_text, this.terminal], 0.35, {
      opacity: 0,
      onComplete: () => {
        this.setState({ isLoaded: true }, () => {
          TweenMax.to(this.overlay, 0.35, {
            delay: 0.3,
            opacity: 0,
            display: "none",
            onComplete: () => {
              this.setState({ isHidden: true }, this.bindTerminalShortcut);
            }
          });
        });
      }
    });
  };

  bindTerminalShortcut = () => {
    window.Mousetrap.bind("ctrl+`", () => {
      this.props.history.push("/");
    });
  };

  componentDidMount() {
    if (!isEnabled())
      return this.bindTerminalShortcut();
    setTimeout(() => {
      this.preloadContent();
      this.fadeIn(() => {
        this.animatePlaceholder();
        this.fadeInTerminalInfo();
      });
    }, 100);
  }

  fadeInTerminalInfo = () => {
    TweenMax.fromTo(
      this.terminal,
      0.35,
      {
        opacity: 0,
        y: 2
      },
      {
        opacity: 1,
        y: 0
      }
    );
  };

  waitUntilPageIsLoaded = () => new Promise(resolve => {
    clearInterval(this.pageLoadedInterval);
    this.pageLoadedInterval = setInterval(() => {
      if (window.isPageLoaded) {
        clearInterval(this.pageLoadedInterval);
        resolve();
      }
    }, 100);
  });

  preloadContent = () => {
    Promise.all([
      ...preloadImages(["/trifan-touched.jpg"]),
      document.fonts.ready,
      this.waitUntilPageIsLoaded(),
    ]).then(() => {
      this.hide();
    });
  };

  render() {
    const { classes, children } = this.props;

    if (this.state.isLoaded) {
      return (
        <div ref={b => (this.wrapper = b)}>
          {children}
          {!this.state.isHidden && (
            <div ref={b => (this.overlay = b)} className={classes.wrapper} />
          )}
        </div>
      );
    }

    return (
      <div className={classes.wrapper}>
        <Container className={classes.container}>
          <div className={classes.logo}>
            <span ref={b => (this.logo_text = b)} className={classes.logo_text}>
              {theme.logoName}
            </span>
            <span
              ref={b => (this.placeholder = b)}
              className={classes.placeholder}
            />
          </div>
        </Container>
        <div
          ref={b => (this.terminal = b)}
          className={classes.terminal_wrapper}
        >
          {!responsive().isMobile &&
            !responsive().isTablet && (
              <Container>
                <div className={classNames(classes.logo, classes.terminal)}>
                  Press
                  <Box align="center">
                    <div className={classes.key}>Ctrl</div>+
                    <div className={classes.key}>`</div>
                  </Box>
                  to enter to{" "}
                  <span className={classes.link}>Terminal Mode.</span>
                </div>
              </Container>
            )}
        </div>
        <div hidden>{children}</div>
      </div>
    );
  }
}

const styles = {
  wrapper: props => ({
    position: "fixed",
    left: 0,
    top: 0,
    width: `${props.windowWidth}px`,
    height: `${props.windowHeight}px`,
    zIndex: 999,
    backgroundColor: theme.introBackground,
    willChange: "opacity"
  }),
  container: {
    padding: "45px 0",
    [responsive("mobile")]: {
      padding: "15px 0"
    }
  },
  terminal_wrapper: {
    position: "absolute",
    bottom: "10%",
    left: 0,
    width: "100%",
    opacity: 0
  },
  terminal: {
    lineHeight: "24px",
    display: "block",
    opacity: 0.95
  },
  key: {
    padding: "6px 13px",
    backgroundColor: "#fff",
    color: "#121212",
    borderRadius: "4px"
  },
  link: {
    fontSize: "inherit",
    lineHeight: "inherit",
    color: theme.primaryColor
  },
  logo: {
    fontSize: "18px",
    fontFamily: theme.secondaryFont,
    fontWeight: "500",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    position: "relative"
  },
  logo_text: {
    display: "inline-block",
    opacity: 0,
    position: "relative",
    zIndex: 0
  },
  placeholder: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
    left: 0,
    opacity: 0,
    transform: "translate(-100%)",
    background:
      "linear-gradient(to right, " +
      [
        HexToRGBA(theme.introBackground, 0),
        HexToRGBA(theme.introBackground, 0.7),
        HexToRGBA(theme.introBackground, 0.9),
        HexToRGBA(theme.introBackground, 0.7),
        HexToRGBA(theme.introBackground, 0)
      ].join(", ") +
      ")"
  }
};

export default withRouter(windowSize(injectStyle(styles)(AppLoader)));
