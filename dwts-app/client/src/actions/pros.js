import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addPro = (pro) => async (dispatch) => {
    dispatch({ type: "PROADD_REQUEST" });
    
    try {
        const { data } = await api.addPro(pro);

        dispatch({ type: "PROADD_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROADD_FAILURE", payload: error, error: true });
    }
}

export const findProById = (id) => async (dispatch) => {
    dispatch({ type: "PROSEARCH_REQUEST" });
    
    try {
        const { data } = await api.findProById(id);

        dispatch({ type: "PROSEARCH_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROSEARCH_FAILURE", payload: error, error: true });
    }
}

export const fetchPros = () => async (dispatch) => {
    dispatch({ type: "PROSEARCH_REQUEST" });

    try {
        const { data } = await api.fetchPros();

        dispatch({ type: "PROSEARCH_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROSEARCH_FAILURE", payload: error, error: true });
    }
}

export const searchPros = (input) => async (dispatch) => {
    dispatch({ type: "PROSEARCH_REQUEST" });

    try {
        const { data } = await api.searchPros(input);

        //dispatch({ type: actionType.PROSEARCH, payload: data });
        dispatch({ type: "PROSEARCH_SUCCESS", payload: data });

    } catch (error) {
        //console.log(error);
        dispatch({ type: "PROSEARCH_FAILURE", payload: error, error: true });
    }
}

export const updatePro = (id, pro) => async (dispatch) => {
    dispatch({ type: "PROUPDATE_REQUEST" });
    
    try {
        const { data } = await api.updatePro(id, pro);

        dispatch({ type: "PROUPDATE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROUPDATE_FAILURE", payload: error, error: true });
    }
}

export const setProPic = (id, image) => async (dispatch) => {
    dispatch({ type: "PROUPDATE_REQUEST" });
    
    try {
        const { data } = await api.setProPic(id, image);

        dispatch({ type: "PROUPDATE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROUPDATE_FAILURE", payload: error, error: true });
    }
}

export const deletePro = (id) => async (dispatch) => {
    dispatch({ type: "PRODELETE_REQUEST" });
    
    try {
        await await api.deletePro(id);

        dispatch({ type: "PRODELETE_SUCCESS", payload: id });
    } catch (error) {
        dispatch({ type: "PRODELETE_FAILURE", payload: error, error: true });
    }
}

export const addProPic = (id, image) => async (dispatch) => {
    dispatch({ type: "PROUPDATE_REQUEST" });
    
    try {
        const { data } = await api.addProPic(id, image);

        dispatch({ type: "PROUPDATE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROUPDATE_FAILURE", payload: error, error: true });
    }
}

export const likePro = (id) => async (dispatch) => {
    dispatch({ type: "PROLIKE_REQUEST" });
    
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePro(id, user?.token);
        
        dispatch({ type: "PROLIKE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROLIKE_FAILURE", payload: error, error: true });
    }
}

export const getFavoritePros = () => async (dispatch) => {
    dispatch({ type: "PROSEARCH_REQUEST" });
    
    try {
        const { data } = await api.getFavoritePros();

        dispatch({ type: "PROSEARCH_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PROSEARCH_FAILURE", payload: error, error: true });
    }
}