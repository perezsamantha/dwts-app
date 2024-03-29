import * as actionType from '../constants/actionTypes';
import { initialUserState } from './initialState';

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionType.USERADD_SUCCESS:
            return { ...state, users: [...state.users, action.payload] };
        case actionType.USERUPDATE_SUCCESS:
            return {
                ...state,
                users: [
                    ...state.users.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    ),
                ],
            };
        case actionType.USERSEARCH_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case actionType.USERFIND_SUCCESS:
            return { ...state, user: action.payload };
        case actionType.USERDELETE_SUCCESS:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        case actionType.FANFILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
