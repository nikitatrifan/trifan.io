import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import ButtonBack from './ButtonBack'
import Box from './Box'
import injectStyles from 'react-jss'
import classNames from 'classnames'
import getScrollY from '../helpers/getScrollY'
import IScroll from 'iscroll/build/iscroll-probe'
import { TweenMax } from 'gsap'
import theme from '../theme'

const themes = {
    dark: {
        color: '#121212',
        fill: '#121212'
    },
    light: {
        color: '#ffffff',
        fill: '#ffffff'
    },
};

class Navigation extends React.Component{
    static propTypes = {
        theme: PropTypes.oneOf([
            'dark', 'light'
        ]),
        className: PropTypes.string,
        logo: PropTypes.any,
    };

    static links = [{
        href: '/#work',
        title: 'Work'
    },{
        href: '/#about',
        title: 'About'
    },{
        href: '/#contact',
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

    __scrollTo = node => {
        const dur = 500;

        window.scroll.scrollToElement(node, dur, 0, 0, IScroll.utils.ease.quadratic);
        setTimeout(() => (
            window.scroll.refresh()
        ), dur * 1.2);
    };

    scrollTo = block => {
        const node = document.querySelector(block);
        const nodeRect = node.getBoundingClientRect();
        const windowHeight = parseInt(window.innerHeight, 10);
        const top = nodeRect.top + (getScrollY() - windowHeight);
        const margin = windowHeight / 2.3;
        let offset = top - margin;

        if (top < getScrollY()) {
            offset = top + margin
        }

        if (
            (
                nodeRect.top <= nodeRect.height ||
                nodeRect.top >= nodeRect.height
            ) && parseInt(nodeRect.top, 10) !== 0
        ) {
            window.scroll.scrollTo(0, -offset, 0);
            setTimeout(() => (
                this.__scrollTo(node)
            ), 500)
        }

        return this.__scrollTo(node);
    };

    handleLinksClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let href = e.target.getAttribute('href');

        if (!href) {
            href = document.querySelector('#logo').getAttribute('href');
        }

        href = href.replace('/', '');

        if (this.props.history.location.pathname === '/') {
            return this.scrollTo(href)
        }

        this.props.history.push('/');
        setTimeout(() => {
            this.scrollTo(href);
        }, 60)
    };

    mouseDownClickHandler = e => {
        TweenMax.to(e.target, .35, {
            scale: .95,
        })
    };
    mouseUpClickHandler = e => {
        TweenMax.to(e.target, .35, {
            scale: 1
        })
    };

    render() {
        const { classes, logo, back, theme, className } = this.props;
        const color = themes[theme] ? themes[theme].color : '#121212';

        return (
            <nav id="nav" className={classNames(classes.wrapper, classes[theme], className)}>
                <Container className={classes.container}>
                    <Box id="nav-wrapper" justify="between" align="center">
                        <RouterLink
                            onMouseDown={!back && !logo ? this.mouseDownClickHandler : undefined}
                            onMouseUp={!back && !logo ? this.mouseUpClickHandler : undefined}
                            to="/#intro" className={classes.logo}
                            id="logo"
                            onClick={this.handleLinksClick}
                            activeClassName={classes.logo_active}
                        >
                            {
                                back ? (
                                    <ButtonBack color={color} />
                                ) :
                                    logo ? logo : 'trifan.io'
                            }
                        </RouterLink>
                        <div ref={b => this.links = b} className={classes.links}>
                            {Navigation.links.map(it => (
                                <RouterLink
                                    onMouseDown={this.mouseDownClickHandler}
                                    onMouseUp={this.mouseUpClickHandler}
                                    activeClassName={classes.link_active}
                                    className={classes.link} key={it.href}
                                    onClick={this.handleLinksClick}
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
    ...themes,
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
        display: 'block',
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
};

export default withRouter(injectStyles(styles)(Navigation));