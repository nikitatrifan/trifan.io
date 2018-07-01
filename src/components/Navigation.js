import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'
import { NavLink as RouterLink } from 'react-router-dom'
import Svg from './Svg'
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
        const { classes, logo, back, theme, className } = this.props;

        return (
            <nav id="nav" className={classNames(classes.wrapper, classes[theme], className)}>
                <Container className={classes.container}>
                    <Box justify="between" align="center">
                        <RouterLink
                            to="/" className={classes.logo}
                            activeClassName={classes.logo_active}
                        >
                            {
                                back ? (
                                    <Box justify="start" align="center" className={classes.back}>
                                        <Svg src="/icons/arrow.svg" className={classes.arrow}/>
                                        <span>Back</span>
                                    </Box>
                                ) :
                                    logo ? logo : 'trifan.io'
                            }
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

const cssTransitionTime = .25;

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0, top: 0,
        width: '100%',
        color: '#fff',
        zIndex: 10,
        transition: `color ${cssTransitionTime}s ease-in-out`,
        display: 'block',
    },
    black: {
        color: '#121212',
        fill: '#121212'
    },
    logo: {
        fontSize: '18px',
        fontFamily: theme.secondaryFont,
        fontWeight: '500',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        fill: 'inherit',
        transition: `color ${cssTransitionTime}s ease-in-out, fill ${cssTransitionTime}s ease-in-out`,
        '&:hover': {
            color: theme.primaryColor,
            fill: theme.primaryColor
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
        transition: `color ${cssTransitionTime}s ease-in-out`,
        '&:hover': {
            color: theme.primaryLightColor
        }
    },
    link_active: {
        color: theme.primaryColor
    },
    container: {
        padding: '45px 0',
        '@media only screen and (max-width: 600px)': {
            padding: '15px 0'
        }
    },

    back: {
        '& span': {
            transition: `transform ${cssTransitionTime}s ease-in-out`,
        },
        '&:hover svg': {
            transform: 'translateX(7px)',
        },
        '&:hover span': {
            transform: 'translateX(-5px)',
        },
    },
    arrow: {
        transform: 'rotateZ(180deg)',
        marginRight: '10px',
        '& svg': {
            transition: `transform ${cssTransitionTime}s ease-in-out`,
            fill: 'inherit',
            '& *': {
                fill: 'inherit'
            }
        }
    }
};

export default injectStyles(styles)(Navigation);