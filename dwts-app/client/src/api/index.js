import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; // lowercase a ??
    }
    
    return req;
}) // for future auth actions (liking cards)

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const searchFans = (input) => API.post('/fans/search', input);

export const addTeam = (team) => API.post('/teams/add', team);
export const updateTeam = (id, team) => API.patch(`/teams/update/${id}`, team);
export const updatePic = (id, image) => API.patch(`/teams/updatePic/${id}`, image)
export const findTeamById = (id) => API.get(`/teams/${id}`);
export const searchTeams = (input) => API.post('/teams/search', input);
export const deleteTeam = (id) => API.delete(`/teams/delete/${id}`);
export const addPic = (id, image) => API.patch(`/teams/addPic/${id}`, image)
export const likeTeam = (id) => API.patch(`/teams/${id}/likeTeam`);
export const getFavoriteTeams = () => API.get('/teams/favorites');
