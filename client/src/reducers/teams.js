import * as actionType from '../constants/actionTypes';
import { initialTeamState } from './initialState';

const teamReducer = (state = initialTeamState, action) => {
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
