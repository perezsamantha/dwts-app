import * as actionType from '../constants/actionTypes';

const judgesReducer = (state = { judges: [], judge: null }, action) => {
    switch (action.type) {
        case actionType.JUDGEADD_SUCCESS:
            return { ...state, judges: [...state.judges, action.payload] };
        case actionType.JUDGEUPDATE_SUCCESS:
            return { ...state, judges: [...state.judges.map(judge => judge.id === action.payload.id ? action.payload : judge)]}
        case actionType.JUDGESEARCH_SUCCESS:
            return { ...state, judges: action.payload };
        case actionType.JUDGEFIND_SUCCESS:
            return { ...state, judge: action.payload };
        case actionType.JUDGEDELETE_SUCCESS:
            return { ...state, judges: state.judges.filter((judge) => judge.id !== action.payload) };
        default:
            return state;
    }
};

export default judgesReducer;