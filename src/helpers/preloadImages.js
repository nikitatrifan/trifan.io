export default function preloadImages(__images) {
    let images = [];

    return __images.map(src => {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = resolve;

            image.src = src;

            return images.push(image);
        })
    })
};