import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

export default class Svg extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        className: PropTypes.string,
        alt: PropTypes.string,
        onLoad: PropTypes.func
    };

    static defaultProps = {
        alt: ''
    };

    static storageName = '@storage/svg';
    constructor(props) {
        super(props);
        // set up initial data
        const { src } = props;
        const markup = Svg.storage(src);
        const isLoaded = !isEmpty(markup);

        this.state = {
            markup, isLoaded
        };

        // if we have no image in a cache
        // then load svg
        if (!isLoaded) {
            Svg.loadSvg(src).then(markup => {
                // show svg :)
                this.setState({
                    markup, isLoaded: true
                })
            });
        }
    }

    static storage = (src, markup) => {
        const storage = JSON.parse(localStorage.getItem(Svg.storageName)) || {};

        if (isEmpty(markup))
            return storage[src];

        localStorage.setItem(Svg.storageName, JSON.stringify({
            ...storage,
            [src]: markup
        }))
    };

    static loadSvg = src => {
        return fetch(src)
            .then(res => res.text())
            .then(markup => {
                // save svg markup to local storage
                Svg.storage(src, markup);

                return markup;
            })
            .catch(err => {
                console.warn(
                    `Can't fetch svg image ${src} because of: \n\n${err.toString()}`
                )
            })
    };

    componentDidMount() {
        if (this.state.isLoaded) {
            setTimeout(this.props.onLoad, 200)
        }
    }
    componentDidUpdate() {
        if (this.state.isLoaded) {
            setTimeout(this.props.onLoad, 100);
        }
    }

    render() {
        const { src, tag, alt = '', ...props } = this.props;
        const { isLoaded, markup } = this.state;
        const Wrapper = tag || 'div';
        if (isLoaded) {
            return (
                <Wrapper {...props} dangerouslySetInnerHTML={{ __html: markup }}/>
            )
        }
        return (
            <img src={src} alt={alt} {...props}/>
        )
    }
}