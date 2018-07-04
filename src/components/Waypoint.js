import React from 'react'
import PropTypes from 'prop-types'
import windowSize from 'react-window-size'
import { findDOMNode } from 'react-dom'
import getScrollY from '../helpers/getScrollY'

class Waypoint extends React.Component {
    static propTypes = {
        onLeave: PropTypes.func,
        onEnter: PropTypes.func,
        children: PropTypes.any,
        bottomListener: PropTypes.bool,
        topListener: PropTypes.bool,
        offset: PropTypes.number,
    };

    static defaultProps = {
        offset: 0
    };

    isInFocus = false;
    scrollY = 0;

    isNodeInFocus = direction => {
        const wrapperRect = this.node.getBoundingClientRect();
        const appHeight = parseInt(window.innerHeight, 10);
        const offset = (!this.props.offset || isNaN(this.props.offset))
            ? 0 : this.props.offset;
        let bound = wrapperRect.top;

        if (direction === 'up') {
            bound += wrapperRect.height;
        }

        if (this.props.topListener && direction !== 'up') {
            const height = appHeight > wrapperRect.height ?
                wrapperRect.height : appHeight;

            bound += height;
        }

        bound += offset;

        if (bound < 0)
            return false;

        return bound < appHeight && bound > 0;
    };

    scrollerHandler = () => {
        const prevScrollY = this.scrollY;
        const scrollY = this.scrollY = getScrollY();
        let direction = 'down';

        if (scrollY < prevScrollY) {
            direction = 'up';
        }

        if (this.isNodeInFocus(direction)) {
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
        setTimeout(this.scrollerHandler, 60);
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