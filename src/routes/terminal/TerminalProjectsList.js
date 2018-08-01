import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import theme from "../../theme";
import ComponentFadeIn from "../../components/ComponentFadeIn";

class TerminalProjectsList extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
        onProjectSet: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.stars = [];
        for (let i = 0, l = 30; i < l; i++) {
            this.stars.push('*')
        }
    }

    renderStarsRow = () => (
        <Box justify="between" align="center">
            {this.stars.map((it, key) => (
                <span
                    className={this.props.classes.star} key={key}
                >
                    {it}
                </span>
            ))}
        </Box>
    );

    render() {
        const { classes, data, className, onProjectSet } = this.props;
        return (
            <ComponentFadeIn gap={-5}>
                <div className={classNames(classes.wrapper, className)}>
                    <div className={classes.stars}>
                        {this.renderStarsRow()}
                        {this.renderStarsRow()}
                    </div>
                    <div className={classes.content}>
                        <Paragraph
                            size={5} font={theme.secondaryFont}
                            color={theme.whiteColor}
                        >
                            Projects list
                        </Paragraph>
                        <Box className={classes.grid} wrap>
                            {data.map(it => (
                                <Paragraph
                                    onClick={() => onProjectSet(it)}
                                    color={theme.whiteColor}
                                    font={theme.monoFont}
                                    className={classes.item}
                                    key={it}
                                >
                                    {it}
                                </Paragraph>
                            ))}
                        </Box>
                    </div>
                    <div className={classes.stars}>
                        {this.renderStarsRow()}
                        {this.renderStarsRow()}
                    </div>
                </div>
            </ComponentFadeIn>
        )
    }
}

const styles = {
    wrapper: {
        margin: '50px 0 40px'
    },
    star: {
        lineHeight: 1,
        fontSize: '20px',
        fontFamily: theme.monoFont,
        color: theme.whiteColor
    },
    stars: {
        opacity: .2
    },
    content: {
        padding: '20px 0'
    },
    grid: {

    },
    item: {
        marginTop: '20px',
        marginLeft: '30px',
        transition: 'opacity .15s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            opacity: .3
        }
    }
};

export default injectStyle(styles)(TerminalProjectsList)