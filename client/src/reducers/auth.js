import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: {}, fetching: true }, action) => {
    switch (action.type) {
        case actionType.AUTH_SUCCESS:
            return { ...state, authData: action.payload };
        case actionType.AUTHVERIFY_SUCCESS:
            return { ...state, authData: action.payload };
        case actionType.AUTHFETCH_SUCCESS:
            return { ...state, authData: action.payload, fetching: false };
        case actionType.AUTHUPDATE_SUCCESS:
            return {
                ...state,
                authData: action.payload,
            };
        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            //localStorage.clear();
            return { authData: {} };
        default:
            return state;
    }
};

export default authReducer;
