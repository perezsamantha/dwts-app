import * as actionType from '../constants/actionTypes';

// initial state from here?

const userReducer = (
    state = {
        users: [],
        user: {},
        likes: 0,
    },
    action
) => {
    switch (action.type) {
        case actionType.USERADD_SUCCESS:
            return { ...state, users: [...state.users, action.payload.result] };
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

        default:
            return state;
    }
};

export default userReducer;
