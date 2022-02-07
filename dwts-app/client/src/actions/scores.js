import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addScore = (score) => async (dispatch) => {
    dispatch({ type: actionType.SCOREADD_REQUEST });

    try {
        const { data } = await api.addScore(score);

        dispatch({ type: actionType.SCOREADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.SCOREADD_FAILURE, payload: error, error: true });
    }
}

export const updateScore = (id, score) => async (dispatch) => {
    dispatch({ type: actionType.SCOREUPDATE_REQUEST });

    try {
        const { data } = await api.updateScore(id, score);

        dispatch({ type: actionType.SCOREUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.SCOREUPDATE_FAILURE, payload: error, error: true });
    }
}

export const findScoreById = (id) => async (dispatch) => {
    dispatch({ type: actionType.SCOREFIND_REQUEST });

    try {
        const { data } = await api.findScoreById(id);

        dispatch({ type: actionType.SCOREFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.SCOREFIND_FAILURE, payload: error, error: true });
    }
}

export const fetchScores = () => async (dispatch) => {
    dispatch({ type: actionType.SCORESEARCH_REQUEST });

    try {
        //const { data } = await api.fetchScores();
        const scores = await api.fetchScores();
        const dances = await api.fetchDances();
        const judges = await api.fetchJudges();
        const episodes = await api.fetchEpisodes();
        const seasons = await api.fetchSeasons();

        dispatch({ type: actionType.SCORESEARCH_SUCCESS, payload: { scores: scores.data, dances: dances.data, judges: judges.data, episodes: episodes.data, seasons: seasons.data } });
    } catch (error) {
        dispatch({ type: actionType.SCORESEARCH_FAILURE, payload: error, error: true });
    }
}

export const deleteScore = (id) => async (dispatch) => {
    dispatch({ type: actionType.SCOREDELETE_REQUEST });

    try {
        await await api.deleteScore(id);

        dispatch({ type: actionType.SCOREDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionType.SCOREDELETE_FAILURE, payload: error, error: true });
    }
}