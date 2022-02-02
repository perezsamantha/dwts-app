import * as actionType from '../constants/actionTypes';

const prosReducer = (state = { pros: [], pro: null }, action) => {
    switch (action.type) {
        case actionType.PROADD_SUCCESS:
            return { ...state, pros: [...state.pros, action.payload] };
        case actionType.PROUPDATE_SUCCESS:
            return { ...state, pros: [...state.pros.map(pro => pro.id === action.payload.id ? action.payload : pro)]}
            // return { ...state, pros: action.payload };
        case actionType.PROSEARCH_SUCCESS:
            return { ...state, pros: action.payload };
        case actionType.PROFIND_SUCCESS:
            return { ...state, pro: action.payload };
        case actionType.PRODELETE_SUCCESS:
            return { ...state, pros: state.pros.filter((pro) => pro.id !== action.payload) };
        default:
            return state;
    }
};

export default prosReducer;