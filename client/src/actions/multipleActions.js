import { fetchSeasons } from './seasons';
import { fetchCelebs } from './celebs';
import { fetchPros } from './pros';
import { fetchTeams, fetchTeamsWithoutData } from './teams';
import { fetchDances, fetchDancesWithoutData } from './dances';
import { fetchDancersWithoutData } from './dancers';
import { fetchScoresWithoutData } from './scores';
import { fetchEpisodes, fetchEpisodesWithoutData } from './episodes';
import { fetchJudges } from './judges';
import {
    fetchTourCastWithoutData,
    fetchTours,
    fetchToursWithoutData,
} from './tours';
import { fetchUsersWithoutData } from './users';
import * as actionType from '../constants/actionTypes';

export const getTeamData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchCelebs()))
        .then(() => dispatch(fetchPros()))
        .then(() => dispatch(fetchSeasons()));
};

export const getEpisodeData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchSeasons()));
};

export const getDanceData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchEpisodes()));
};

export const getScoreData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchDances())).then(() =>
        dispatch(fetchJudges())
    );
};

// seasons is fetched twice
export const getDancerData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchTeams())).then(() => dispatch(fetchDances()));
};

export const getTourData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchSeasons()));
};

export const getTourCastData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchTours()))
        .then(() => dispatch(fetchPros()))
        .then(() => dispatch(fetchCelebs()));
};

// export const getUserData = () => async (dispatch) => {
//     Promise.resolve(dispatch(fetchSeasons()));
// };

// not the most efficient
export const getAllData = () => async (dispatch) => {
    dispatch({ type: actionType.FETCHALLDATA_REQUEST });

    try {
        Promise.resolve(dispatch(fetchCelebs()))
            .then(() => dispatch(fetchPros()))
            .then(() => dispatch(fetchSeasons()))
            .then(() => dispatch(fetchTeamsWithoutData()))
            .then(() => dispatch(fetchEpisodesWithoutData()))
            .then(() => dispatch(fetchTeamsWithoutData()))
            .then(() => dispatch(fetchDancesWithoutData()))
            .then(() => dispatch(fetchJudges()))
            .then(() => dispatch(fetchScoresWithoutData()))
            .then(() => dispatch(fetchDancersWithoutData()))
            .then(() => dispatch(fetchToursWithoutData()))
            .then(() => dispatch(fetchTourCastWithoutData()))
            .then(() => dispatch({ type: actionType.FETCHALLDATA_SUCCESS }));
        // users??
    } catch (error) {
        dispatch({
            type: actionType.FETCHALLDATA_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const getBirthdayData = () => async (dispatch) => {
    dispatch({ type: actionType.FETCHBIRTHDAYDATA_REQUEST });

    try {
        Promise.resolve(dispatch(fetchCelebs()))
            .then(() => dispatch(fetchPros()))
            .then(() => dispatch(fetchUsersWithoutData()))
            .then(() =>
                dispatch({ type: actionType.FETCHBIRTHDAYDATA_SUCCESS })
            );
    } catch (error) {
        dispatch({
            type: actionType.FETCHBIRTHDAYDATA_FAILURE,
            payload: error,
            error: true,
        });
    }
};

export const getThrowbackData = () => async (dispatch) => {
    dispatch({ type: actionType.FETCHTHROWBACKDATA_REQUEST });

    try {
        Promise.resolve(dispatch(fetchEpisodesWithoutData()))
            .then(() => dispatch(fetchToursWithoutData()))
            .then(() =>
                dispatch({ type: actionType.FETCHTHROWBACKDATA_SUCCESS })
            );
    } catch (error) {
        dispatch({
            type: actionType.FETCHTHROWBACKDATA_FAILURE,
            payload: error,
            error: true,
        });
    }
};
