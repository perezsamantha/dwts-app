import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const searchfans = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchFans(input);

        dispatch({ type: actionType.FANSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const findFanById = (id) => async (dispatch) => {
    try {
        const { data } = await api.findFanById(id);

        dispatch({ type: actionType.FANSEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}