import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addDance = (dance) => async (dispatch) => {
    dispatch({ type: actionType.DANCEADD_REQUEST });

    try {
        const { data } = await api.addDance(dance);

        dispatch({ type: actionType.DANCEADD_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: actionType.DANCEADD_FAILURE, payload: error, error: true });
    }
}

export const updateDance = (id, dance) => async (dispatch) => {
    dispatch({ type: actionType.DANCEUPDATE_REQUEST });

    try {
        const { data } = await api.updateDance(id, dance);

        dispatch({ type: actionType.DANCEUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCEUPDATE_FAILURE, payload: error, error: true });
    }
}

// export const setDancePic = (id, image) => async (dispatch) => {
//     dispatch({ type: actionType.DANCEUPDATE_REQUEST });

//     try {
//         const { data } = await api.setDancePic(id, image);

//         dispatch({ type: actionType.DANCEUPDATE_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: actionType.DANCEUPDATE_FAILURE, payload: error, error: true });
//     }
// }

export const fetchDances = () => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const dances = await api.fetchDances();
        const seasons = await api.fetchSeasons();
        const episodes = await api.fetchEpisodes();

        dispatch({ type: actionType.DANCESEARCH_SUCCESS, payload: { dances: dances.data, seasons: seasons.data, episodes: episodes.data } });
    } catch (error) {
        dispatch({ type: actionType.DANCESEARCH_FAILURE, payload: error, error: true });
    }
}

export const findDanceById = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCEFIND_REQUEST });

    try {
        const { data } = await api.findDanceById(id);

        dispatch({ type: actionType.DANCEFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCEFIND_FAILURE, payload: error, error: true });
    }
}

export const searchDances = (input) => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const { data } = await api.searchDances(input);

        dispatch({ type: actionType.DANCESEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCESEARCH_FAILURE, payload: error, error: true });
    }
}

export const deleteDance = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCEDELETE_REQUEST });

    try {
        await await api.deleteDance(id);

        dispatch({ type: actionType.DANCEDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionType.DANCEDELETE_FAILURE, payload: error, error: true });
    }
}

export const addDancePic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.DANCEUPDATE_REQUEST });

    try {
        const { data } = await api.addDancePic(id, image);

        dispatch({ type: actionType.DANCEUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCEUPDATE_FAILURE, payload: error, error: true });
    }
}

export const likeDance = (id) => async (dispatch) => {
    dispatch({ type: actionType.DANCELIKE_REQUEST });

    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeDance(id, user?.token);
        
        dispatch({ type: actionType.DANCELIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCELIKE_FAILURE, payload: error, error: true });
    }
}

export const getFavoriteDances = () => async (dispatch) => {
    dispatch({ type: actionType.DANCESEARCH_REQUEST });

    try {
        const { data } = await api.getFavoriteDances();

        dispatch({ type: actionType.DANCESEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.DANCESEARCH_FAILURE, payload: error, error: true });
    }
}