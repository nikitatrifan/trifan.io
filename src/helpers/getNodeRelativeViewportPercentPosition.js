import getScrollY from "./getScrollY";
import getOffsetElement from './getOffsetElement'

export default (node) => {
    if (!node)
        return undefined;

    const windowHeight = parseInt(window.innerHeight, 10);
    const scrollY = getScrollY();
    const wrapperRect = node.getBoundingClientRect();
    const elementTop = getOffsetElement(node).top;
    //const positionTop = wrapperRect.top + scrollY;
    const positionTop = (elementTop - (scrollY - windowHeight)) + scrollY;
    const offset = positionTop - windowHeight;
    const maxScroll = positionTop + wrapperRect.height;


    if (scrollY < offset)
        return undefined;
    if (scrollY > maxScroll)
        return undefined;

    let val = 0;

    if (offset >= windowHeight) {
        val = parseFloat(
            (scrollY - offset) / (wrapperRect.height + windowHeight)
        );
    } else {
        val = parseFloat(
            (scrollY - windowHeight) / wrapperRect.height
        );
    }

    if (val < 0)
        val = 0;

    return parseFloat(Math.min(val, 1));
}