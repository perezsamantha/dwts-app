import * as actionType from '../constants/actionTypes';
import { initialCelebState } from './initialState';

const celebReducer = (state = initialCelebState, action) => {
    switch (action.type) {
        case actionType.CELEBADD_SUCCESS:
            return { ...state, celebs: [...state.celebs, action.payload] };
        case actionType.CELEBUPDATE_SUCCESS:
            return {
                ...state,
                celebs: [
                    ...state.celebs.map((celeb) =>
                        celeb.id === action.payload.id ? action.payload : celeb
                    ),
                ],
            };
        case actionType.CELEBSEARCH_SUCCESS:
            return { ...state, celebs: action.payload };
        case actionType.CELEBFIND_SUCCESS:
            return { ...state, celeb: action.payload };
        case actionType.CELEBDELETE_SUCCESS:
            return {
                ...state,
                celebs: state.celebs.filter(
                    (celeb) => celeb.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default celebReducer;
