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

export const updateProPic = (id, image) => async (dispatch) => {
    try {
        const { data } = await api.updateProPic(id, image);

        dispatch({ type: actionType.PROUPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}