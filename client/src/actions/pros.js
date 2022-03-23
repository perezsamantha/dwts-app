import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addPro = (pro) => async (dispatch) => {
    dispatch({ type: actionType.PROADD_REQUEST });

    try {
        const { data } = await api.addPro(pro);

        dispatch({ type: actionType.PROADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findProById = (id) => async (dispatch) => {
    dispatch({ type: actionType.PROFIND_REQUEST });

    try {
        const { data } = await api.findProById(id);

        dispatch({ type: actionType.PROFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchPros = () => async (dispatch) => {
    dispatch({ type: actionType.PROSEARCH_REQUEST });

    try {
        const { data } = await api.fetchPros();

        dispatch({ type: actionType.PROSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const searchPros = (input) => async (dispatch) => {
    dispatch({ type: actionType.PROSEARCH_REQUEST });

    try {
        const { data } = await api.searchPros(input);

        dispatch({ type: actionType.PROSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updatePro = (id, pro) => async (dispatch) => {
    dispatch({ type: actionType.PROUPDATE_REQUEST });

    try {
        const { data } = await api.updatePro(id, pro);

        dispatch({ type: actionType.PROUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setProPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.PROUPDATE_REQUEST });

    try {
        const { data } = await api.setProPic(id, image);

        dispatch({ type: actionType.PROUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deletePro = (id) => async (dispatch) => {
    dispatch({ type: actionType.PRODELETE_REQUEST });

    try {
        await await api.deletePro(id);

        dispatch({ type: actionType.PRODELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.PRODELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const addProPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.PROUPDATE_REQUEST });

    try {
        const { data } = await api.addProPic(id, image);

        dispatch({
            type: actionType.PROUPDATE_SUCCESS,
            payload: { pro: data },
        });
    } catch (error) {
        dispatch({
            type: actionType.PROUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const likePro = (id) => async (dispatch) => {
    dispatch({ type: actionType.PROLIKE_REQUEST });

    try {
        const { data } = await api.likePro(id);

        dispatch({ type: actionType.PROLIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.PROLIKE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
