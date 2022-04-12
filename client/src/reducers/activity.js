import * as actionType from '../constants/actionTypes';
import { initialActivityState } from './initialState';

const activityReducer = (state = initialActivityState, action) => {
    switch (action.type) {
        case actionType.RECENTLIKES_SUCCESS:
            return { ...state, likes: action.payload };
        default:
            return state;
    }
};

export default activityReducer;
