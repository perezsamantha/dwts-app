import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addPro = (pro) => async (dispatch) => {
    try {
        const { data } = await api.addPro(pro);

        dispatch({ type: actionType.PROADD, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const findProById = (id) => async (dispatch) => {
    try {
        const { data } = await api.findProById(id);

        dispatch({ type: actionType.PROSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchPros = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPros();

        dispatch({ type: actionType.PROSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const searchPros = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchPros(input);

        dispatch({ type: actionType.PROSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePro = (id, pro) => async (dispatch) => {
    try {
        const { data } = await api.updatePro(id, pro);

        dispatch({ type: actionType.PROUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const setProPic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.setProPic(id, image);

        dispatch({ type: actionType.PROUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePro = (id) => async (dispatch) => {
    try {
        await await api.deletePro(id);

        dispatch({ type: actionType.PRODELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const addProPic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.addProPic(id, image);

        dispatch({ type: actionType.DANCEUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likePro = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePro(id, user?.token);
        
        dispatch({ type: actionType.PROLIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getFavoritePros = () => async (dispatch) => {
    try {
        const { data } = await api.getFavoritePros();

        dispatch({ type: actionType.PROSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}