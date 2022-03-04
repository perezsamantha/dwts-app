import { heightsInInches } from '../../../constants/dropdowns';

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
                sortBy: 'firstName',
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
            };
        default:
            return {};
    }
};
