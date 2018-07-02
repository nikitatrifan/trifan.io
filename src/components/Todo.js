import React from 'react'
import PropTypes from "prop-types";
import injectStyles from 'react-jss'
import classNames from 'classnames'
import Title from './Title'
import Box from './Box'
import Svg from './Svg'
import Paragraph from './Paragraph'

class Todo extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            isCompleted: PropTypes.bool
        }))
    };

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {

    }
    componentWillUnmount() {

    }
    resizeHandler = () => {

    };

    countNumbers = data => {
        let completed = 0;
        let notCompleted = 0;

        data.forEach(it => {
            if (it.isCompleted)
                return completed++;

            notCompleted++
        });

        return {completed, notCompleted};
    };

    render() {
        const { classes, className, title, data } = this.props;
        const { completed, notCompleted } = this.countNumbers(data);
        let __data = data.sort((a, b) => {
            return !a.isCompleted ? 1 : -1;
        });

        return (
            <div ref={b => this.wrapper = b}
                 className={classNames(classes.wrapper, className)}>
                <div className={classes.content}>
                    <div className={classes.container}>
                        <Title>
                            {title}
                        </Title>
                        <span className={classes.subtitle}>
                            {completed} tasks done / {notCompleted} left
                        </span>
                        <div className={classes.todos_wrapper}>
                            {__data.map((it, key) => (
                                <Box key={key} justify="start" align="center" className={classes.todo}>
                                    <span className={classes.circle}>
                                        {
                                            it.isCompleted &&
                                                <Svg className={classes.icon} src="/icons/tick.svg"/>
                                        }
                                    </span>
                                    <Paragraph size={3} className={classNames(
                                        classes.text, it.isCompleted && classes.active
                                    )}>
                                        {it.title}
                                    </Paragraph>
                                </Box>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        position: 'relative',
        marginBottom: '30px'
    },
    content: {
        width: '95%', margin: '0 auto',
        boxShadow: '0 3px 6px 0 rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '33px 0'
    },
    container: {
        width: '85%', margin: '0 auto'
    },
    subtitle: {
        fontSize: '14px',
        letterSpacing: '-0.39px',
        lineHeight: '18px',
        fontWeight: '300',
        color: '#4975F4',
        marginTop: '7px',
        display: 'block'
    },
    todos_wrapper: {
        paddingTop: '30px'
    },
    todo: {
        paddingBottom: '7px'
    },
    circle: {
        borderRadius: '6px',
        border: '2px solid #6059F1',
        height: '25px', width: '25px',
        marginRight: '10px',
    },
    icon: {
        padding: '3px',
        '& *': {
            fill: '#57D99B'
        }
    },
    text: {
        opacity: .7
    },
    active: {
        textDecoration: 'line-through',
        opacity: .4
    },
};

export default injectStyles(styles)(Todo)