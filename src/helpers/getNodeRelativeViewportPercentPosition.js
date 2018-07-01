import getScrollY from "./getScrollY";

export default node => {
    if (!node)
        return undefined;

    const windowHeight = parseInt(window.innerHeight, 10);
    const scrollY = getScrollY();
    const wrapperRect = node.getBoundingClientRect();
    const positionTop = wrapperRect.top + scrollY;
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

    return parseFloat(Math.min(val, 1));
}