import * as actionType from '../constants/actionTypes';
import { initialAuthState } from './initialState';

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                initialAuth: action.payload.message
                    ? state.initialAuth
                    : action.payload,
            };
        case actionType.AUTHVERIFY_SUCCESS:
            return {
                ...state,
                authData: action.payload,
                initialAuth: action.payload.message
                    ? state.initialAuth
                    : action.payload,
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
            return initialAuthState;
        default:
            return state;
    }
};

export default authReducer;
