import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addJudge = (judge) => async (dispatch) => {
    dispatch({ type: actionType.JUDGEADD_REQUEST });
    
    try {
        const { data } = await api.addJudge(judge);

        dispatch({ type: actionType.JUDGEADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.JUDGEADD_FAILURE, payload: error, error: true });
    }
}

export const findJudgeById = (id) => async (dispatch) => {
    dispatch({ type: actionType.JUDGEFIND_REQUEST });
    
    try {
        const { data } = await api.findJudgeById(id);

        dispatch({ type: actionType.JUDGEFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.JUDGEFIND_FAILURE, payload: error, error: true });
    }
}

export const fetchJudges = () => async (dispatch) => {
    dispatch({ type: actionType.JUDGESEARCH_REQUEST });

    try {
        const { data } = await api.fetchJudges();

        dispatch({ type: actionType.JUDGESEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.JUDGESEARCH_FAILURE, payload: error, error: true });
    }
}

export const updateJudge = (id, judge) => async (dispatch) => {
    dispatch({ type: actionType.JUDGEUPDATE_REQUEST });
    
    try {
        const { data } = await api.updateJudge(id, judge);

        dispatch({ type: actionType.JUDGEUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.JUDGEUPDATE_FAILURE, payload: error, error: true });
    }
}

export const deleteJudge = (id) => async (dispatch) => {
    dispatch({ type: actionType.JUDGEDELETE_REQUEST });
    
    try {
        await await api.deleteJudge(id);

        dispatch({ type: actionType.JUDGEDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionType.JUDGEDELETE_FAILURE, payload: error, error: true });
    }
}