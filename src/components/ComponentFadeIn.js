import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from './Waypoint'
import { findDOMNode } from 'react-dom'
import { TweenMax } from 'gsap'

export default class ComponentFadeIn extends React.Component {
    static propTypes = {
        gap: PropTypes.number,
        minOpacity: PropTypes.number,
        maxOpacity: PropTypes.number,
        delay: PropTypes.number,
        duration: PropTypes.number,
        noReset: PropTypes.bool,
        noAnimation: PropTypes.bool,
    };

    static defaultProps = {
        gap: -40,
        minOpacity: 0,
        maxOpacity: 1,
        delay: 0,
        duration: .3,
        noReset: true,
        noAnimation: false,
    };

    get block() {
        return findDOMNode(this);
    }

    componentDidMount() {
        this.resetBlock()
    }

    resetBlock = () => {
        if (this.props.noAnimation)
            return;

        TweenMax.set(this.block, {
            opacity: this.props.minOpacity,
            y: -this.props.gap,
        });
    };

    enterHandler = () => {
        if (this.props.noAnimation)
            return;
        TweenMax.to(this.block, this.props.duration, {
            opacity: this.props.maxOpacity,
            y: 0, delay: this.props.delay
        });

        if (this.props.onEnter) {
            this.props.onEnter();
        }
    };

    leaveHandler = () => {
        !this.props.noReset && this.resetBlock();

        if (this.props.onLeave) {
            this.props.onLeave();
        }
    };

    render() {
        return (
            <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
                {this.props.children}
            </Waypoint>
        )
    }
}