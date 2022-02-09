//import { AUTH } from '../constants/actionTypes';
import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: actionType.AUTH, data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionType.AUTH, data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }
}