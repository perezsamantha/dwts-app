import * as actionType from '../constants/actionTypes';

export default (teams = [], action) => {
    switch(action.type) {
        case actionType.ADD:
            return [...teams, action.payload];
        case actionType.UPDATE:
            return teams.map((team) => (team._id === action.payload._id ? action.payload : team));
        case actionType.SEARCH:
            return action.payload;
        case actionType.DELETE:
            return teams.filter((team) => team._id !== action.payload);
        default:
            return teams;
    }
}