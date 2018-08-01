import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Paragraph from '../../components/Paragraph'
import ComponentFadeIn from '../../components/ComponentFadeIn'
import theme from "../../theme"
import { isEmpty } from 'lodash'
import { TweenMax } from 'gsap'

class TerminalInput extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        defaultValue: PropTypes.string,
        staticValue: PropTypes.string,
        type: PropTypes.string,
        placeholders: PropTypes.arrayOf(
            PropTypes.string
        ),
        values: PropTypes.arrayOf(
            PropTypes.string
        ),
        onValueSet: PropTypes.func
    };

    constructor(props) {
        super(props);

        const { defaultValue = '', values } = props;

        this.state = {
            value: defaultValue, isValueEmpty: isEmpty(defaultValue),
            autoComplete: this.getAutoComplete(defaultValue, values)
        };
    }

    changeHandler = ({target: {value}}) => {
        this.setState({
            value, isValueEmpty: isEmpty(value),
            autoComplete: this.getAutoComplete(
                value, this.props.values
            )
        });
    };

    parseString = string =>
        string.toLowerCase().replace(new RegExp(' ', 'gi'), '');

    getAutoComplete = (__inputVal, values) => {
        if (isEmpty(__inputVal) || isEmpty(values))
            return undefined;

        const { parseString } = this;
        const inputVal = parseString(__inputVal);

        let outputValue = '';

        values.forEach(value => {
            if (parseString(value).indexOf(inputVal) !== -1) {
                outputValue = value;
            }
        });

        return outputValue;
    };

    parseAutoComplete = (autoComplete, value) => {
        if (isEmpty(autoComplete) || isEmpty(value))
            return '';

        const fullLength = autoComplete.length;
        const valueLength = value.length;
        const phraseEnd = autoComplete.substr(valueLength, fullLength-valueLength);

        return value + phraseEnd;
    };

    componentDidUpdate() {
        if (!isEmpty(this.props.staticValue))
            return;

        if (this.state.isValueEmpty) {
            this.isUnmounted = false;
            return this.animatePlaceholders();
        }

        if (this.isUnmounted)
            return;

        this.animatePlaceholdersStop();
    }

    componentDidMount() {
        if (!isEmpty(this.props.staticValue))
            return;

        if (this.state.isValueEmpty) {
            this.animatePlaceholders();
        }

        if (this.input) {
            //this.input.focus();
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    setAutoCompleteRef = b => this.autoCompleteNode = b;
    setInputRef = b => this.input = b;

    currentPlaceholderIdx = 0;
    animatePlaceholders = () => {
        const { placeholders } = this.props;

        if (isEmpty(placeholders) || this.isUnmounted)
            return false;

        if (this.currentPlaceholderIdx >= placeholders.length) {
            this.currentPlaceholderIdx = 0;
        }

        TweenMax.to(this.autoCompleteNode, .35, {
            text: placeholders[this.currentPlaceholderIdx++],
            ease: 'Cubic.easeOut',
            onComplete: () => {
                clearTimeout(this.placeHodlersTimeout);
                this.placeHodlersTimeout = setTimeout(
                    this.animatePlaceholders, 2500
                );
            }
        })
    };

    animatePlaceholdersStop = () => {
        this.isUnmounted = true;
        clearTimeout(this.placeHodlersTimeout);

        this.autoCompleteNode.innerText = this.parseAutoComplete(
            this.state.autoComplete, this.state.value
        );
    };

    keySubmitHandler = (e) => {
        const { autoComplete } = this.state;

        if (!isEmpty(autoComplete) && e.key === 'Enter') {
            this.props.onValueSet(autoComplete)
        }
    };

    render() {
        const {
            classes, title, className,
            defaultValue, staticValue,
            type
        } = this.props;
        const {
            value, autoComplete
        } = this.state;

        const isStaticMode = !isEmpty(staticValue);
        const isAutoCompleteMode = !isStaticMode && !isEmpty(autoComplete);
        const isConsole = type === 'console';

        if (isStaticMode) {
            return (
                <div className={classNames(classes.wrapper, className)}>
                    <Paragraph
                        size={5} font={theme.secondaryFont}
                        weight={500} color={theme.whiteColor}
                    >
                        {title}
                    </Paragraph>
                    <div className={classNames(classes.input_wrapper, classes.wrapper_static)}>
                        <span className={classNames(classes.autoComplete, classes.static,)}>
                            {staticValue}
                        </span>
                    </div>
                </div>
            )
        }

        return (
            <ComponentFadeIn delay={.1} gap={-5}>
                <div className={classNames(classes.wrapper, className)}>
                    <Paragraph
                        size={5} font={theme.secondaryFont}
                        weight={500} color={theme.whiteColor}
                    >
                        {title}
                        {isConsole && (
                            <span style={{opacity: .5}}>
                                {' '}
                                (press Ctrl+C to exit)
                            </span>
                        )}
                    </Paragraph>
                    <div className={classes.input_wrapper}>
                        <input
                            onKeyPress={this.keySubmitHandler}
                            onChange={this.changeHandler}
                            ref={this.setInputRef}
                            className={classes.input + ' mousetrap'}
                            type="text" defaultValue={defaultValue}
                        />
                        <span
                            ref={this.setAutoCompleteRef}
                            className={classes.autoComplete}
                        >
                            {isAutoCompleteMode && (
                                this.parseAutoComplete(
                                    autoComplete, value
                                )
                            )}
                        </span>
                        {isConsole && (
                            <span
                                className={classNames(classes.autoComplete, classes.console)}
                            >
                                >
                            </span>
                        )}
                    </div>
                    <Paragraph
                        className={classes.tip}
                        size={5} font={theme.secondaryFont}
                        weight={500} color={theme.whiteColor}
                    >
                        {
                            isAutoCompleteMode ?
                                (
                                    <ComponentFadeIn>
                                        <span>Press Enter ¬ to confirm.</span>
                                    </ComponentFadeIn>
                                ) :
                                !isEmpty(value) ? (
                                    <span>
                                    <ComponentFadeIn>
                                        <span style={{color: "rgb(255, 77, 102)"}}>
                                            Terminal can't recognize your request.
                                        </span>
                                    </ComponentFadeIn>
                                </span>
                                ) : ''
                        }
                    </Paragraph>
                </div>
            </ComponentFadeIn>
        )
    }
}

const styles = {
    wrapper: {},
    input: {
        color: theme.whiteColor,
        backgroundColor: 'transparent',
        outline: 'none',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        fontSize: 'inherit',
        border: 'none',
        padding: 0, margin: 0,
        boxSizing: 'border-box',
        display: 'block',
        position: 'relative',
        zIndex: 1
    },
    input_wrapper: {
        position: 'relative',
        marginTop: '30px',
        fontFamily: theme.monoFont,
        lineHeight: 1.15,
        fontSize: '8vw',
    },
    wrapper_static: {
        marginTop: '15px'
    },
    autoComplete: {
        color: theme.whiteColor,
        backgroundColor: 'transparent',
        outline: 'none',
        display: 'block',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        fontSize: 'inherit',
        opacity: .1,
        position: 'absolute',
        left: 0, top: 0,
        zIndex: 0,
        whiteSpace: 'pre'
    },
    static: {
        opacity: 1,
        position: 'static',
        //whiteSpace: 'normal'
    },
    console: {
        transform: 'translateX(-100%)'
    },
    tip: {
        opacity: .5
    },
};

export default injectStyle(styles)(TerminalInput)