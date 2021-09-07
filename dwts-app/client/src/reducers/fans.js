import * as actionType from '../constants/actionTypes';

const fansReducer = (state = { fans: null, loading: true }, action) => {
    switch(action.type) {
        case actionType.FANSEARCH:
            return {...state, fans: action.payload, loading: false};
        default: 
            return state;
    }
};

export default fansReducer;