import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getScoreData } from './multipleActions';

export const addScore = (score) => async (dispatch) => {
    dispatch({ type: actionType.SCOREADD_REQUEST });

    try {
        const { data } = await api.addScore(score);

        dispatch({ type: actionType.SCOREADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SCOREADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateScore = (id, score) => async (dispatch) => {
    dispatch({ type: actionType.SCOREUPDATE_REQUEST });

    try {
        const { data } = await api.updateScore(id, score);

        dispatch({ type: actionType.SCOREUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SCOREUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findScoreById = (id) => async (dispatch) => {
    dispatch({ type: actionType.SCOREFIND_REQUEST });

    try {
        const { data } = await api.findScoreById(id);

        dispatch({ type: actionType.SCOREFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SCOREFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchScores = () => async (dispatch) => {
    dispatch({ type: actionType.SCORESEARCH_REQUEST });

    try {
        const { data } = await api.fetchScores();

        Promise.resolve(dispatch(getScoreData())).then(() =>
            dispatch({
                type: actionType.SCORESEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.SCORESEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.SCORESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchScoresWithoutData = () => async (dispatch) => {
    dispatch({ type: actionType.SCORESEARCH_REQUEST });

    try {
        const { data } = await api.fetchScores();

        dispatch({
            type: actionType.SCORESEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionType.SCORESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteScore = (id) => async (dispatch) => {
    dispatch({ type: actionType.SCOREDELETE_REQUEST });

    try {
        await await api.deleteScore(id);

        dispatch({ type: actionType.SCOREDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.SCOREDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setUserScore = (id, value) => async (dispatch) => {
    dispatch({ type: actionType.USERSCORE_REQUEST });

    try {
        const { data } = await api.setUserScore(id, value);

        dispatch({ type: actionType.USERSCORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERSCORE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
