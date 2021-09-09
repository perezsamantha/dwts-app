import * as actionType from '../constants/actionTypes';

const prosReducer = (state = { pros: null, loading: true }, action) => {
    switch(action.type) {
        case actionType.PROADD:
            return {...state, pros: [...state.pros, action.payload]};
        case actionType.PROUPDATE:
            return action.payload;
        case actionType.PROSEARCH:
            return {...state, pros: action.payload, loading: false};
        case actionType.PRODELETE:
            return state.filter((pro) => pro._id !== action.payload);
        case actionType.PROLIKE:
            return action.payload;
        default:
            return state;
    }
};

export default prosReducer;