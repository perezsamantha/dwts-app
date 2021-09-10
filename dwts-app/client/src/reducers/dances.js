import * as actionType from '../constants/actionTypes';

const dancesReducer = (state = { dances: null, loading: true }, action) => {
    switch(action.type) {
        case actionType.DANCEADD:
            return {...state, dances: [...state.dances, action.payload]};
        case actionType.DANCEUPDATE:
            return {...state, dances: action.payload, loading: false};
        case actionType.DANCESEARCH:
            return {...state, dances: action.payload, loading: false};
        case actionType.DANCEDELETE:
            return {...state, dances: state.dances.filter((dance) => dance._id !== action.payload)};
        case actionType.DANCELIKE:
            return {...state, dances: action.payload, loading: false};
        default:
            return state;
    }
};

export default dancesReducer;