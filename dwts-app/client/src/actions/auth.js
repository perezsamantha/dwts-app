//import { AUTH } from '../constants/actionTypes';
import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: actionType.AUTH, data });

        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionType.AUTH, data });

        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}