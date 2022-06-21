import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addPoll = (poll) => async (dispatch) => {
    dispatch({ type: actionType.POLLADD_REQUEST });

    try {
        const { data } = await api.addPoll(poll);

        dispatch({ type: actionType.POLLADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.POLLADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const addPollOption = (option) => async (dispatch) => {
    dispatch({ type: actionType.OPTIONADD_REQUEST });

    try {
        const { data } = await api.addPollOption(option);

        dispatch({ type: actionType.OPTIONADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.OPTIONADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchPolls = () => async (dispatch) => {
    dispatch({ type: actionType.POLLSEARCH_REQUEST });

    try {
        const { data } = await api.fetchPolls();

        dispatch({ type: actionType.POLLSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.POLLSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deletePoll = (id) => async (dispatch) => {
    dispatch({ type: actionType.POLLDELETE_REQUEST });

    try {
        await await api.deletePoll(id);

        dispatch({ type: actionType.POLLDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.POLLDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deletePollOption = (id, poll_id) => async (dispatch) => {
    dispatch({ type: actionType.OPTIONDELETE_REQUEST });

    try {
        await await api.deletePollOption(id);

        dispatch({
            type: actionType.OPTIONDELETE_SUCCESS,
            payload: { id: id, poll_id: poll_id },
        });
    } catch (error) {
        dispatch({
            type: actionType.OPTIONDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const voteOption = (id, poll_id) => async (dispatch) => {
    dispatch({ type: actionType.POLLVOTE_REQUEST });

    try {
        const { data } = await api.voteOption(id);

        dispatch({
            type: actionType.POLLVOTE_SUCCESS,
            payload: { id, poll_id, user_id: data.user_id },
        });
    } catch (error) {
        dispatch({
            type: actionType.POLLVOTE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
