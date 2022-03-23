import * as actionType from '../constants/actionTypes';
import { placements, seasons, weeks } from '../constants/dropdowns';

const danceReducer = (
    state = {
        dances: [],
        dance: {},
        filters: {
            sortBy: 'seasonDesc',
            styles: [],
            seasons: [seasons[0], seasons[seasons.length - 1]],
            //teams: [],
            //pros: [] will be more difficult
            hasPictures: 'false',
            weeks: [weeks[0], weeks[weeks.length - 1]],
            // finale ? because week 1 is always premiere but finale week # differs
            // score,
            runningOrders: [placements[0], placements[placements.length - 1]], //convert to ro
            themes: [],
            hasLink: 'false',
            //scores: []
        },
    },
    action
) => {
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
                dance: action.payload.dance,
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
        default:
            return state;
    }
};

export default danceReducer;
