const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 2000 },
        items: 5,
        partialVisibilityGutter: 30
    },
    laptop: {
        breakpoint: { max: 2000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 0
    },
    largeTablet: {
        breakpoint: { max: 1024, min: 870 },
        items: 4,
        partialVisibilityGutter: 30
    },
    anotherTablet: {
        breakpoint: { max: 870, min: 750 },
        items: 4,
        partialVisibilityGutter: 0
    },
    tablet: {
        breakpoint: { max: 750, min: 625 },
        items: 3,
        partialVisibilityGutter: 20
    },
    smallTablet: {
        breakpoint: { max: 625, min: 464 },
        items: 3,
        partialVisibilityGutter: 0
    },
    mobile: {
        breakpoint: { max: 464, min: 410 },
        items: 2,
        partialVisibilityGutter: 20
    },
    smallMobile: {
        breakpoint: { max: 410, min: 350 },
        items: 2,
        partialVisibilityGutter: 0
    },
    extraSmallMobile: {
        breakpoint: { max: 350, min: 300 },
        items: 1,
        partialVisibilityGutter: 100
    },
    tinyMobile: {
        breakpoint: { max: 280, min: 0 },
        items: 1,
        partialVisibilityGutter: 60
    },
};

export default responsive;