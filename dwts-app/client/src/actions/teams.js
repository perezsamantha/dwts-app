import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addTeam = (team) => async (dispatch) => {
    try {
        const { data } = await api.addTeam(team);

        dispatch({ type: actionType.ADD, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateTeam = (id, team) => async (dispatch) => {
    try {
        const { data } = await api.updateTeam(id, team);

        dispatch({ type: actionType.UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.updatePic(id, image);

        dispatch({ type: actionType.UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const searchTeams = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchTeams(input);

        dispatch({ type: actionType.SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteTeam = (id) => async (dispatch) => {
    try {
        await await api.deleteTeam(id);

        dispatch({ type: actionType.DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

/*
export const likeTeam = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeTeam(id, user?.token);

        dispatch({ type: actionType.LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
*/