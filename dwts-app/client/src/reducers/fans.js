import * as actionType from '../constants/actionTypes';

const fansReducer = (fans = [], action) => {
    switch(action.type) {
        case actionType.SEARCH:
            return action.payload;
        default: 
            return fans;
    }
};

export default fansReducer;