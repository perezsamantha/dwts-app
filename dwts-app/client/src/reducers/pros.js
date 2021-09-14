import * as actionType from '../constants/actionTypes';

const prosReducer = (state = { pros: null, loading: true }, action) => {
    switch(action.type) {
        case actionType.PROADD:
            return {...state, pros: [...state.pros, action.payload]};
        case actionType.PROUPDATE:
            return {...state, pros: action.payload, loading: false};
        case actionType.PROSEARCH:
            return {...state, pros: action.payload, loading: false};
        case actionType.PRODELETE:
            return {...state, pros: state.pros.filter((pro) => pro._id !== action.payload)};
        case actionType.PROLIKE:
            return {...state, pros: action.payload, loading: false};
        default:
            return state;
    }
};

export default prosReducer;