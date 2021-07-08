import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const searchfans = (input) => async (dispatch) => {
    try {
        const { data } = await api.searchFans(input);

        dispatch({ type: actionType.SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}