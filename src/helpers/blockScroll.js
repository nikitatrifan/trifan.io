let contentOffset = 0;

const setBodyStyles = styles => {
  const body = document.body;
  for (let prop in styles) {
    const value = styles[prop];

    body.style[prop] = value;
  }
};
const setContentPos = y => {
  let offset = `translate3d(0px, ${y || 0}px, 0px)`;
  const pages = document.querySelector('#pages');
  const nav = document.querySelector('#nav');

  pages && (pages.style.transform = offset);
  nav && (nav.style.transform = offset);

  if (y == null) {
    window.scrollTo(0, contentOffset);

    contentOffset = 0;
  }

  contentOffset = y < 0 ? -y : y;
};
const setBodySize = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  setBodyStyles({
    width: `${parseInt(clientWidth, 10)}px`,
    height: `${parseInt(clientHeight, 10)}px`
  });
};

const resize = () => {
  setBodySize();
};

const blockScroll = cb => {
  const doc = document.documentElement;
  const scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  window.addEventListener('resize', resize);
  setBodySize();

  setBodyStyles({
    overflowY: 'hidden',
    overflowX: 'hidden',
    marginRight: 'auto',
    position: 'relative'
  });

  setContentPos(-scrollY);

  if (cb) {
    cb(true);
  }
};
const unBlockScroll = cb => {
  window.removeEventListener('resize', resize);

  setBodyStyles({
    overflowY: 'visible',
    width: '100%',
    position: 'static',
    height: 'auto',
  });

  setContentPos();

  if (cb) {
    cb(false);
  }
};

export default (mode, cb) => {
  if (mode) {
    blockScroll(cb)
  } else {
    unBlockScroll(cb)
  }
};
