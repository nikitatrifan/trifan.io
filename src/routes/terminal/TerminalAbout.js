import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import theme from "../../theme";

class TerminalAbout extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };
    
    render() {
        const { classes, className } = this.props;
        return (
            <ComponentFadeIn delay={0.05} gap={-5}>
                <div id="about" className={classNames(classes.wrapper, className)}>
                    <Paragraph
                        className={classes.subtitle}
                        color={theme.whiteColor}
                        font={theme.secondaryFont}
                        size={5}
                    >
                        Nikita Trifan <br/>
                        Designer & Developer
                    </Paragraph>

                    <img className={classes.image} src="/trifan-large.jpg" alt="Nikita Trifan"/>
                    <Paragraph
                        className={classes.subtitle}
                        color={theme.whiteColor}
                        font={theme.secondaryFont}
                        size={5}
                    >
                        Developing experience
                    </Paragraph>

                    <Paragraph
                        color={theme.whiteColor}
                        font={theme.monoFont}
                        size={2} tag="div"
                    >
                        At 16 years old I’ve built a custom ROM and kernel for an android device. <br/>
                        At 18 years old I started to learn web technologies such as HTML and CSS. <br/>
                        After a month of self education I designed & developed my first commercial website. <br/>
                        In next year I started to work on a full-time job as a front-end developer and designer.
                        At that company I made more than 10 websites with much javascript animations. <br/><br/>

                        At 2015 I relocated to Dubai to work on a full-time position as a Lead-developer
                        in Exponential Digital studio. I was developing unique website solutions for company clients.
                        Most of my websites was built on my own javascript framework on a client-side and wordpress or
                        proccesswire on a back-end and they’re still working perfect (for example fourpointstravels.com). <br/><br/>

                        At 2016 I got a job offer from Conceptor company in Russia, Saint-Petersburg.
                        I was working with famous Russian designer on our design products and websites.
                        At that years I met React.js and Node.js. <br/><br/>

                        I've launched a medium e-coomerce shop in Russia (0.5M unique visitors per month).
                        I built everything from front-end on React.js to backend on Node.js. <br/>
                        I've made a website for real-estate startup in Russia and also built everything on React.js and Node.js.
                        <br/><br/>
                        See my cases at home page of the trifan.io.
                    </Paragraph>
                </div>
            </ComponentFadeIn>
        )
    }
}

const styles = {
    wrapper: {
        padding: '50px 0'
    },
    subtitle: {
        margin: '10px 0'
    }
};

export default injectStyle(styles)(TerminalAbout)