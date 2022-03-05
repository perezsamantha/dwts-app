import {
    heightsInInches,
    placements,
    seasons,
    weeks,
} from '../../../constants/dropdowns';

import * as searchType from '../../../constants/searchTypes';

export const initialFilters = (type) => {
    switch (type) {
        case searchType.DANCES:
            return {
                sortBy: 'seasonDesc',
                styles: [],
                seasons: [seasons[0], seasons[seasons.length - 1]],
                //teams: [],
                //pros: [] will be more difficult
                hasPictures: 'false',
                weeks: [weeks[0], weeks[weeks.length - 1]],
                // finale ? because week 1 is always premiere but finale week # differs
                // score,
                runningOrders: [
                    placements[0],
                    placements[placements.length - 1],
                ], //convert to ro
                themes: [],
                hasLink: 'false',
                //scores: []
            };
        case searchType.TEAMS:
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
        case searchType.PROS:
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
