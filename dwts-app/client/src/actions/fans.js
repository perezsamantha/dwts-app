import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getUserData } from './multipleActions';

export const addUser = (user) => async (dispatch) => {
    dispatch({ type: actionType.USERADD_REQUEST });

    try {
        const { data } = await api.signUp(user);

        dispatch({ type: actionType.USERADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findUserById = (id) => async (dispatch) => {
    dispatch({ type: actionType.USERFIND_REQUEST });

    try {
        const { data } = await api.findUserById(id);

        dispatch({ type: actionType.USERFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: actionType.USERSEARCH_REQUEST });

    try {
        const { data } = await api.fetchUsers();

        Promise.resolve(dispatch(getUserData())).then(() =>
            dispatch({
                type: actionType.USERSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.USERSEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.USERSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const searchUsers = (input) => async (dispatch) => {
    dispatch({ type: actionType.USERSEARCH_REQUEST });

    try {
        const { data } = await api.searchUsers(input);

        dispatch({ type: actionType.USERSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    dispatch({ type: actionType.USERUPDATE_REQUEST });

    try {
        const { data } = await api.updateUser(id, user);

        dispatch({ type: actionType.USERUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setUserPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.USERUPDATE_REQUEST });

    try {
        const { data } = await api.setUserPic(id, image);

        dispatch({ type: actionType.USERUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.USERUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: actionType.USERDELETE_REQUEST });

    try {
        await await api.deleteUser(id);

        dispatch({ type: actionType.USERDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.USERDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
