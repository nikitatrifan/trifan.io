import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import { TweenMax } from 'gsap'

export default class OpacityCarousel extends React.Component {
    static propTypes = {
        children: PropTypes.array.isRequired
    };

    state = {
        slide: 0,
    };

    dur = .35;

    componentDidMount() {
        setTimeout(this.startAnimation, 300);
    }

    componentWillUnmount() {
        this.isUnMounted = true;
        clearInterval(this.animationTimeout);
    }

    startAnimation = () => {
        this.animationTimeout = setInterval(this.nextSlide, 5000);
    };
    nextSlide = () => {
        if (this.isUnMounted)
            return;

        const { children } = this.props;
        const { slide } = this.state;
        const maxSlide = children.length - 1;

        if (children.length <= 0) {
            return false;
        }

        if (slide >= maxSlide) {
            return this.setSlide(0);
        }

        this.setSlide(slide + 1);
    };

    setRef = b => this.wrapper = b;

    setSlide = slide => {
        return new Promise(onComplete => {
            TweenMax.to(this.wrapper, this.dur, {
                opacity: 0,
                onComplete
            })
        })
            .then(() => {
                this.setState({slide}, () => {
                    TweenMax.to(this.wrapper, this.dur, {
                        opacity: 1,
                    })
                })
            })
    };

    enterHandler = () => {
        this.isUnMounted = false;
    };
    leaveHandler = () => {
        this.isUnMounted = true;
    };

    render() {
        return (
            <Waypoint onEnter={this.enterHandler} onLeave={this.leaveHandler}>
                <div className={this.props.className} ref={this.setRef}>
                    {this.props.children[this.state.slide]}
                </div>
            </Waypoint>
        )
    }
}