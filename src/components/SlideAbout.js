import React from 'react'
import Box from './Box'
import Paragraph from './Paragraph'
import Heading from './Heading'
import ButtonText from './ButtonText'
import ButtonShadow from './ButtonShadow'
import classNames from 'classnames'
import injectStyles from 'react-jss'

const SlideAbout = ({classes, className, onButtonClick, buttonGradient, labels, title, description}) => (
    <div className={classNames(classes.content, className)}>
        <Box justify="start" align="start">
            {labels.map(it => (
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
            <ButtonShadow onClick={onButtonClick} gradient={buttonGradient}>
                Explore more
            </ButtonShadow>
            <ButtonText className={classes.textButton}>
                Show demo
            </ButtonText>
        </Box>
    </div>
);

const styles = {
    content: {
        maxWidth: '450px',
        width: '50%'
    },
    label: {
        marginRight: '12px',
    },
    title: {
        margin: '20px 0 30px'
    },
    paragraph: {
        marginBottom: '50px',
        opacity: .5
    },
    textButton: {
        marginLeft: 25
    },
};

export default injectStyles(styles)(SlideAbout)