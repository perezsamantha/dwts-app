import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data };
        case actionType.AUTHUPDATE_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            
            return { ...state, authData: { ...state.authData.result, result: action.payload } }
        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;