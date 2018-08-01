import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Card from '../../components/Card'
import Svg from '../../components/Svg'
import Box from '../../components/Box'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import Paragraph from '../../components/Paragraph'
import theme from "../../theme";

class TerminalContact extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };
    
    render() {
        const { classes, className } = this.props;
        return (
            <ComponentFadeIn gap={-5} delay={.05}>
                <div className={classes.block}>
                    <Paragraph
                        color={theme.whiteColor}
                        font={theme.secondaryFont}
                        size={5}
                    >
                        Business card
                    </Paragraph>
                    <Card
                        initialOpacity={.1} opacity={.15}
                        className={classNames(classes.wrapper, className)}
                        wrapperClassName={classes.container}
                    >
                        <Box justify="between" align="center">
                            <Paragraph
                                font={theme.mainFont}
                                color={theme.primaryColor}
                                size={2} weight={600}
                            >
                                Nikita Trifan
                            </Paragraph>
                            <Paragraph
                                font={theme.secondaryFont}
                                color={theme.primaryColor}
                                size={2}
                            >
                                trifan.io
                            </Paragraph>
                        </Box>
                        <Paragraph
                            font={theme.mainFont}
                            color={theme.whiteColor}
                            size={2} weight={100}
                        >
                            Developer & Designer
                        </Paragraph>
                        <span className={classes.line}/>
                        <Paragraph
                            font={theme.monoFont}
                            color={theme.whiteColor}
                            size={2}
                        >
                            telegram: +971 52 613 8788
                        </Paragraph>
                        <Paragraph
                            font={theme.monoFont}
                            color={theme.whiteColor}
                            size={2}
                        >
                            whatsapp: +7 999 213 73 33
                        </Paragraph>
                        <Paragraph
                            font={theme.monoFont}
                            color={theme.whiteColor}
                            size={2}
                        >
                            email: hello@trifan.io
                        </Paragraph>

                        <Box className={classes.icons} align="center">
                            <a target="__blank" href="https://facebook.com/nikitatrif">
                                <Svg src="/icons/fb.svg" className={classes.icon} />
                            </a>
                            <a target="__blank" href="https://instagram.com/latrifan">
                                <Svg src="/icons/inst.svg" className={classes.icon} />
                            </a>
                        </Box>
                    </Card>
                </div>
            </ComponentFadeIn>
        )
    }
}

const styles = {
    block: {
        margin: '30px 0'
    },
    wrapper: {
        paddingTop: '30px',
        marginTop: '15px'
    },
    container: {
        width: '90%'
    },
    line: {
        width: '30px',
        height: '1px',
        backgroundColor: '#fff',
        display: 'block',
        marginTop: '20px',
        marginBottom: '30px'
    },
    icons: {
        marginTop: '30px'
    },
    icon: {
        width: '28px',
        height: '28px',
        fill: '#fff',
        marginRight: '14px'
    }
};

export default injectStyle(styles)(TerminalContact)