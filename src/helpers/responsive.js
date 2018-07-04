import theme from '../theme'

export default function responsive(point) {
    if (point === 'desktop_min') {
        return `@media only screen and (min-width: ${theme.desktopPoint}px)`
    }

    if (point) {
        const device = theme[`${point}Point`];
        return `@media only screen and (max-width: ${device}px)`;
    }

    const width = parseInt(window.innerWidth, 10);
    const isMobile = width <= theme.mobilePoint;
    const isTablet = width <= theme.tabletPoint;

    return {
        isMobile,
        isTablet: !isMobile && isTablet,
        isDesktop: !isMobile && !isTablet
    }
}