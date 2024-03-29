import axios from 'axios';

const isSameOrigin = (url) => {
    return new URL(window.location.href).origin === new URL(url).origin;
};

const baseURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_CLIENT_ORIGIN
        : 'http://localhost:5000/api';

const API = axios.create({
    baseURL,
    withCredentials: true,
});

API.interceptors.request.use((req) => {
    return req;
});

API.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (
            isSameOrigin(error.response.request.responseURL) &&
            error.response.status === 401
        ) {
            window.location.reload(true);
        }
        return Promise.reject(error.response.data);
    }
);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
export const googleAuth = (formData) => API.post('/users/googleAuth', formData);
export const verifyUser = (token) => API.get(`/users/verify/${token}`);
export const resendVerification = (formData) =>
    API.post(`/users/resendVerification`, formData);
export const forgotPassword = (formData) =>
    API.post(`/users/forgotPassword`, formData);
export const resetPassword = (token, formData) =>
    API.post(`/users/resetPassword/${token}`, formData);
export const fetchAuthData = () => API.get('/users/authData');
export const logout = () => API.post('/users/logout');
export const addUser = (formData) => API.post('/users/add', formData);
export const updateUser = (id, user) => API.patch(`/users/update/${id}`, user);
export const updateAuth = (user) => API.patch(`/users/update/auth`, user);
export const setUserPic = (id, image) =>
    API.patch(`/users/setPic/${id}`, image);
export const setAuthPic = (image) => API.patch(`/users/setPic/auth`, image);
export const findUserById = (id) => API.get(`/users/admin/${id}`);
export const findUserByUsername = (username) => API.get(`/users/${username}`);
export const fetchUsers = () => API.get('/users/');
export const searchUsers = (input) => API.post('/users/search', input);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`);
export const deleteAuth = () => API.delete(`/users/delete/auth`);

export const addDance = (dance) => API.post('/dances/add', dance);
export const updateDance = (id, dance) =>
    API.patch(`/dances/update/${id}`, dance);
export const findDanceById = (id) => API.get(`/dances/${id}`);
export const fetchDances = () => API.get('/dances/');
export const searchDances = (input) => API.post('/dances/search', input);
export const deleteDance = (id) => API.delete(`/dances/delete/${id}`);
export const addDancePic = (id, image) =>
    API.patch(`/dances/addPic/${id}`, image);
export const likeDance = (id) => API.patch(`/dances/${id}/likeDance`);

export const addTeam = (team) => API.post('/teams/add', team);
export const updateTeam = (id, team) => API.patch(`/teams/update/${id}`, team);
export const setTeamPic = (id, image) =>
    API.patch(`/teams/setPic/${id}`, image);
export const findTeamById = (id) => API.get(`/teams/${id}`);
export const fetchTeams = () => API.get('/teams/');
export const searchTeams = (input) => API.post('/teams/search', input);
export const deleteTeam = (id) => API.delete(`/teams/delete/${id}`);
export const addTeamPic = (id, image) =>
    API.patch(`/teams/addPic/${id}`, image);
export const likeTeam = (id) => API.patch(`/teams/${id}/likeTeam`);

export const addPro = (pro) => API.post('/pros/add', pro);
export const updatePro = (id, pro) => API.patch(`/pros/update/${id}`, pro);
export const setProPic = (id, image) => API.patch(`/pros/setPic/${id}`, image);
export const findProById = (id) => API.get(`/pros/${id}`);
export const fetchPros = () => API.get('/pros/');
export const searchPros = (input) => API.post('/pros/search', input);
export const deletePro = (id) => API.delete(`/pros/delete/${id}`);
export const addProPic = (id, image) => API.patch(`/pros/addPic/${id}`, image);
export const likePro = (id) => API.patch(`/pros/${id}/likePro`);

export const addCeleb = (celeb) => API.post('/celebs/add', celeb);
export const updateCeleb = (id, celeb) =>
    API.patch(`/celebs/update/${id}`, celeb);
export const setCelebPic = (id, image) =>
    API.patch(`/celebs/setPic/${id}`, image);
export const findCelebById = (id) => API.get(`/celebs/${id}`);
export const fetchCelebs = () => API.get('/celebs/');
export const deleteCeleb = (id) => API.delete(`/celebs/delete/${id}`);

export const addSeason = (season) => API.post('/seasons/add', season);
export const updateSeason = (id, season) =>
    API.patch(`/seasons/update/${id}`, season);
export const setSeasonPic = (id, image) =>
    API.patch(`/seasons/setPic/${id}`, image);
export const findSeasonById = (id) => API.get(`/seasons/${id}`);
export const fetchSeasons = () => API.get('/seasons/');
export const deleteSeason = (id) => API.delete(`/seasons/delete/${id}`);

export const addJudge = (judge) => API.post('/judges/add', judge);
export const updateJudge = (id, judge) =>
    API.patch(`/judges/update/${id}`, judge);
export const setJudgePic = (id, image) =>
    API.patch(`/judges/setPic/${id}`, image);
export const findJudgeById = (id) => API.get(`/judges/${id}`);
export const fetchJudges = () => API.get('/judges/');
export const deleteJudge = (id) => API.delete(`/judges/delete/${id}`);

export const addEpisode = (episode) => API.post('/episodes/add', episode);
export const updateEpisode = (id, episode) =>
    API.patch(`/episodes/update/${id}`, episode);
export const findEpisodeById = (id) => API.get(`/episodes/${id}`);
export const fetchEpisodes = () => API.get('/episodes/');
export const deleteEpisode = (id) => API.delete(`/episodes/delete/${id}`);

export const addScore = (score) => API.post('/scores/add', score);
export const updateScore = (id, score) =>
    API.patch(`/scores/update/${id}`, score);
export const findScoreById = (id) => API.get(`/scores/${id}`);
export const fetchScores = () => API.get('/scores/');
export const deleteScore = (id) => API.delete(`/scores/delete/${id}`);

export const addDancer = (dancer) => API.post('/dancers/add', dancer);
export const updateDancer = (id, dancer) =>
    API.patch(`/dancers/update/${id}`, dancer);
export const findDancerById = (id) => API.get(`/dancers/${id}`);
export const fetchDancers = () => API.get('/dancers/');
export const deleteDancer = (id) => API.delete(`/dancers/delete/${id}`);

export const addTour = (tour) => API.post('/tours/add', tour);
export const updateTour = (id, tour) => API.patch(`/tours/update/${id}`, tour);
export const setTourPic = (id, image) =>
    API.patch(`/tours/setPic/${id}`, image);
export const findTourById = (id) => API.get(`/tours/${id}`);
export const fetchTours = () => API.get('/tours/');
export const deleteTour = (id) => API.delete(`/tours/delete/${id}`);

export const addTourCast = (cast) => API.post('/tour_cast/add', cast);
export const updateTourCast = (id, cast) =>
    API.patch(`/tour_cast/update/${id}`, cast);
export const findTourCastById = (id) => API.get(`/tour_cast/${id}`);
export const fetchTourCast = () => API.get('/tour_cast/');
export const deleteTourCast = (id) => API.delete(`/tour_cast/delete/${id}`);

export const findDailyDance = (day) => API.post(`/dances/daily/`, day);

export const setUserScore = (id, value) =>
    API.patch(`/scores/user/${id}`, value);

export const fetchRecentLikes = () => API.get(`/activity/likes`);
export const fetchRecentScores = () => API.get(`/activity/scores`);

export const addPoll = (poll) => API.post('/polls/add', poll);
export const addPollOption = (option) => API.post('/polls/addOption', option);
export const fetchPolls = (type, day) => API.post('/polls/', type, day);
export const deletePoll = (id) => API.delete(`/polls/delete/${id}`);
export const deletePollOption = (id) => API.delete(`/polls/deleteOption/${id}`);
export const voteOption = (id) => API.post(`/polls/${id}/vote`);
