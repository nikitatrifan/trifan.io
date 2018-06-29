import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'
import { NavLink as RouterLink } from 'react-router-dom'
import Box from './Box'
import injectStyles from 'react-jss'
import classNames from 'classnames'
import { TweenMax } from 'gsap'
import theme from '../theme.js'

class Navigation extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
        className: PropTypes.string,
        logo: PropTypes.any,
    };

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
        const { classes, logo, theme, className } = this.props;

        return (
            <nav id="nav" className={classNames(classes.wrapper, classes[theme], className)}>
                <Container className={classes.container}>
                    <Box justify="between" align="center">
                        <RouterLink
                            to="/" className={classes.logo}
                            activeClassName={classes.logo_active}
                        >
                            {logo ? logo : 'trifan.io'}
                        </RouterLink>
                        <div ref={b => this.links = b} className={classes.links}>
                            {Navigation.links.map(it => (
                                <RouterLink
                                    activeClassName={classes.link_active}
                                    className={classes.link} key={it.href}
                                    to={it.href}
                                >
                                    {it.title}
                                </RouterLink>
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
        zIndex: 10,
        transition: 'color .35s ease-in-out',
        display: 'block'
    },
    black: {
        color: '#121212'
    },
    logo: {
        fontSize: '18px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color .25s ease-in-out',
        '&:hover': {
            color: theme.primaryColor
        }
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
        transition: 'color .25s ease-in-out',
        '&:hover': {
            color: theme.primaryLightColor
        }
    },
    link_active: {
        color: theme.primaryColor
    },
    container: {
        padding: '45px 0'
    }
};

export default injectStyles(styles)(Navigation);