import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import theme from "../../theme"
import Paragraph from '../../components/Paragraph'
import ButtonShadow from '../../components/ButtonShadow'
import ComponentFadeIn from '../../components/ComponentFadeIn'

class TerminalProjectInfo extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.object
    };

    setRef = b => this.wrapper = b;

    render() {
        const { classes, data, className } = this.props;
        const { content } = data;
        return (
            <ComponentFadeIn delay={.05} gap={-5}>
                <div ref={this.setRef} className={classNames(classes.wrapper, className)}>
                    <Paragraph
                        size={5} font={theme.secondaryFont}
                        weight={500} color={theme.whiteColor}
                    >
                        {content.title}
                    </Paragraph>
                    <Paragraph
                        className={classes.content}
                        size={2} font={theme.monoFont}
                        weight={500} color={theme.whiteColor}
                    >
                        {content.text}
                    </Paragraph>
                    <ButtonShadow gradient={content.gradient} to={content.link}>
                        Explore More
                    </ButtonShadow>
                </div>
            </ComponentFadeIn>
        )
    }
}

const styles = {
    wrapper: {
        padding: '50px 0'
    },
    content: {
        padding: '15px 0 50px'
    }
};

export default injectStyle(styles)(TerminalProjectInfo)