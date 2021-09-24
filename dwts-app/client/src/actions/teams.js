import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addTeam = (team) => async (dispatch) => {
    dispatch({ type: actionType.TEAMADD_REQUEST });

    try {
        const { data } = await api.addTeam(team);

        dispatch({ type: actionType.TEAMADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMADD_FAILURE, payload: error, error: true });
    }
}

export const updateTeam = (id, team) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.updateTeam(id, team);

        dispatch({ type: actionType.TEAMUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMUPDATE_FAILURE, payload: error, error: true });
    }
}

export const updatePic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.updatePic(id, image);

        dispatch({ type: actionType.TEAMUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMUPDATE_FAILURE, payload: error, error: true });
    }
}

export const findTeamById = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.findTeamById(id);

        dispatch({ type: actionType.TEAMSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMSEARCH_FAILURE, payload: error, error: true });
    }
}

export const fetchTeams = () => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.fetchTeams();

        dispatch({ type: actionType.TEAMSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMSEARCH_FAILURE, payload: error, error: true });
    }
}

export const searchTeams = (input) => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.searchTeams(input);

        dispatch({ type: actionType.TEAMSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMSEARCH_FAILURE, payload: error, error: true });
    }
}

export const deleteTeam = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMDELETE_REQUEST });

    try {
        await await api.deleteTeam(id);

        dispatch({ type: actionType.TEAMDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionType.TEAMDELETE_FAILURE, payload: error, error: true });
    }
}

export const addPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.addPic(id, image);

        dispatch({ type: actionType.TEAMUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMUPDATE_FAILURE, payload: error, error: true });
    }
}

export const likeTeam = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMLIKE_REQUEST });

    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeTeam(id, user?.token);
        
        dispatch({ type: actionType.TEAMLIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMLIKE_FAILURE, payload: error, error: true });
    }
}

export const getFavoriteTeams = () => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.getFavoriteTeams();

        dispatch({ type: actionType.TEAMSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionType.TEAMSEARCH_FAILURE, payload: error, error: true });
    }
}