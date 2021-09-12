import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addTeam = (team) => async (dispatch) => {
    try {
        const { data } = await api.addTeam(team);

        dispatch({ type: actionType.TEAMADD, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateTeam = (id, team) => async (dispatch) => {
    try {
        const { data } = await api.updateTeam(id, team);

        dispatch({ type: actionType.TEAMUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.updatePic(id, image);

        dispatch({ type: actionType.TEAMUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const findTeamById = (id) => async (dispatch) => {
    try {
        const { data } = await api.findTeamById(id);

        dispatch({ type: actionType.TEAMSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchTeams = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTeams();

        dispatch({ type: actionType.TEAMSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const searchTeams = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchTeams(input);

        dispatch({ type: actionType.TEAMSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteTeam = (id) => async (dispatch) => {
    try {
        await await api.deleteTeam(id);

        dispatch({ type: actionType.TEAMDELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const addPic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.addPic(id, image);

        dispatch({ type: actionType.TEAMUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likeTeam = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeTeam(id, user?.token);
        
        dispatch({ type: actionType.TEAMLIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getFavoriteTeams = () => async (dispatch) => {
    try {
        const { data } = await api.getFavoriteTeams();

        dispatch({ type: actionType.TEAMSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}