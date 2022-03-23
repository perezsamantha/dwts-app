import * as actionType from '../constants/actionTypes';

const tourReducer = (
    state = {
        tours: [],
        tourCast: [],
        tour: {},
        castMember: {},
    },
    action
) => {
    switch (action.type) {
        case actionType.TOURADD_SUCCESS:
            return { ...state, tours: [...state.tours, action.payload] };
        case actionType.TOURUPDATE_SUCCESS:
            return {
                ...state,
                tours: [
                    ...state.tours.map((tour) =>
                        tour.id === action.payload.id ? action.payload : tour
                    ),
                ],
            };
        case actionType.TOURSEARCH_SUCCESS:
            return { ...state, tours: action.payload };
        case actionType.TOURFIND_SUCCESS:
            return { ...state, tour: action.payload };
        case actionType.TOURDELETE_SUCCESS:
            return {
                ...state,
                tours: state.tours.filter((tour) => tour.id !== action.payload),
            };
        case actionType.TOURCASTADD_SUCCESS:
            return { ...state, tourCast: [...state.tourCast, action.payload] };
        case actionType.TOURCASTUPDATE_SUCCESS:
            return {
                ...state,
                tourCast: [
                    ...state.tourCast.map((castMember) =>
                        castMember.id === action.payload.id
                            ? action.payload
                            : castMember
                    ),
                ],
            };
        case actionType.TOURCASTSEARCH_SUCCESS:
            return { ...state, tourCast: action.payload };
        case actionType.TOURCASTFIND_SUCCESS:
            return { ...state, castMember: action.payload };
        case actionType.TOURCASTDELETE_SUCCESS:
            return {
                ...state,
                tourCast: state.tourCast.filter(
                    (castMember) => castMember.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default tourReducer;
