import React from 'react'
import Container from './Container'
import Box from './Box'
import injectStyles from 'react-jss'
import classNames from 'classnames'
import { TweenMax } from 'gsap'
import theme from '../theme.js'

class Navigation extends React.Component{
    static links = [{
        href: '/work',
        title: 'Work'
    },{
        href: '/about',
        title: 'About'
    },{
        href: '/contact',
        title: 'Contact'
    }];

    componentDidMount() {
        setTimeout(() => {
            TweenMax.staggerFromTo(this.links.children, .7, {
                opacity: 0, x: 10
            }, {
                opacity: 1, x: 0,
            }, .04)
        }, 300)
    }

    render() {
        const { classes, logo, className } = this.props;
        return (
            <nav className={classNames(classes.wrapper, className)}>
                <Container className={classes.container}>
                    <Box justify="between" align="center">
                        <span className={classes.logo}>
                            {logo ? logo : 'trifan.io'}
                        </span>
                        <div ref={b => this.links = b} className={classes.links}>
                            {Navigation.links.map(it => (
                                <a className={classes.link} key={it.href} href={it.href}>
                                    {it.title}
                                </a>
                            ))}
                        </div>
                    </Box>
                </Container>
            </nav>
        )
    }
}

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0, top: 0,
        width: '100%',
        color: '#fff',
        zIndex: 10
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    link: {
        fontSize: '16px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        marginLeft: '18px',
        color: 'inherit',
        textDecoration: 'none',
        opacity: 0,
    },
    container: {
        padding: '45px 0'
    }
};

export default injectStyles(styles)(Navigation);