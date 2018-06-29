import React from 'react'
import windowSize from 'react-window-size'
import injectStyles from 'react-jss'
import Waypoint from 'react-waypoint'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Container from '../../components/Container'
import IPadCarousel from '../../components/IPadCarousel'
import IScroll from 'iscroll/build/iscroll-probe.js'
import theme from '../../theme'

class YoapInterface extends React.Component {
    iScroll = null;

    setMapRef = b => this.map = b;
    setWrapperRef = b => this.mapWrapper = b;

    componentDidMount() {
        this.iScroll = new IScroll(this.mapWrapper, {
            mousewheel: true,
            probeType: 3,
            bounce: false
        });

        const fixedMapBlock = this.map.children[0];
        this.iScroll.on('scroll', function () {
            fixedMapBlock.style.transform = `translate3d(0px, ${-this.y}px, 0)`
        });
        setTimeout(this.updateScrollSize, 300);
    }

    updateScrollSize = () => {
        const longImage = this.map.children[1];
        this.map.style.height = parseInt(longImage.clientHeight, 10) + 'px';

        this.iScroll.refresh();
    };

    mapFocusIn = () => {
        const longImage = this.map.children[1];
        const imageHeight = parseInt(longImage.clientHeight, 10);
        this.iScroll.scrollTo(0, -imageHeight, 0);
        this.iScroll.scrollTo(0, 0, 900, IScroll.utils.ease.circular);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.windowWidth !== this.props.windowWidth)
            return this.updateScrollSize();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <Container className={classes.header} type="content">
                    <Heading color={theme.whiteColor} size="2">
                        The Idea
                    </Heading>
                    <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                        YOAP team is working to help locals find a new apartment for a long-term rent: they are looking for
                        best offers for rent on local market and then upload to their website with huge amount of parameters of
                        accomodation that user can filter by.
                        <br/><br/>
                        Also, they wanted to create simple and fast service with all users needs.
                    </Paragraph>
                </Container>
                <Container type="content" className={classes.ipadCarousel}>
                    <IPadCarousel images={[
                        '/yoap/ipad-slides/1.jpg',
                        '/yoap/ipad-slides/2.jpg',
                        '/yoap/ipad-slides/1.jpg',
                        '/yoap/ipad-slides/2.jpg',
                    ]}/>
                </Container>
                <Container className={classes.article} type="content">
                    <Heading color={theme.whiteColor} size="2">
                        Find Routes
                    </Heading>
                    <Paragraph opacity size="3" color={theme.whiteColor} margin="small">
                        In Russian cities like Moscow and Saint Petersburg people measure a location of an apartment at
                        a distance from a nearest subway station.
                        We are developed an interactive map where user can get routes from an apartment to subway station
                        on foot, car or bus with approximate time of.
                        <br/><br/>
                        User can save his favorite addresses like office address or parents
                        and get routes from an apartment to that addresses.
                    </Paragraph>
                    <Waypoint onEnter={this.mapFocusIn}>
                        <div ref={this.setWrapperRef} className={classes.scrollMap}>
                            <div ref={this.setMapRef} className={classes.scrollMapContainer}>
                                <img src="/yoap/map.jpg" className={classes.map}/>
                                <img src="/yoap/map-content.jpg" className={classes.map_content}/>
                            </div>
                        </div>
                    </Waypoint>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: '#1C1C26',
        padding: '70px 0'
    },
    header: {},
    image: {
        display: 'block',
        width: '100%',
        margin: '-60px auto 0'
    },
    bottomContent: {
        marginTop: '-80px'
    },
    ipadCarousel: {
        padding: '50px 0'
    },
    article: {
        padding: '50px 0'
    },
    scrollMap: {
        position: 'relative',
        width: '100%', marginTop: '50px',
        height: '573px',
        overflowY: 'scroll',
        cursor: 'move'
    },
    scrollMapContainer: {
        position: 'relative',
         minHeight: '600px'
    },
    map: {
        position: 'absolute',
        left: 0, top: 0,
        width: '50%',
        display: 'block',
    },
    map_content: {
        marginLeft: '50%',
        width: '50%',
        display: 'block'
    }
};

export default windowSize(
    injectStyles(styles)(YoapInterface)
)