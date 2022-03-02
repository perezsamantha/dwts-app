import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getDancerData } from './multipleActions';

export const addDancer = (dancer) => async (dispatch) => {
    dispatch({ type: actionType.DANCERADD_REQUEST });

    try {
        const { data } = await api.addDancer(dancer);

        dispatch({ type: actionType.DANCERADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCERADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateDancer = (id, dancer) => async (dispatch) => {
    dispatch({ type: actionType.DANCERUPDATE_REQUEST });

    try {
        const { data } = await api.updateDancer(id, dancer);

        dispatch({ type: actionType.DANCERUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCERUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findDancerById = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCERFIND_REQUEST });

    try {
        const { data } = await api.findDancerById(id);

        dispatch({ type: actionType.DANCERFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.DANCERFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchDancers = () => async (dispatch) => {
    dispatch({ type: actionType.DANCERSEARCH_REQUEST });

    try {
        const { data } = await api.fetchDancers();

        Promise.resolve(dispatch(getDancerData())).then(() =>
            dispatch({
                type: actionType.DANCERSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.DANCERSEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.DANCERSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteDancer = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCERDELETE_REQUEST });

    try {
        await await api.deleteDancer(id);

        dispatch({ type: actionType.DANCERDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.DANCERDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
