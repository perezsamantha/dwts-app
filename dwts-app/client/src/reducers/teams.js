// import * as actionType from '../constants/actionTypes';

// const teamsReducer = (state = { teams: [] }, action) => {
//     switch (action.type) {
//         case actionType.TEAMADD_SUCCESS:
//             return { ...state, teams: [...state.teams, action.payload] };
//         case actionType.TEAMUPDATE_SUCCESS:
//             return { ...state, teams: action.payload };
//         case actionType.TEAMSEARCH_SUCCESS:
//             return { ...state, teams: action.payload };
//         case actionType.TEAMDELETE_SUCCESS:
//             return { ...state, teams: state.teams.filter((team) => team._id !== action.payload) };
//         case actionType.TEAMLIKE_SUCCESS:
//             return { ...state, teams: action.payload };
//         default:
//             return state;
//     }
// };

// export default teamsReducer;

import * as actionType from '../constants/actionTypes';

// initial state from here?

const teamsReducer = (state = { teams: [], team: null, celebs: null, pros: null }, action) => {
    switch (action.type) {
        case actionType.TEAMADD_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case actionType.TEAMUPDATE_SUCCESS:
            return { ...state, teams: [...state.teams.map(team => team.id === action.payload.id ? action.payload : team)] }
        // return { ...state, teams: action.payload };
        case actionType.TEAMSEARCH_SUCCESS:
            return { ...state, teams: action.payload };
        case actionType.TEAMFIND_SUCCESS:
            return { ...state, team: action.payload };
        case actionType.TEAMDELETE_SUCCESS:
            return { ...state, teams: state.teams.filter((team) => team.id !== action.payload) };
        case actionType.TEAMITEMS_SUCCESS:
            return { ...state, teams: action.payload.teams, celebs: action.payload.celebs, pros: action.payload.pros };
        default:
            return state;
    }
};

export default teamsReducer;