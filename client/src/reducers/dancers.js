import * as actionType from '../constants/actionTypes';
import { initialDancerState } from './initialState';

const dancerReducer = (state = initialDancerState, action) => {
    switch (action.type) {
        case actionType.DANCERADD_SUCCESS:
            return { ...state, dancers: [...state.dancers, action.payload] };
        case actionType.DANCERUPDATE_SUCCESS:
            return {
                ...state,
                dancers: [
                    ...state.dancers.map((dancer) =>
                        dancer.id === action.payload.id
                            ? action.payload
                            : dancer
                    ),
                ],
            };
        case actionType.DANCERSEARCH_SUCCESS:
            return {
                ...state,
                dancers: action.payload,
            };
        case actionType.DANCERFIND_SUCCESS:
            return { ...state, dancer: action.payload };
        case actionType.DANCERDELETE_SUCCESS:
            return {
                ...state,
                dancers: state.dancers.filter(
                    (dancer) => dancer.id !== action.payload
                ),
            };

        default:
            return state;
    }
};

export default dancerReducer;
