import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getEpisodeData } from './multipleActions';

export const addEpisode = (episode) => async (dispatch) => {
    dispatch({ type: actionType.EPISODEADD_REQUEST });

    try {
        const { data } = await api.addEpisode(episode);

        dispatch({ type: actionType.EPISODEADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.EPISODEADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateEpisode = (id, episode) => async (dispatch) => {
    dispatch({ type: actionType.EPISODEUPDATE_REQUEST });

    try {
        const { data } = await api.updateEpisode(id, episode);

        dispatch({ type: actionType.EPISODEUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.EPISODEUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findEpisodeById = (id) => async (dispatch) => {
    dispatch({ type: actionType.EPISODEFIND_REQUEST });

    try {
        const { data } = await api.findEpisodeById(id);

        Promise.resolve(dispatch(getEpisodeData())).then(() =>
            dispatch({
                type: actionType.EPISODEFIND_SUCCESS,
                payload: data,
            })
        );

        //dispatch({ type: actionType.EPISODEFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.EPISODEFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchEpisodes = () => async (dispatch) => {
    dispatch({ type: actionType.EPISODESEARCH_REQUEST });

    try {
        const { data } = await api.fetchEpisodes();

        Promise.resolve(dispatch(getEpisodeData())).then(() =>
            dispatch({
                type: actionType.EPISODESEARCH_SUCCESS,
                payload: data,
            })
        );

        //dispatch({ type: actionType.EPISODESEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.EPISODESEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteEpisode = (id) => async (dispatch) => {
    dispatch({ type: actionType.EPISODEDELETE_REQUEST });

    try {
        await await api.deleteEpisode(id);

        dispatch({ type: actionType.EPISODEDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.EPISODEDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
