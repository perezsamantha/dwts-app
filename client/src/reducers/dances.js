import * as actionType from '../constants/actionTypes';
import { initialDanceState } from './initialState';

const danceReducer = (state = initialDanceState, action) => {
    switch (action.type) {
        case actionType.DANCEADD_SUCCESS:
            return { ...state, dances: [...state.dances, action.payload] };
        case actionType.DANCEUPDATE_SUCCESS:
            return {
                ...state,
                dances: [
                    ...state.dances.map((dance) =>
                        dance.id === action.payload.id ? action.payload : dance
                    ),
                ],
                dance: action.payload.dance
                    ? action.payload.dance
                    : state.dance,
            };
        case actionType.DANCESEARCH_SUCCESS:
            return {
                ...state,
                dances: action.payload,
            };
        case actionType.DANCEFIND_SUCCESS:
            return {
                ...state,
                dance: action.payload,
            };
        case actionType.DANCEDELETE_SUCCESS:
            return {
                ...state,
                dances: state.dances.filter(
                    (dance) => dance.id !== action.payload
                ),
            };
        case actionType.DANCELIKE_SUCCESS:
            // return {
            //     ...state,
            //     dance: { ...state.dance, likes: action.payload },
            // };
            return {
                ...state,
                dance: {
                    ...state.dance,
                    likes:
                        action.payload.type === 'like'
                            ? [...state.dance.likes, action.payload.user]
                            : state.dance.likes.filter(
                                  (like) => like.id !== action.payload.user.id
                              ),
                },
            };
        case actionType.DANCEFILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case actionType.USERSCORE_SUCCESS:
            return {
                ...state,
                dance: {
                    ...state.dance,
                    user_score: action.payload.value,
                },
            };
        default:
            return state;
    }
};

export default danceReducer;
