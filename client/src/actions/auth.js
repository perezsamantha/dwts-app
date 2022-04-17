import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData, navigate) => async (dispatch) => {
    dispatch({ type: actionType.AUTH_REQUEST });

    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: actionType.AUTH_SUCCESS, payload: data });

        navigate('/dashboard');
    } catch (error) {
        dispatch({ type: actionType.AUTH_FAILURE, payload: error });
    }
};

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: actionType.AUTH_REQUEST });

    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionType.AUTH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.AUTH_FAILURE, payload: error });
    }
};

export const googleAuth = (formData, navigate) => async (dispatch) => {
    dispatch({ type: actionType.AUTH_REQUEST });

    try {
        const { data } = await api.googleAuth(formData);

        dispatch({ type: actionType.AUTH_SUCCESS, payload: data });

        navigate('/dashboard');
    } catch (error) {
        dispatch({ type: actionType.AUTH_FAILURE, payload: error });
    }
};

export const verifyUser = (token, navigate) => async (dispatch) => {
    dispatch({ type: actionType.AUTHVERIFY_REQUEST });

    try {
        const { data } = await api.verifyUser(token);

        dispatch({ type: actionType.AUTHVERIFY_SUCCESS, payload: data });

        setTimeout(function () {
            navigate('/dashboard');
        }, 5000); // 5 seconds
    } catch (error) {
        dispatch({
            type: actionType.AUTHVERIFY_FAILURE,
            payload: error,
        });
    }
};

export const resendVerification = (formData) => async (dispatch) => {
    dispatch({ type: actionType.AUTH_REQUEST });

    try {
        const { data } = await api.resendVerification(formData);

        dispatch({ type: actionType.AUTH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTH_FAILURE,
            payload: error,
        });
    }
};

export const forgotPassword = (formData) => async (dispatch) => {
    dispatch({ type: actionType.AUTH_REQUEST });

    try {
        const { data } = await api.forgotPassword(formData);

        dispatch({ type: actionType.AUTH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTH_FAILURE,
            payload: error,
        });
    }
};

export const resetPassword =
    (token, formData, navigate) => async (dispatch) => {
        dispatch({ type: actionType.AUTH_REQUEST });

        try {
            const { data } = await api.resetPassword(token, formData);

            dispatch({ type: actionType.AUTH_SUCCESS, payload: data });

            setTimeout(function () {
                navigate('/');
            }, 5000); // 5 seconds
        } catch (error) {
            dispatch({
                type: actionType.AUTH_FAILURE,
                payload: error,
            });
        }
    };

export const fetchInitialAuthData = () => async (dispatch) => {
    dispatch({ type: actionType.INITIALAUTHFETCH_REQUEST });

    try {
        const { data } = await api.fetchAuthData();

        dispatch({ type: actionType.INITIALAUTHFETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.INITIALAUTHFETCH_FAILURE,
            payload: error,
        });
    }
};

export const fetchAuthData = () => async (dispatch) => {
    dispatch({ type: actionType.AUTHFETCH_REQUEST });

    try {
        const { data } = await api.fetchAuthData();

        dispatch({ type: actionType.AUTHFETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTHFETCH_FAILURE,
            payload: error,
        });
    }
};

export const updateAuth = (user) => async (dispatch) => {
    dispatch({ type: actionType.AUTHUPDATE_REQUEST });

    try {
        const { data } = await api.updateAuth(user);

        dispatch({ type: actionType.AUTHUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTHUPDATE_FAILURE,
            payload: error,
        });
    }
};

export const setAuthPic = (image) => async (dispatch) => {
    dispatch({ type: actionType.AUTHUPDATE_REQUEST });

    try {
        const { data } = await api.setAuthPic(image);

        dispatch({ type: actionType.AUTHUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.AUTHUPDATE_FAILURE,
            payload: error,
        });
    }
};

export const deleteAuth = (navigate) => async (dispatch) => {
    dispatch({ type: actionType.AUTHDELETE_REQUEST });

    try {
        await await api.deleteAuth();

        dispatch({ type: actionType.AUTHDELETE_SUCCESS });

        navigate('/');
    } catch (error) {
        dispatch({
            type: actionType.AUTHDELETE_FAILURE,
            payload: error,
        });
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        await api.logout();

        dispatch({ type: actionType.LOGOUT });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
