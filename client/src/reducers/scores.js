import * as actionType from '../constants/actionTypes';

// initial state from here?

const scoreReducer = (
    state = {
        scores: [],
        score: {},
        likes: 0,
    },
    action
) => {
    switch (action.type) {
        case actionType.SCOREADD_SUCCESS:
            return { ...state, scores: [...state.scores, action.payload] };
        case actionType.SCOREUPDATE_SUCCESS:
            return {
                ...state,
                scores: [
                    ...state.scores.map((score) =>
                        score.id === action.payload.id ? action.payload : score
                    ),
                ],
            };
        case actionType.SCORESEARCH_SUCCESS:
            return {
                ...state,
                scores: action.payload,
            };
        case actionType.SCOREFIND_SUCCESS:
            return { ...state, score: action.payload };
        case actionType.SCOREDELETE_SUCCESS:
            return {
                ...state,
                scores: state.scores.filter(
                    (score) => score.id !== action.payload
                ),
            };

        default:
            return state;
    }
};

export default scoreReducer;
