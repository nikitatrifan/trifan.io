import bindWheel from './bindWheel'
import { TweenMax } from 'gsap'
const { body } = document;
const doc = document.documentElement;

const bind = () =>
    bindWheel.on(body, onWheel);

const unbind = () =>
    bindWheel.off(body, onWheel);


function onWheel(e = window.event) {
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