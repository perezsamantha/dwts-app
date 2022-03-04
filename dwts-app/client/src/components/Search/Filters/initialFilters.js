import {
    heightsInInches,
    placements,
    seasons,
} from '../../../constants/dropdowns';

export const initialFilters = (type) => {
    switch (type) {
        case '/search/dances':
            return {
                sortBy: 'firstName',
                styles: [],
                seasons: [1, 30],
            };
        case '/search/teams':
            return {
                sortBy: 'seasonDesc',
                seasons: [seasons[0], seasons[seasons.length - 1]],
                placements: [placements[0], placements[placements.length - 1]],
                hasPictures: 'false',
                pros: [],
                // minimumDances: 0,
                // minimumTens: 0,
                // minimumPerfects: 0,
                // averageScore: []
                // celebAge ?
                // celebHeight
            };
        case '/search/pros':
            return {
                sortBy: 'firstName',
                age: [0, 100],
                height: [
                    heightsInInches[0],
                    heightsInInches[heightsInInches.length - 1],
                ],
                gender: ['Male', 'Female'],
                showJuniors: false,
                // hasPictures
            };
        default:
            return {};
    }
};
