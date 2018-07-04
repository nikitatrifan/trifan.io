import React from 'react'
import PropTypes from "prop-types";
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import Todo from '../../components/Todo'
import Link from '../../components/Link'
import ButtonText from '../../components/ButtonText'
import Box from '../../components/Box'
import TransformScroll from '../../components/TransformScroll'
import theme from '../../theme'
import responsive from '../../helpers/responsive'
import {TweenMax} from "gsap";
import { NavigationWaypoint } from "../../containers/NavigationContainer";
import todosData from './todosData'

class BGATodos extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    state = {
        isFullState: false
    };

    toggleFullState = () => {
        this.setState(state => ({
            isFullState: !state.isFullState
        }), () => {
            this.scroller.resizeHandler();
            if (!this.state.isFullState) {
                const node = document.querySelector('#todos-header').parentElement;
                TweenMax.to(window, 0, {
                    scrollTo: node,
                    onComplete: this.scroller.resizeHandler
                })
            }
        })
    };

    static data = todosData;

    render() {
        const { isFullState } = this.state;
        const { classes } = this.props;
        const { isTablet, isMobile } = responsive();
        const maxItems = isMobile ? 0 : isTablet ? 1 : 2;
        return (
            <TransformScroll
                offset={isFullState ? 0.6595 : 0.5} scrollRef={b => this.scroller = b}
                wrapperClassName={classes.wrapper} scrollerClassName={classes.scroller}
            >
                <NavigationWaypoint theme="light">
                    <Container id="todos-header" className={classes.header} type="content">
                        <ComponentFadeIn delay={.04}>
                            <Heading color={theme.whiteColor} size="2">
                                Under Development
                            </Heading>
                        </ComponentFadeIn>
                        <ComponentFadeIn delay={.08}>
                            <Paragraph color={theme.whiteColor} opacity size="3" margin="small">
                                This is the unique case because the app is in work in progress stage. You can track the progress here
                                and watch
                                {' '}
                                <Link
                                    color={theme.whiteColor}
                                    className={classes.link}
                                    to="https://github.com/nikitatrifan/train-app"
                                    target="__blank" icon
                                >
                                    github repo
                                </Link>
                            </Paragraph>
                        </ComponentFadeIn>
                    </Container>
                    <Container type="bootstrap">
                        <div className={classes.grid}>
                            {BGATodos.data.map((it, idx) => {
                                if (!isFullState && idx > maxItems)
                                    return null;

                                return (
                                    <ComponentFadeIn key={idx} delay={.04*idx}>
                                        <Todo
                                            className={classes.todo}
                                            title={it.title} data={it.todos}
                                        />
                                    </ComponentFadeIn>
                                )
                            })}
                        </div>
                    </Container>
                    <ComponentFadeIn>
                        <Box
                            onClick={this.toggleFullState}
                            align="center" justify="center"
                            className={classes.buttonWrapper}
                        >
                            <ButtonText color={theme.whiteColor}>
                                {isFullState ? 'Show Less Todos' : 'Show All Todos'}
                            </ButtonText>
                        </Box>
                    </ComponentFadeIn>
                </NavigationWaypoint>
            </TransformScroll>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index,
    }),
    scroller: {
        backgroundColor: '#6059F1',
        paddingBottom: '109px',
        minHeight: '101vh'
    },
    header: {
        padding: '65px 0 36px',

    },
    grid: {
        columnCount: 3,
        columnGap: 0,
        [responsive('tablet')]: {
            columnCount: 2
        },
        [responsive('mobile')]: {
            columnCount: 1
        }
    },
    todo: {
        breakInside: 'avoid'
    },
    link: {
        fontWeight: '500'
    },
    buttonWrapper: {
        padding: '20px 0 10px'
    }
};

export default windowSize(
    injectStyles(styles)(BGATodos)
)