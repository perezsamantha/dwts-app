import * as actionType from '../constants/actionTypes';

const teamsReducer = (state = { teams: [] }, action) => {
    switch (action.type) {
        case actionType.TEAMADD_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case actionType.TEAMUPDATE_SUCCESS:
            return { ...state, teams: action.payload };
        case actionType.TEAMSEARCH_SUCCESS:
            return { ...state, teams: action.payload };
        case actionType.TEAMDELETE_SUCCESS:
            return { ...state, teams: state.teams.filter((team) => team._id !== action.payload) };
        case actionType.TEAMLIKE_SUCCESS:
            return { ...state, teams: action.payload };
        default:
            return state;
    }
};

export default teamsReducer;