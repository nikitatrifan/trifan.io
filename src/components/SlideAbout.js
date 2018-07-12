import React from 'react'
import PropTypes from 'prop-types'
import Box from './Box'
import Paragraph from './Paragraph'
import Heading from './Heading'
import ButtonText from './ButtonText'
import ButtonShadow from './ButtonShadow'
import classNames from 'classnames'
import injectStyles from 'react-jss'
import theme from "../theme";
import responsive from "../helpers/responsive";

const SlideAbout = props => {
    const {
        classes, className, onButtonClick, buttonGradient,
        buttonGradientLink, labels, title, description,
        textButtonLink
    } = props;
    return (
        <div className={classNames(classes.content, className)}>
            <Box justify="start" align="start">
                {labels && labels.map(it => (
                    <Paragraph
                        key={it} size={6}
                        className={classes.label}
                    >
                        {it}
                    </Paragraph>
                ))}
            </Box>
            <Heading className={classes.title}>
                {title}
            </Heading>
            <Paragraph className={classes.paragraph}>
                {description}
            </Paragraph>
            <Box justify="start" align="center">
                <ButtonShadow to={buttonGradientLink} onClick={onButtonClick} gradient={buttonGradient}>
                    Explore more
                </ButtonShadow>
                {!responsive().isMobile && (
                    <ButtonText href={textButtonLink} target="__blank" className={classes.textButton}>
                        See Sources
                    </ButtonText>
                )}
            </Box>
        </div>
    )
};

const mobileMedia = `@media only screen and (max-width: ${theme.mobilePoint}px)`;
const styles = {
    content: {
        maxWidth: '450px',
        width: '50%',
        [mobileMedia]: {
            width: '100%',
        }
    },
    label: {
        marginRight: '12px',
    },
    title: {
        margin: '20px 0 30px'
    },
    paragraph: {
        marginBottom: '50px',
        opacity: .5,
        [mobileMedia]: {
            marginBottom: '35px'
        }
    },
    textButton: {
        marginLeft: '25px',
        [mobileMedia]: {
            marginLeft: '10px'
        }
    },
};

SlideAbout.propTypes = {
    className: PropTypes.string,
    onButtonClick: PropTypes.func,
    buttonGradient: PropTypes.array,
    buttonGradientLink: PropTypes.string,
    textButtonLink: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    description: PropTypes.string
};

export default injectStyles(styles)(SlideAbout)