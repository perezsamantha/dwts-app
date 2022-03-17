import * as actionType from '../constants/actionTypes';

// initial state from here?

const proReducer = (
    state = {
        pros: [],
        pro: {},
    },
    action
) => {
    switch (action.type) {
        case actionType.PROADD_SUCCESS:
            return { ...state, pros: [...state.pros, action.payload] };
        case actionType.PROUPDATE_SUCCESS:
            return {
                ...state,
                pros: [
                    ...state.pros.map((pro) =>
                        pro.id === action.payload.id ? action.payload : pro
                    ),
                ],
                pro: action.payload.pro,
            };
        case actionType.PROSEARCH_SUCCESS:
            return { ...state, pros: action.payload };
        case actionType.PROFIND_SUCCESS:
            return { ...state, pro: action.payload };
        case actionType.PRODELETE_SUCCESS:
            return {
                ...state,
                pros: state.pros.filter((pro) => pro.id !== action.payload),
            };
        case actionType.PROLIKE_SUCCESS:
            return {
                ...state,
                pro: {
                    ...state.pro,
                    likes:
                        action.payload.type === 'like'
                            ? [...state.pro.likes, action.payload.user]
                            : state.pro.likes.filter(
                                  (like) => like.id !== action.payload.user.id
                              ),
                },
            };

        default:
            return state;
    }
};

export default proReducer;
