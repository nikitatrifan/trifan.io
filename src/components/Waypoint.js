import React from 'react'
import windowSize from 'react-window-size'
import getScrollY from '../helpers/getScrollY'
import { findDOMNode } from 'react-dom'

class Waypoint extends React.Component {
    isInFocus = false;

    isNodeInFocus = () => {
        const wrapperRect = this.node.getBoundingClientRect();
        const appHeight = parseInt(window.innerHeight, 10);
        const bound = wrapperRect.top;

        if (bound < 0)
            return false;

        return bound < appHeight && bound > 0;
    };

    scrollerHandler = () => {
        if (this.isNodeInFocus()) {
            return this.enterHandler();
        }

        return this.leaveHandler();
    };

    leaveHandler = () => {
        if (!this.isInFocus)
            return;


        this.isInFocus = false;
        const { onLeave } = this.props;
        if (onLeave) onLeave();
    };
    enterHandler = () => {
        if (this.isInFocus)
            return;

        this.isInFocus = true;
        const { onEnter } = this.props;
        if (onEnter) onEnter();
    };

    updateRef = () => {
        this.node = findDOMNode(this)
    };

    componentDidMount() {
        this.updateRef();
        this.scrollerHandler();
        setTimeout(this.scrollerHandler, 300);
        window.addEventListener('scroll', this.scrollerHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollerHandler);
    }
    componentDidUpdate() {
        this.updateRef();
    }

    render() {
        return this.props.children
    }
}

export default windowSize(Waypoint);