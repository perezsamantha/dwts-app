import * as actionType from '../constants/actionTypes';
//let user = JSON.parse(localStorage.getItem('profile'));
//const initialState = user ? { authData: user } : {};
// TODO: convert to AUTH REQUEST, SUCCESS, FAILURE

const authReducer = (state = { authData: {} }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            // localStorage.setItem(
            //     'profile',
            //     JSON.stringify({ ...action?.data })
            // );

            return { ...state, authData: action.data };
        case actionType.AUTHVERIFY_SUCCESS:
            // localStorage.setItem(
            //     'profile',
            //     JSON.stringify({ ...action?.data })
            // );

            return { ...state, authData: action.payload };
        case actionType.AUTHFETCH_SUCCESS:
            return { ...state, authData: action.payload };
        case actionType.AUTHUPDATE_SUCCESS:
            // localStorage.setItem(
            //     'profile',
            //     JSON.stringify({ ...action.payload })
            // );

            return {
                ...state,
                authData: { ...state.authData, result: action.payload },
            };
        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            //localStorage.clear();
            // TODO: clear/remove cookie? or set it with date from past in new backend logout controller

            //return { ...state, authData: null };
            return {};
        default:
            return state;
    }
};

export default authReducer;
