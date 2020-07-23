import React, { useState, memo } from 'react';
import Helmet from 'react-helmet';
import injectStyles, { type Classes, createUseStyles } from 'react-jss';
import IntroSlide from './IntroSlide';
import YoapSlide from './YoapSlide';
import USSlide from './USSlide';
import BGASlide from './BGASlide';
import About from './About';
import Contact from './Contact';
import Approach from './Approach';
import TransformScroll from '../../components/TransformScroll';
import Footer from '../../components/Footer';
import NavigationContainer, { NavigationWaypoint } from '../../containers/NavigationContainer';
import ScrollSections from '../../components/ScrollSections';

const useStyles = createUseStyles({
  wrapper: {
    width: '100%',
    minHeight: '100vh',
  },
  nav: { zIndex: 10 },
  loading: {
    willChange: 'opacity',
  },
});

function Home(): React.ReactNode {
  const [isLogoFlashing, setLogoFlashing] = useState(true);
  const classes = useStyles();

  return (
    <NavigationContainer
      className={classes.nav}
      logo={isLogoFlashing && <span className={classes.loading}>reading image...</span>}
    >
      <Helmet title="Developer & Designer — Nikita Trifan" />

      <div className={classes.wrapper}>
        <TransformScroll scrollerClassName={classes.slidesScroller} index={0}>
          <IntroSlide
            index={0}
            noAnimation={true}
            onMatrixRainingCodeComplete={() => {
              setLogoFlashing(false);
            }}
          />
        </TransformScroll>

        <TransformScroll scrollerClassName={classes.slidesScroller} index={1}>
          <BGASlide />
          <YoapSlide />
          <USSlide />
        </TransformScroll>

        <TransformScroll index={2} scrollerClassName={classes.slidesScroller}>
          <About index={2} />
          <Approach index={3} />
          <Contact index={4} />
        </TransformScroll>

        <Footer />
      </div>
    </NavigationContainer>
  );
}

export default memo(Home);
