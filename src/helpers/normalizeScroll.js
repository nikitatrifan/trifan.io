import bindWheel from './bindWheel'
import { TweenMax } from 'gsap'
const rootNode = document.querySelector('#root');
const doc = document.documentElement;

const bind = () =>
    bindWheel.on(rootNode, onWheel);

const unbind = () =>
    bindWheel.off(rootNode, onWheel);


function onWheel(e = window.event) {
    if (window.isScrollBlocked)
        return false;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    const y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    TweenMax.to(window, .25, {
        scrollTo: delta + y
    });

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    return false;
}

export default cond => {
    if (cond) {
        return bind();
    }

    return unbind();
}