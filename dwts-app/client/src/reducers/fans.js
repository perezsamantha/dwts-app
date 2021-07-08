import * as actionType from '../constants/actionTypes';

export default (fans = [], action) => {
    switch(action.type) {
        case actionType.SEARCH:
            return action.payload;
        default: 
            return fans;
    }
}