import * as actionType from '../constants/actionTypes';

const likesReducer = (state = {
    pros: [],
    seasons: [],
    teams: [],
    episodes: [],
    dances: [],
}, action) => {
    switch (action.type) {
        case actionType.PROLIKE_SUCCESS:
            return { ...state, pros: action.payload };
        
        default:
            return state;
    }
};

export default likesReducer;