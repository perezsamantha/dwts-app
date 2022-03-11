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
                authData: { ...state.authData, result: action.payload },
            };
        case actionType.TEAMLIKE_SUCCESS:
            return {
                ...state,
                authData: {
                    ...state.authData,
                    result: {
                        ...state.authData.result,
                        likes: {
                            ...state.authData.result.likes,
                            teams: action.payload.isLike
                                ? [
                                      ...state.authData.result.likes.teams,
                                      action.payload.team,
                                  ]
                                : state.authData.result.likes.teams.filter(
                                      (team) =>
                                          team.id !== action.payload.team.id
                                  ),
                            //teams: state.authData.result.likes.teams.filter((team) => team.id !== action.payload.id)
                        },
                    },
                },
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
