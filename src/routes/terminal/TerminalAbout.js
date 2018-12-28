import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import injectStyle from "react-jss";
import Paragraph from "../../components/Paragraph";
import ComponentFadeIn from "../../components/ComponentFadeIn";
import theme from "../../theme";

class TerminalAbout extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { classes, className } = this.props;
    return (
      <ComponentFadeIn delay={0.05} gap={-5}>
        <div className={classNames(classes.wrapper, className, "about")}>
          <Paragraph
            className={classes.subtitle}
            color={theme.whiteColor}
            font={theme.secondaryFont}
            size={5}
          >
            Nikita Trifan <br />
            Designer & Developer
          </Paragraph>

          <img
            className={classes.image}
            src="/trifan-large.jpg"
            alt="Nikita Trifan"
          />
          <Paragraph
            className={classes.subtitle}
            color={theme.whiteColor}
            font={theme.secondaryFont}
            size={5}
          >
            Experience
          </Paragraph>

          <Paragraph
            color={theme.whiteColor}
            font={theme.monoFont}
            size={2}
            tag="div"
          >
            I started my career almost 5 years ago. It was a long and
            interesting journey along with the web technologies progress.
            <br />
            <br />
            In my first two years of experience, I made almost 20 websites using
            Wordpress and ProcessWire on a server-side and Backbone and jQuery
            on a client-side with a lot of animations using iScroll and
            Velocity.JS.
            <br />
            <br />3 years ago I met a declarative programming paradigm in
            Javascript which is a fundamental idea of React.js, Vue.js etc.
            <br />
            <br />
            Since then I took a part in huge projects, you can check the cases on trifan.io/showreel
            <br />
            <br />
          </Paragraph>
        </div>
      </ComponentFadeIn>
    );
  }
}

const styles = {
  wrapper: {
    padding: "50px 0"
  },
  subtitle: {
    margin: "10px 0"
  }
};

export default injectStyle(styles)(TerminalAbout);
