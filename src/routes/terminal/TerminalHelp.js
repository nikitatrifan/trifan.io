import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Paragraph from '../../components/Paragraph'
import Box from '../../components/Box'
import theme from "../../theme";

class TerminalHelp extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    render() {
        const { classes, commands, className } = this.props;
        return (
            <div className={classNames(classes.wrapper, className)}>
                <Paragraph
                    color={theme.whiteColor} size={5}
                    font={theme.secondaryFont}
                >
                    About terminal
                </Paragraph>
                <Paragraph
                    className={classes.about}
                    color={theme.whiteColor} size={2}
                    font={theme.monoFont}
                >
                    The terminal was developed to give an user a new way to get better knowledge of Nikita.
                    <br/>
                    Try each command to explore more.
                </Paragraph>
                <Paragraph
                    color={theme.whiteColor} size={5}
                    font={theme.secondaryFont}
                >
                    Commands list
                </Paragraph>
                {commands.map((it, key) => (
                    <div key={key} className={classes.item}>
                        <Box className={classes.item_commands}>
                            {it.slugs.map((slug, idx) => (
                                <Box key={slug}>
                                    <Paragraph
                                        color={theme.primaryColor} size={2}
                                        weight={600}
                                        font={theme.monoFont}
                                    >
                                        {slug}
                                    </Paragraph>
                                    {idx < (it.slugs.length - 1) && (
                                        <Paragraph
                                            className={classes.item_commands_sep}
                                            color={theme.whiteColor} size={2}
                                            font={theme.monoFont}
                                        >
                                            or
                                        </Paragraph>
                                    )}
                                </Box>
                            ))}
                        </Box>
                        <Paragraph
                            className={classes.item_des}
                            color={theme.whiteColor} size={2}
                            font={theme.monoFont}
                        >
                            {it.about}
                        </Paragraph>
                    </div>
                ))}
            </div>
        )
    }
}

const styles = {
    wrapper: {
        padding: '40px 0'
    },
    item: {
        padding: '15px 0 15px 30px'
    },
    item_des: {
        paddingLeft: '30px',
        maxWidth: '400px'
    },
    item_commands: {},
    item_commands_sep: {
        margin: '0 5px'
    },
    about: {
        padding: '15px 0',
        maxWidth: '500px'
    },
};

export default injectStyle(styles)(TerminalHelp)