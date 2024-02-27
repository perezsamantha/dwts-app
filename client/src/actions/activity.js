import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const fetchRecentLikes = () => async (dispatch) => {
    dispatch({ type: actionType.RECENTLIKES_REQUEST });

    try {
        const { data } = await api.fetchRecentLikes();

        dispatch({ type: actionType.RECENTLIKES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.RECENTLIKES_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchRecentScores = () => async (dispatch) => {
    dispatch({ type: actionType.RECENTSCORES_REQUEST });

    try {
        const { data } = await api.fetchRecentScores();

        dispatch({ type: actionType.RECENTSCORES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.RECENTSCORES_FAILURE,
            payload: error,
            error: true,
        });
    }
};
