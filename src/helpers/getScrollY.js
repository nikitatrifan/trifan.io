const doc = document.documentElement;


export default () => {
    const scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    return scrollY + parseInt(window.innerHeight, 10);
}