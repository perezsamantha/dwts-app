import * as actionType from '../constants/actionTypes';

// initial state from here?

const teamReducer = (
    state = {
        teams: [],
        team: {},
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
                team: { ...state.team, likes: action.payload },
            };

        default:
            return state;
    }
};

export default teamReducer;
