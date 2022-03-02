import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

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
        //const { data } = await api.findTeamById(id);
        const team = await api.findTeamById(id);
        const celebs = await api.fetchCelebs();
        const pros = await api.fetchPros();
        const seasons = await api.fetchSeasons();
        const dances = await api.fetchDances();
        const dancers = await api.fetchDancers();
        const scores = await api.fetchScores();

        dispatch({
            type: actionType.TEAMFIND_SUCCESS,
            payload: {
                team: team.data,
                celebs: celebs.data,
                pros: pros.data,
                seasons: seasons.data,
                dances: dances.data,
                dancers: dancers.data,
                scores: scores.data,
            },
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
        const teams = await api.fetchTeams();
        const celebs = await api.fetchCelebs();
        const pros = await api.fetchPros();
        const seasons = await api.fetchSeasons();

        dispatch({
            type: actionType.TEAMSEARCH_SUCCESS,
            payload: {
                teams: teams.data,
                celebs: celebs.data,
                pros: pros.data,
                seasons: seasons.data,
            },
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
        const teams = await api.searchTeams(input);
        const celebs = await api.fetchCelebs();
        const pros = await api.fetchPros();
        const seasons = await api.fetchSeasons();

        dispatch({
            type: actionType.TEAMSEARCH_SUCCESS,
            payload: {
                teams: teams.data,
                celebs: celebs.data,
                pros: pros.data,
                seasons: seasons.data,
            },
        });
    } catch (error) {
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

export const likeTeam = (id) => async (dispatch) => {
    dispatch({ type: actionType.TEAMLIKE_REQUEST });

    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likeTeam(id, user?.token);

        dispatch({ type: actionType.TEAMLIKE_SUCCESS, payload: data });
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
