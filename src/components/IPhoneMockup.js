import React from 'react'
import PropTypes from "prop-types";
import injectStyles from 'react-jss'

class IPhoneMockup extends React.Component {
    state = { width: 0 };

    static propTypes = {
        children: PropTypes.any
    };

    resizeHandler = () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({ width: parseFloat(this.node.clientWidth) })
        }, 60);
    };

    componentDidMount() {
        setTimeout(this.resizeHandler, 10);
        setTimeout(this.resizeHandler, 300);
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler)
    }

    setRef = b => this.node = b;

    wrapperRatio = 2.0195313;
    screenWidthRatio = 0.91911;
    screenHeightRatio = 0.81094;

    sensorWidthRatio = 0.019;
    sensorHeightRatio = 0.0103;
    sensorTopRatio = 0.024316;

    cameraWidthRatio = 0.01635;
    cameraHeightRatio = 0.0079;
    cameraTopRatio = 0.045;
    cameraLeftRatio = 0.4252;

    speakerWidthRatio = 0.0947;
    speakerHeightRatio = 0.00486;
    speakerTopRatio = 0.047;
    speakerLeftRatio = 0.463;

    buttonBottomRatio = 0.0158;
    buttonHeightRatio = 0.06018;
    buttonWidthRatio = 0.11519;

    render() {
        const {
            wrapperRatio, screenWidthRatio, screenHeightRatio,
            sensorWidthRatio, sensorHeightRatio, sensorTopRatio,
            cameraWidthRatio, cameraHeightRatio, cameraTopRatio,
            cameraLeftRatio, speakerWidthRatio, speakerHeightRatio,
            speakerTopRatio, speakerLeftRatio, buttonBottomRatio,
            buttonHeightRatio, buttonWidthRatio
        } = this;

        const { classes, children } = this.props;
        const { width } = this.state;

        const height = width * wrapperRatio;

        return (
            <div
                ref={this.setRef}
                className={classes.wrapper}
                style={{
                    height: `${height}px`,
                    borderRadius: `${width / 8}px`
                }}
            >
                <div
                    className={classes.sensor}
                    style={{
                        width: `${sensorWidthRatio * width}px`,
                        height: `${sensorHeightRatio * height}px`,
                        top: `${sensorTopRatio * height}px`
                    }}
                />
                <div
                    className={classes.camera}
                    style={{
                        width: `${cameraWidthRatio * width}px`,
                        height: `${cameraHeightRatio * height}px`,
                        top: `${cameraTopRatio * height}px`,
                        left: `${cameraLeftRatio * width}px`,
                    }}
                />
                <div
                    className={classes.speaker}
                    style={{
                        width: `${speakerWidthRatio * width}px`,
                        height: `${speakerHeightRatio * height}px`,
                        borderRadius: `${speakerHeightRatio * height}px`,
                        top: `${speakerTopRatio * height}px`,
                        left: `${speakerLeftRatio * width}px`
                    }}
                />
                <div
                    className={classes.screen}
                    style={{
                        height: `${height * screenHeightRatio}px`,
                        width: `${width * screenWidthRatio}px`
                    }}
                >
                    {children}
                </div>
                <div
                    className={classes.button}
                    style={{
                        height: `${height * buttonHeightRatio}px`,
                        width: `${width * buttonWidthRatio}px`,
                        bottom: `${height * buttonBottomRatio}px`
                    }}
                />
            </div>
        )
    }
}

const styles = {
    wrapper: props => ({
        width: '100%',
        backgroundColor: props.backgroundColor || '#ffffff',
        boxShadow: '0 5px 15px 0 rgba(0,0,0,0.03), 0 25px 65px 0 rgba(191,197,209,0.22), 0 -2px 10px 0 rgba(242,246,250,0.22) inset',
        position: 'relative'
    }),
    screen: {
        backgroundColor: '#fafafa',
        position: 'absolute', marginTop: '-3px',
        left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
    },
    sensor: {
        borderRadius: '50%',
        background: 'linear-gradient(to bottom, #D1D1D3, #FCFDFF)',
        left: '50%', transform: 'translateX(-50%)', position: 'absolute'
    },
    camera: {
        borderRadius: '50%',
        backgroundColor: '#BFC0C5',
        border: '1px solid #7D7D7D',
        boxShadow: '-2px -2px 5px 0 rgba(0,0,0,0.34) inset',
        position: 'absolute', opacity: .6
    },
    speaker: {
        backgroundColor: '#BFC0C5',
        border: '1px solid #7D7D7D',
        boxShadow: '-2px -2px 5px 0 rgba(0,0,0,0.34) inset',
        left: '50%', position: 'absolute', opacity: .6
    },
    button: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 14px 0 rgba(0,0,0,0.19)',
        borderRadius: '50%', position: 'absolute',
        left: '50%', transform: 'translateX(-50%)'
    }
};

export default injectStyles(styles)(IPhoneMockup)