import * as actionType from '../constants/actionTypes';

const prosReducer = (state = { pros: [] }, action) => {
    switch (action.type) {
        case "PROADD_SUCCESS":
            return { ...state, pros: [...state.pros, action.payload] };
        case "PROUPDATE_SUCCESS":
            return { ...state, pros: action.payload };
        case 'PROSEARCH_SUCCESS':
            return { ...state, pros: action.payload };
        case "PRODELETE_SUCCESS":
            return { ...state, pros: state.pros.filter((pro) => pro._id !== action.payload) };
        case "PROLIKE_SUCCESS":
            return { ...state, pros: action.payload };
        default:
            return state;
    }
};

export default prosReducer;