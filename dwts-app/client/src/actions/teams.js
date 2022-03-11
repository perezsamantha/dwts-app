import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getTeamData } from './multipleActions';

export const addTeam = (team) => async (dispatch) => {
    dispatch({ type: actionType.TEAMADD_REQUEST });

    try {
        const { data } = await api.addTeam(team);

        dispatch({ type: actionType.TEAMADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TEAMADD_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const updateTeam = (id, team) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.updateTeam(id, team);

        dispatch({ type: actionType.TEAMUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TEAMUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const setTeamPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.setTeamPic(id, image);

        dispatch({ type: actionType.TEAMUPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TEAMUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const findTeamById = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMFIND_REQUEST });

    try {
        const { data } = await api.findTeamById(id);

        // Promise.resolve(dispatch(getTeamData())).then(() =>
        //     dispatch({
        //         type: actionType.TEAMFIND_SUCCESS,
        //         payload: data,
        //     })
        // );

        dispatch({
            type: actionType.TEAMFIND_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionType.TEAMFIND_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchTeams = () => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.fetchTeams();

        Promise.resolve(dispatch(getTeamData())).then(() =>
            dispatch({
                type: actionType.TEAMSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.TEAMSEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: actionType.TEAMSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const fetchTeamsWithoutData = () => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.fetchTeams();

        dispatch({
            type: actionType.TEAMSEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionType.TEAMSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const searchTeams = (input) => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.searchTeams(input);

        Promise.resolve(dispatch(getTeamData())).then(() =>
            dispatch({
                type: actionType.TEAMSEARCH_SUCCESS,
                payload: data,
            })
        );

        // dispatch({
        //     type: actionType.TEAMSEARCH_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        console.log(error);
        dispatch({
            type: actionType.TEAMSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const deleteTeam = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMDELETE_REQUEST });

    try {
        await await api.deleteTeam(id);

        dispatch({ type: actionType.TEAMDELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: actionType.TEAMDELETE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

//todo
export const addTeamPic = (id, image) => async (dispatch) => {
    dispatch({ type: actionType.TEAMUPDATE_REQUEST });

    try {
        const { data } = await api.addTeamPic(id, image);

        dispatch({
            type: actionType.TEAMUPDATE_SUCCESS,
            payload: { team: data },
        });
    } catch (error) {
        dispatch({
            type: actionType.TEAMUPDATE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

// getLikes

export const likeTeam = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMLIKE_REQUEST });

    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeTeam(id, user?.token);
        console.log(data);

        const isLike = data.likes.includes(user.result.id);
        console.log(isLike);

        dispatch({
            type: actionType.TEAMLIKE_SUCCESS,
            payload: { team: data.team, likes: data.likes, isLike: isLike },
        });
    } catch (error) {
        dispatch({
            type: actionType.TEAMLIKE_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const getFavoriteTeams = () => async (dispatch) => {
    dispatch({ type: actionType.TEAMSEARCH_REQUEST });

    try {
        const { data } = await api.getFavoriteTeams();

        dispatch({ type: actionType.TEAMSEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: actionType.TEAMSEARCH_FAILURE,
            payload: error,
            error: true,
        });
    }
};
