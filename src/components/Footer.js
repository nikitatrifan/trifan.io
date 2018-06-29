import React from 'react'
import Waypoint from 'react-waypoint'
import injectStyles from 'react-jss'
import classNames from 'classnames'
import { TweenMax } from 'gsap'
import Container from './Container'
import Link from './Link'
import Paragraph from './Paragraph'
import ButtonText from './ButtonText'
import Box from './Box'
import theme from '../theme.js'

class Footer extends React.Component{
    static links = [{
        href: 'https://instagram.com/latrifan',
        title: 'instagram'
    },{
        href: 'https://www.facebook.com/nikitatrif',
        title: 'facebook'
    }];

    enterHandler = () => {
        TweenMax.staggerFromTo(this.links.children, .7, {
            opacity: 0, x: -10
        }, {
            opacity: 1, x: 0,
        }, .04)
    };
    render() {
        const { classes, logo, theme, className } = this.props;

        return (
            <Waypoint onEnter={this.enterHandler}>
                <footer id="footer" className={classNames(classes.wrapper, classes[theme], className)}>
                    <Container className={classes.container}>
                        <Box justify="between" align="center">
                            <Box align="center" className={classes.col}>
                                <div ref={b => this.links = b} className={classes.links}>
                                    {Footer.links.map(it => (
                                        <Link className={classes.link} target="__blank"
                                           key={it.href} to={it.href}>
                                            {it.title}
                                        </Link>
                                    ))}
                                </div>
                            </Box>
                            <Box align="center" justify="center" className={classes.col}>
                                <ButtonText className={classes.button} icon>
                                    Send a Request
                                </ButtonText>
                            </Box>
                            <Box align="center" justify="end" className={classes.col}>
                                <Paragraph className={classes.copyright} size="5">
                                    © 2018 Nikita Trifan
                                </Paragraph>
                            </Box>
                        </Box>
                    </Container>
                </footer>
            </Waypoint>
        )
    }
}

const styles = {
    wrapper: {
        display: 'block',
        width: '100%',
        color: '#fff',
        transition: 'color .35s ease-in-out'
    },
    col: {
        width: '33%'
    },
    black: {
        color: '#121212'
    },
    logo: {
        fontSize: '18px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        color: 'inherit'
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    link: {
        fontSize: '12px',
        letterSpacing: '.15px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        marginRight: '18px',
        color: 'inherit',
        textDecoration: 'none',
        opacity: 0,
        textTransform: 'uppercase',
        transition: 'color .25s ease-in-out',
        '&:hover': {
            color: theme.primaryColor
        }
    },
    copyright: {
        textAlign: 'right', opacity: .6
    },
    container: {
        padding: '25px 0'
    }
};

export default injectStyles(styles)(Footer);