import * as actionType from '../constants/actionTypes';
//let user = JSON.parse(localStorage.getItem('profile'));
//const initialState = user ? { authData: user } : {};
// TODO: convert to AUTH REQUEST, SUCCESS, FAILURE

const authReducer = (state = { authData: {}, fetching: true }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            return { ...state, authData: action.data };
        case actionType.AUTHVERIFY_SUCCESS:
            return { ...state, authData: action.payload };
        case actionType.AUTHFETCH_SUCCESS:
            return { ...state, authData: action.payload, fetching: false };
        case actionType.AUTHUPDATE_SUCCESS:
            return {
                ...state,
                authData: { ...state.authData, result: action.payload },
            };
        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            localStorage.clear();
            return { authData: {} };
        default:
            return state;
    }
};

export default authReducer;
