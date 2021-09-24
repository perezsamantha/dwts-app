import * as actionType from '../constants/actionTypes';

const dancesReducer = (state = { dances: [] }, action) => {
    switch(action.type) {
        case actionType.DANCEADD_SUCCESS:
            return {...state, dances: [...state.dances, action.payload]};
        case actionType.DANCEUPDATE_SUCCESS:
            return {...state, dances: action.payload, loading: false};
        case actionType.DANCESEARCH_SUCCESS:
            return {...state, dances: action.payload, loading: false};
        case actionType.DANCEDELETE_SUCCESS:
            return {...state, dances: state.dances.filter((dance) => dance._id !== action.payload)};
        case actionType.DANCELIKE_SUCCESS:
            return {...state, dances: action.payload, loading: false};
        default:
            return state;
    }
};

export default dancesReducer;