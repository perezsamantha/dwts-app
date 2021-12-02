import * as actionType from '../constants/actionTypes';

const celebsReducer = (state = { celebs: [] }, action) => {
    switch (action.type) {
        case actionType.CELEBADD_SUCCESS:
            return { ...state, celebs: [...state.celebs, action.payload] };
        case actionType.CELEBUPDATE_SUCCESS:
            return { ...state, celebs: action.payload };
        case actionType.CELEBSEARCH_SUCCESS:
            return { ...state, celebs: action.payload };
        case actionType.CELEBDELETE_SUCCESS:
            return { ...state, celebs: state.celebs.filter((celeb) => celeb.id !== action.payload) };
        default:
            return state;
    }
};

export default celebsReducer;