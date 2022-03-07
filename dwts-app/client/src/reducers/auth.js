import * as actionType from '../constants/actionTypes';
let user = JSON.parse(localStorage.getItem('profile'));
const initialState = user ? { authData: user } : {};
// TODO: convert to AUTH REQUEST, SUCCESS, FAILURE

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action?.data })
            );

            return { ...state, authData: action.data };
        case actionType.AUTHVERIFY_SUCCESS:
            // localStorage.setItem(
            //     'profile',
            //     JSON.stringify({ ...action?.data })
            // );

            return { ...state, authData: action.payload };
        case actionType.AUTHUPDATE_SUCCESS:
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action.payload })
            );

            return {
                ...state,
                authData: { ...state.authData.result, result: action.payload },
            };

        case actionType.AUTHDELETE_SUCCESS:
        case actionType.LOGOUT:
            localStorage.clear();

            //return { ...state, authData: null };
            return {};
        default:
            return state;
    }
};

export default authReducer;
