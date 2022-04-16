import * as actionType from '../constants/actionTypes';

const authReducer = (
    state = { authData: {}, initialAuth: {}, initialFetching: true },
    action
) => {
    switch (action.type) {
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                initialAuth: action.payload,
            };
        case actionType.AUTHVERIFY_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                initialAuth: action.payload,
            };
        case actionType.INITIALAUTHFETCH_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                initialAuth: action.payload,
                initialFetching: false,
            };
        case actionType.AUTHFETCH_SUCCESS:
            return { ...state, authData: action.payload };
        case actionType.AUTHUPDATE_SUCCESS:
            return {
                ...state,
                authData: action.payload,
            };
        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            return { authData: {} };
        default:
            return state;
    }
};

export default authReducer;
