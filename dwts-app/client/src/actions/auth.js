//import { AUTH } from '../constants/actionTypes';
import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: actionType.AUTH, data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionType.AUTH, data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    dispatch({ type: actionType.AUTHUPDATE_REQUEST });

    try {
        const { data } = await api.updateUser(id, user);

        dispatch({ type: actionType.AUTHUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTHUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setUserPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.AUTHUPDATE_REQUEST });

    try {
        const { data } = await api.setUserPic(id, image);

        dispatch({ type: actionType.AUTHUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTHUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: actionType.AUTHDELETE_REQUEST });

    try {
        await await api.deleteUser(id);

        dispatch({ type: actionType.AUTHDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.AUTHDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
