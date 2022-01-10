import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addCeleb = (celeb) => async (dispatch) => {
    dispatch({ type: actionType.CELEBADD_REQUEST });

    try {
        const { data } = await api.addCeleb(celeb);

        dispatch({ type: actionType.CELEBADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.CELEBADD_FAILURE, payload: error, error: true });
    }
}

export const updateCeleb = (id, celeb) => async (dispatch) => {
    dispatch({ type: actionType.CELEBUPDATE_REQUEST });

    try {
        const { data } = await api.updateCeleb(id, celeb);

        dispatch({ type: actionType.CELEBUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.CELEBUPDATE_FAILURE, payload: error, error: true });
    }
}

export const setCelebPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.CELEBUPDATE_REQUEST });

    try {
        const { data } = await api.updatePic(id, image);

        dispatch({ type: actionType.CELEBUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.CELEBUPDATE_FAILURE, payload: error, error: true });
    }
}

export const findCelebById = (id) => async (dispatch) => {
    dispatch({ type: actionType.CELEBFIND_REQUEST });

    try {
        const { data } = await api.findCelebById(id);

        dispatch({ type: actionType.CELEBFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.CELEBFIND_FAILURE, payload: error, error: true });
    }
}

export const fetchCelebs = () => async (dispatch) => {
    dispatch({ type: actionType.CELEBSEARCH_REQUEST });

    try {
        const { data } = await api.fetchCelebs();

        dispatch({ type: actionType.CELEBSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.CELEBSEARCH_FAILURE, payload: error, error: true });
    }
}

export const deleteCeleb = (id) => async (dispatch) => {
    dispatch({ type: actionType.CELEBDELETE_REQUEST });

    try {
        await await api.deleteCeleb(id);

        dispatch({ type: actionType.CELEBDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionType.CELEBDELETE_FAILURE, payload: error, error: true });
    }
}
