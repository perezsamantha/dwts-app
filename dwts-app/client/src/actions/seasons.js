import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addSeason = (season) => async (dispatch) => {
    dispatch({ type: actionType.SEASONADD_REQUEST });

    try {
        const { data } = await api.addSeason(season);

        dispatch({ type: actionType.SEASONADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SEASONADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findSeasonById = (id) => async (dispatch) => {
    dispatch({ type: actionType.SEASONFIND_REQUEST });

    try {
        const { data } = await api.findSeasonById(id);

        dispatch({ type: actionType.SEASONFIND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SEASONFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchSeasons = () => async (dispatch) => {
    dispatch({ type: actionType.SEASONSEARCH_REQUEST });

    try {
        const { data } = await api.fetchSeasons();

        dispatch({ type: actionType.SEASONSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SEASONSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

// export const searchSeasons = (input) => async (dispatch) => {
//     dispatch({ type: actionType.SEASONSEARCH_REQUEST });

//     try {
//         const { data } = await api.searchSeasons(input);

//         dispatch({ type: actionType.SEASONSEARCH_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: actionType.SEASONSEARCH_FAILURE, payload: error, error: true });
//     }
// }

export const updateSeason = (id, season) => async (dispatch) => {
    dispatch({ type: actionType.SEASONUPDATE_REQUEST });

    try {
        const { data } = await api.updateSeason(id, season);

        dispatch({
            type: actionType.SEASONUPDATE_SUCCESS,
            payload: { season: data, oldId: id },
        });
    } catch (error) {
        dispatch({
            type: actionType.SEASONUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setSeasonPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.SEASONUPDATE_REQUEST });

    try {
        const { data } = await api.setSeasonPic(id, image);

        dispatch({ type: actionType.SEASONUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.SEASONUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteSeason = (id) => async (dispatch) => {
    dispatch({ type: actionType.SEASONDELETE_REQUEST });

    try {
        await await api.deleteSeason(id);

        dispatch({ type: actionType.SEASONDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.SEASONDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

// bts extra pics?
// export const addSeasonPic = (id, image) => async (dispatch) => {
//     dispatch({ type: actionType.SEASONUPDATE_REQUEST });

//     try {
//         const { data } = await api.addSeasonPic(id, image);

//         dispatch({ type: actionType.SEASONUPDATE_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: actionType.SEASONUPDATE_FAILURE, payload: error, error: true });
//     }
// }
