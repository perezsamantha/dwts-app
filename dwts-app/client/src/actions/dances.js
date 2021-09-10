import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addDance = (dance) => async (dispatch) => {
    try {
        const { data } = await api.addDance(dance);

        dispatch({ type: actionType.DANCEADD, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateDance = (id, dance) => async (dispatch) => {
    try {
        const { data } = await api.updateDance(id, dance);

        dispatch({ type: actionType.DANCEUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const setDancePic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.setDancePic(id, image);

        dispatch({ type: actionType.DANCEUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const findDanceById = (id) => async (dispatch) => {
    try {
        const { data } = await api.findDanceById(id);

        dispatch({ type: actionType.DANCESEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const searchDances = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchDances(input);

        dispatch({ type: actionType.DANCESEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteDance = (id) => async (dispatch) => {
    try {
        await await api.deleteDance(id);

        dispatch({ type: actionType.DANCEDELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const addDancePic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.addDancePic(id, image);

        dispatch({ type: actionType.DANCEUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likeDance = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeDance(id, user?.token);
        
        dispatch({ type: actionType.DANCELIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getFavoriteDances = () => async (dispatch) => {
    try {
        const { data } = await api.getFavoriteDances();

        dispatch({ type: actionType.DANCESEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}