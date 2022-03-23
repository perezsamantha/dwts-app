import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getDanceData } from './multipleActions';

export const addDance = (dance) => async (dispatch) => {
    dispatch({ type: actionType.DANCEADD_REQUEST });

    try {
        const { data } = await api.addDance(dance);

        dispatch({ type: actionType.DANCEADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCEADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateDance = (id, dance) => async (dispatch) => {
    dispatch({ type: actionType.DANCEUPDATE_REQUEST });

    try {
        const { data } = await api.updateDance(id, dance);

        dispatch({ type: actionType.DANCEUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCEUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchDances = () => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const { data } = await api.fetchDances();

        Promise.resolve(dispatch(getDanceData())).then(() =>
            dispatch({
                type: actionType.DANCESEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.DANCESEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.DANCESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchDancesWithoutData = () => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const { data } = await api.fetchDances();

        dispatch({
            type: actionType.DANCESEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionType.DANCESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findDanceById = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCEFIND_REQUEST });

    try {
        const { data } = await api.findDanceById(id);

        // Promise.resolve(dispatch(getDanceData())).then(() =>
        //     dispatch({
        //         type: actionType.DANCEFIND_SUCCESS,
        //         payload: data,
        //     })
        // );

        dispatch({
            type: actionType.DANCEFIND_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionType.DANCEFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const searchDances = (input) => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const { data } = await api.searchDances(input);

        Promise.resolve(dispatch(getDanceData())).then(() =>
            dispatch({
                type: actionType.DANCESEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.DANCESEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.DANCESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteDance = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCEDELETE_REQUEST });

    try {
        await await api.deleteDance(id);

        dispatch({ type: actionType.DANCEDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.DANCEDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const addDancePic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.DANCEUPDATE_REQUEST });

    try {
        const { data } = await api.addDancePic(id, image);

        dispatch({
            type: actionType.DANCEUPDATE_SUCCESS,
            payload: { dance: data },
        });
    } catch (error) {
        dispatch({
            type: actionType.DANCEUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const likeDance = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCELIKE_REQUEST });

    try {
        const { data } = await api.likeDance(id);

        dispatch({ type: actionType.DANCELIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCELIKE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
