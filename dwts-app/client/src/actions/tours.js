import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getTourCastData, getTourData } from './multipleActions';

export const addTour = (tour) => async (dispatch) => {
    dispatch({ type: actionType.TOURADD_REQUEST });

    try {
        const { data } = await api.addTour(tour);

        dispatch({ type: actionType.TOURADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchTours = () => async (dispatch) => {
    dispatch({ type: actionType.TOURSEARCH_REQUEST });

    try {
        const { data } = await api.fetchTours();

        Promise.resolve(dispatch(getTourData())).then(() =>
            dispatch({
                type: actionType.TOURSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({ type: actionType.TOURSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findTourById = (id) => async (dispatch) => {
    dispatch({ type: actionType.TOURFIND_REQUEST });

    try {
        const { data } = await api.findTourById(id);

        Promise.resolve(dispatch(getTourData())).then(() =>
            dispatch({
                type: actionType.TOURFIND_SUCCESS,
                payload: data,
            })
        );

        // dispatch({ type: actionType.TOURFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateTour = (id, tour) => async (dispatch) => {
    dispatch({ type: actionType.TOURUPDATE_REQUEST });

    try {
        const { data } = await api.updateTour(id, tour);

        dispatch({ type: actionType.TOURUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setTourPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.TOURUPDATE_REQUEST });

    try {
        const { data } = await api.setTourPic(id, image);

        dispatch({ type: actionType.TOURUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteTour = (id) => async (dispatch) => {
    dispatch({ type: actionType.TOURDELETE_REQUEST });

    try {
        await await api.deleteTour(id);

        dispatch({ type: actionType.TOURDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.TOURDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

// tour cast actions below

export const addTourCast = (cast) => async (dispatch) => {
    dispatch({ type: actionType.TOURCASTADD_REQUEST });

    try {
        const { data } = await api.addTourCast(cast);

        dispatch({ type: actionType.TOURCASTADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURCASTADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchTourCast = () => async (dispatch) => {
    dispatch({ type: actionType.TOURCASTSEARCH_REQUEST });

    try {
        const { data } = await api.fetchTourCast();

        Promise.resolve(dispatch(getTourCastData())).then(() =>
            dispatch({
                type: actionType.TOURCASTSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({ type: actionType.TOURCASTSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURCASTSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findTourCastById = (id) => async (dispatch) => {
    dispatch({ type: actionType.TOURCASTFIND_REQUEST });

    try {
        const { data } = await api.findTourCastById(id);

        Promise.resolve(dispatch(getTourCastData())).then(() =>
            dispatch({
                type: actionType.TOURCASTFIND_SUCCESS,
                payload: data,
            })
        );

        // dispatch({ type: actionType.TOURCASTFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURCASTFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateTourCast = (id, cast) => async (dispatch) => {
    dispatch({ type: actionType.TOURCASTUPDATE_REQUEST });

    try {
        const { data } = await api.updateTourCast(id, cast);

        dispatch({ type: actionType.TOURCASTUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TOURCASTUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteTourCast = (id) => async (dispatch) => {
    dispatch({ type: actionType.TOURCASTDELETE_REQUEST });

    try {
        await await api.deleteTourCast(id);

        dispatch({ type: actionType.TOURCASTDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.TOURCASTDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
