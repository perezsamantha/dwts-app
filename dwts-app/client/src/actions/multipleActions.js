import { fetchSeasons } from './seasons';
import { fetchCelebs } from './celebs';
import { fetchPros } from './pros';
import { fetchTeams } from './teams';
import { fetchDances } from './dances';
import { fetchDancers } from './dancers';
import { fetchScores } from './scores';
import { fetchEpisodes } from './episodes';
import { fetchJudges } from './judges';
import { fetchTours } from './tours';

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
    Promise.resolve(dispatch(fetchDancers())).then(() =>
        dispatch(fetchScores())
    );
};
