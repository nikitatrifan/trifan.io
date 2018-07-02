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
import theme from '../../theme'
import {Power0, TimelineMax, TweenMax} from "gsap";
import getNodeRelativeViewportPercentPosition from "../../helpers/getNodeRelativeViewportPercentPosition";

class BGATodos extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired
    };

    componentDidMount() {
        setTimeout(() => {
            this.tl = this.tween();
            this.scrollHandler();
        }, 300);
        window.addEventListener('scroll', this.scrollHandler);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.windowWidth !== this.props.windowWidth) {
            return this.resizeHandler()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
    resizeHandler = () => {
        this.tl = this.tween();
        this.scrollHandler();
    };
    scrollHandler = () => {
        const percent = getNodeRelativeViewportPercentPosition(this.wrapper);

        if (percent === undefined)
            return false;

        if (!this.tl)
            return false;

        TweenMax.to(this.tl, 0, {
            progress: percent,
            ease: Power0.easeNone
        })
    };
    tween = () => {
        if (!this.scroller)
            return false;

        const tl = new TimelineMax({ paused: true });
        const height = parseInt(this.props.windowHeight / 2, 10);
        const dur = 3;
        const entryPoint = dur * .65;

        tl.to(this.scroller, entryPoint, {
            y: 0, opacity: 1,
            ease: Power0.easeNone
        });

        tl.to(this.scroller, dur - entryPoint, {
            y: height,
            opacity: .4,
            ease: Power0.easeNone
        }, entryPoint);

        return tl;
    };

    static data = [
        {
            title: 'Screens Design',
            todos: [
                {
                    title: 'App Intro',
                    isCompleted: true
                },
                {
                    title: 'Login / Signup',
                    isCompleted: true
                },
                {
                    title: 'Program Definer',
                    isCompleted: true
                },
                {
                    title: 'Programs List',
                    isCompleted: true
                },
                {
                    title: 'Programs Review',
                    isCompleted: true
                },
                {
                    title: 'Notifications',
                    isCompleted: true
                },
                {
                    title: 'Training Dashboard',
                    isCompleted: true
                },
                {
                    title: 'Training Process',
                    isCompleted: true
                },
                {
                    title: 'Exercise Instruction',
                    isCompleted: true
                },
                {
                    title: "Add/Edit User's Program",
                    isCompleted: true
                },
                {
                    title: 'Exercises',
                    isCompleted: true
                },
                {
                    title: 'Settings',
                    isCompleted: true
                },
                {
                    title: 'Measure Results',
                    isCompleted: true
                },
                {
                    title: 'Results Dashboard',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'Screens JSX Markup',
            todos: [
                {
                    title: 'App Intro',
                    isCompleted: true
                },
                {
                    title: 'Login / Signup',
                    isCompleted: true
                },
                {
                    title: 'Program Definer',
                    isCompleted: true
                },
                {
                    title: 'Programs List',
                    isCompleted: true
                },
                {
                    title: 'Programs Review',
                    isCompleted: true
                },
                {
                    title: 'Notifications',
                    isCompleted: true
                },
                {
                    title: 'Training Dashboard',
                    isCompleted: true
                },
                {
                    title: 'Training Process',
                    isCompleted: true
                },
                {
                    title: 'Exercise Instruction',
                    isCompleted: true
                },
                {
                    title: "Add/Edit User's Program",
                    isCompleted: true
                },
                {
                    title: 'Exercises',
                    isCompleted: true
                },
                {
                    title: 'Settings',
                    isCompleted: true
                },
                {
                    title: 'Measure Results',
                    isCompleted: true
                },
                {
                    title: 'Results Dashboard',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'CMS Pages Design',
            todos: [
                {
                    title: 'Login Page',
                    isCompleted: true
                },
                {
                    title: 'Exercises Management',
                    isCompleted: true
                },
                {
                    title: 'Programs Management',
                    isCompleted: true
                },
                {
                    title: 'Training Management',
                    isCompleted: true
                },
                {
                    title: 'Users Management',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'CMS JSX Markup',
            todos: [
                {
                    title: 'LoginPage / LogoutPage',
                    isCompleted: true
                },
                {
                    title: 'ExercisesPage',
                    isCompleted: true
                },
                {
                    title: 'ProgramsPage',
                    isCompleted: true
                },
                {
                    title: 'UsersPage',
                    isCompleted: true
                },
                {
                    title: 'ExerciseEdit',
                    isCompleted: true
                },
                {
                    title: 'ExercisesSchedule',
                    isCompleted: true
                },
                {
                    title: 'Header',
                    isCompleted: true
                },
                {
                    title: 'ImageUpload',
                    isCompleted: true
                },
                {
                    title: 'ProgramEdit',
                    isCompleted: true
                },
                {
                    title: 'TrainingEdit',
                    isCompleted: true
                },
                {
                    title: 'TrainingSchedule',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'CMS Front-End',
            todos: [
                {
                    title: 'LoginPage / LogoutPage',
                    isCompleted: true
                },
                {
                    title: 'ExercisesPage',
                    isCompleted: true
                },
                {
                    title: 'ProgramsPage',
                    isCompleted: true
                },
                {
                    title: 'UsersPage',
                    isCompleted: true
                },
                {
                    title: 'ExerciseEditContainer',
                    isCompleted: true
                },
                {
                    title: 'ProgramEditContainer',
                    isCompleted: true
                },
                {
                    title: 'SearchExerciseContainer',
                    isCompleted: true
                },
                {
                    title: 'ImageUploadContainer',
                    isCompleted: true
                },
                {
                    title: 'Exercises—reducer/actions/constants',
                    isCompleted: true
                },
                {
                    title: 'Programs—reducer/actions/constants',
                    isCompleted: true
                },
                {
                    title: 'User—reducer/actions/constants',
                    isCompleted: true
                },
                {
                    title: 'Users—reducer/actions/constants',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'Back-End and Rest API',
            todos: [
                {
                    title: 'Exercise Model',
                    isCompleted: true
                },
                {
                    title: 'Program Model',
                    isCompleted: true
                },
                {
                    title: 'Training Model',
                    isCompleted: true
                },
                {
                    title: 'User Model',
                    isCompleted: true
                },
                {
                    title: 'Exercise Controller',
                    isCompleted: true
                },
                {
                    title: 'ProgramController',
                    isCompleted: true
                },
                {
                    title: 'User Controller',
                    isCompleted: true
                },
                {
                    title: 'Users Controller',
                    isCompleted: true
                },
                {
                    title: 'Image Controller',
                    isCompleted: true
                },
            ]
        },
        {
            title: 'App Front-End',
            todos: [
                {
                    title: 'Login / Signup',
                    isCompleted: true
                },
                {
                    title: 'Program Definer',
                    isCompleted: false
                },
                {
                    title: 'Programs List',
                    isCompleted: true
                },
                {
                    title: 'Programs Review',
                    isCompleted: false
                },
                {
                    title: 'Notifications',
                    isCompleted: false
                },
                {
                    title: 'Training Dashboard',
                    isCompleted: false
                },
                {
                    title: 'Training Process',
                    isCompleted: false
                },
                {
                    title: 'Exercise Instruction',
                    isCompleted: false
                },
                {
                    title: "Add/Edit User's Program",
                    isCompleted: false
                },
                {
                    title: 'Exercises',
                    isCompleted: false
                },
                {
                    title: 'Settings',
                    isCompleted: false
                },
                {
                    title: 'Measure Results',
                    isCompleted: false
                },
                {
                    title: 'Results Dashboard',
                    isCompleted: false
                },
            ]
        },
    ];

    render() {
        const { classes } = this.props;
        return (
            <div ref={b => this.wrapper = b} className={classes.wrapper}>
                <div ref={b => this.scroller = b}
                     className={classes.scroller}>
                    <Container className={classes.header} type="content">
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
                            {BGATodos.data.map((it, idx) => (
                                <ComponentFadeIn key={idx} delay={.04*idx}>
                                    <Todo
                                        className={classes.todo}
                                        title={it.title} data={it.todos}
                                    />
                                </ComponentFadeIn>
                            ))}
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        zIndex: props.index, position: 'relative',
    }),
    scroller: {
        minHeight: '100vh', backgroundColor: '#6059F1',
        paddingBottom: '109px'
    },
    header: {
        padding: '99px 0 66px'
    },
    grid: {
        columnCount: 3,
        columnGap: 0
    },
    todo: {
        breakInside: 'avoid'
    },
    link: {
        fontWeight: '500'
    }
};

export default windowSize(
    injectStyles(styles)(BGATodos)
)