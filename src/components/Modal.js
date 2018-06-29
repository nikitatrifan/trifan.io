import React from 'react'
import windowSize from 'react-window-size'
import ReactDOM from 'react-dom'
import { TweenMax } from 'gsap'
import IScroll from 'iscroll'
import classNames from 'classnames'
import injectStyle from 'react-jss'

// These two containers are siblings in the DOM
const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = 'modal-wrapper';
        modalRoot.style.opacity = 0;
    }

    get dur() {
        const maxDur = 1.5;
        const minDur = .7;
        let val = this.props.windowWidth / 2000;

        if (val < minDur) {
            val = minDur;
        } else if (val > maxDur) {
            val = maxDur;
        }

        return val;
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        window.modal = {
            open: this.openModal,
            close: this.closeModal
        };

        setTimeout(this.openModal, 100);
    }

    componentWillUnmount() {

    }

    closeHandler = () => {
        this.closeModal(() => {
            this.props.onClose();
        });
    };

    initializeScroll = () => {
        this.scroll = new IScroll(this.wrapper, {
            mouseWheel: true
        })
    };

    setBodyBg = revertChanges => {
        if (revertChanges) {
            return document.body.style.background =
                this.backgroundBackup;
        }

        this.backgroundBackup = document.body.style.background;
        document.body.style.background = '#000000';
    };

    openModal = () => {
        const { windowWidth } = this.props;

        this.setBodyBg();
        TweenMax.fromTo(appRoot, this.dur, {
            opacity: 1, x: 0
        }, {
            opacity: .6, x: -windowWidth/2,
        });

        TweenMax.fromTo(modalRoot, this.dur, {
            x: windowWidth, opacity: 1,
        }, {
            x: 0, display: 'block',
            onComplete: this.initializeScroll
        });
    };
    closeModal = onComplete => {
        const { windowWidth } = this.props;

        TweenMax.to(appRoot, this.dur, {
            opacity: 1, x: 0,
            onComplete
        });
        TweenMax.to(modalRoot, this.dur, {
            display: 'none',
            x: windowWidth,
            onComplete: () => {
                this.scroll = null;
                this.setBodyBg(true);
                appRoot.style.transform = 'none';
            }
        });
    };

    render() {
        const { classes, className } = this.props;
        return ReactDOM.createPortal(
            [
                <div key={0} ref={b => this.wrapper = b}
                     className={classNames(className, classes.wrapper)}>
                    <div ref={b => this.wrapper = b} className={classes.scroller}>
                        {this.props.children}
                    </div>
                </div>,
                <div key={1} className={classes.close} onClick={this.closeHandler}>
                    <span className={classes.close_left} />
                    <span className={classes.close_right} />
                </div>
            ],
            this.el,
        );
    }
}

const styles = {
    wrapper: {
        position: 'absolute',
        left: 0, top: 0, width: '100%',
        height: '100%',
        zIndex: 0, cursor: 'move'
    },
    scroller: {
        position: 'relative'
    },
    close: {
        position: 'absolute',
        width: '30px',
        height: '30px',
        right: '5px',
        top: '5px',
        zIndex: 1,
        display: 'block',
        transition: 'transform .2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(0.95)'
        }
    },
    close_left: {
        display: 'block',
        left: '50%', top: '50%',
        width: '100%',
        height: '4px',
        transform: 'translate(-50%, -50%) rotateZ(45deg)',
        backgroundColor: '#121212',
        position: 'absolute'
    },
    close_right: {
        display: 'block',
        left: '50%', top: '50%',
        width: '100%',
        height: '4px',
        transform: 'translate(-50%, -50%) rotateZ(-45deg)',
        backgroundColor: '#121212',
        position: 'absolute',
    }
};

export default windowSize(
    injectStyle(styles)(Modal)
)