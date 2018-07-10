export default () => {
    const scrollY = Math.abs(window.iScrollY || 0);
    return scrollY + parseInt(window.innerHeight, 10);
}