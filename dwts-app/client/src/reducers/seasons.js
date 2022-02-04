import * as actionType from '../constants/actionTypes';

const seasonsReducer = (state = { seasons: [], season: null }, action) => {
    switch (action.type) {
        case actionType.SEASONADD_SUCCESS:
            return { ...state, seasons: [...state.seasons, action.payload] };
        case actionType.SEASONUPDATE_SUCCESS:
            return { ...state, seasons: [...state.seasons.map(season => season.id === action.payload.id ? action.payload : season)]}
        case actionType.SEASONSEARCH_SUCCESS:
            return { ...state, seasons: action.payload };
        case actionType.SEASONFIND_SUCCESS:
            return { ...state, season: action.payload };
        case actionType.SEASONDELETE_SUCCESS:
            return { ...state, seasons: state.seasons.filter((season) => season.id !== action.payload) };
        default:
            return state;
    }
};

export default seasonsReducer;