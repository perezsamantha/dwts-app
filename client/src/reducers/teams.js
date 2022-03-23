import * as actionType from '../constants/actionTypes';
import { placements, seasons } from '../constants/dropdowns';

// initial state from here?

const teamReducer = (
    state = {
        teams: [],
        team: {},
        filters: {
            sortBy: 'seasonDesc',
            seasons: [seasons[0], seasons[seasons.length - 1]],
            placements: [placements[0], placements[placements.length - 1]],
            hasPictures: 'false',
            pros: [],
            // minimumDances: 0,
            // minimumTens: 0,
            // minimumPerfects: 0,
            // averageScore: []
            // celebAge ?
            // celebHeight
        },
    },
    action
) => {
    switch (action.type) {
        case actionType.TEAMADD_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case actionType.TEAMUPDATE_SUCCESS:
            return {
                ...state,
                teams: [
                    ...state.teams.map((team) =>
                        team.id === action.payload.id ? action.payload : team
                    ),
                ],
                team: action.payload.team,
            };
        case actionType.TEAMSEARCH_SUCCESS:
            return {
                ...state,
                teams: action.payload,
            };
        case actionType.TEAMFIND_SUCCESS:
            return {
                ...state,
                team: action.payload,
            };
        case actionType.TEAMDELETE_SUCCESS:
            return {
                ...state,
                teams: state.teams.filter((team) => team.id !== action.payload),
            };
        case actionType.TEAMLIKE_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    likes:
                        action.payload.type === 'like'
                            ? [...state.team.likes, action.payload.user]
                            : state.team.likes.filter(
                                  (like) => like.id !== action.payload.user.id
                              ),
                },
            };
        case actionType.TEAMFILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        default:
            return state;
    }
};

export default teamReducer;
