import * as actionType from '../constants/actionTypes';

const teamsReducer = (teams = [], action) => {
    switch(action.type) {
        case actionType.ADD:
            return [...teams, action.payload];
        case actionType.UPDATE:
            //return teams.map((team) => (team._id === action.payload._id ? action.payload : team));
            return action.payload;
        case actionType.SEARCH:
            return action.payload;
        case actionType.DELETE:
            return teams.filter((team) => team._id !== action.payload);
        case actionType.LIKE:
            //return teams.map((team) => (team._id === action.payload._id ? action.payload : team))
            return action.payload;
        default:
            return teams;
    }
};

export default teamsReducer;