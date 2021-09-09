import * as actionType from '../constants/actionTypes';

const teamsReducer = (state = { teams: null, loading: true }, action) => {
    switch(action.type) {
        case actionType.TEAMADD:
            return {...state, teams: [...state.teams, action.payload]};
        case actionType.TEAMUPDATE:
            //return teams.map((team) => (team._id === action.payload._id ? action.payload : team));
            return {...state, teams: action.payload, loading: false};
        case actionType.TEAMSEARCH:
            return {...state, teams: action.payload, loading: false};
        case actionType.TEAMDELETE:
            return state.filter((team) => team._id !== action.payload);
        case actionType.TEAMLIKE:
            //return teams.map((team) => (team._id === action.payload._id ? action.payload : team))
            return {...state, teams: action.payload, loading: false};
        default:
            return state;
    }
};

export default teamsReducer;