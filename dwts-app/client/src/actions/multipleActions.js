import { fetchSeasons } from './seasons';
import { fetchCelebs } from './celebs';
import { fetchPros } from './pros';
import { fetchTeams, fetchTeamsWithoutData } from './teams';
import { fetchDances, fetchDancesWithoutData } from './dances';
import { fetchDancers, fetchDancersWithoutData } from './dancers';
import { fetchScores, fetchScoresWithoutData } from './scores';
import { fetchEpisodes, fetchEpisodesWithoutData } from './episodes';
import { fetchJudges } from './judges';
import {
    fetchTourCastWithoutData,
    fetchTours,
    fetchToursWithoutData,
} from './tours';

import * as actionType from '../constants/actionTypes';

// export const getDataForTeams = (input) => (dispatch) => {
//     dispatch(searchTeams(input)).then(() =>
//         Promise.all([
//             dispatch(fetchCelebs()),
//             dispatch(fetchPros()),
//             dispatch(fetchSeasons()),
//         ])
//     );
// };

// export const getDataForTeams = (input) => async (dispatch) => {
//     console.log(input);
//     return Promise.all([
//         dispatch(searchTeams({ input })),
//         dispatch(fetchCelebs()),
//         dispatch(fetchPros()),
//         dispatch(fetchSeasons()),
//     ]);
// };

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

export const getUserData = () => async (dispatch) => {
    Promise.resolve(dispatch(fetchSeasons()));
};

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
