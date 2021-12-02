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
export const findFanById = (id) => API.get(`/fans/${id}`);

export const addDance = (dance) => API.post('/dances/add', dance);
export const updateDance = (id, dance) => API.patch(`/dances/update/${id}`, dance);
export const setDancePic = (id, image) => API.patch(`/dances/setPic/${id}`, image)
export const findDanceById = (id) => API.get(`/dances/${id}`);
export const searchDances = (input) => API.post('/dances/search', input);
export const deleteDance = (id) => API.delete(`/dances/delete/${id}`);
export const addDancePic = (id, image) => API.patch(`/dances/addPic/${id}`, image)
export const likeDance = (id) => API.patch(`/dances/${id}/likeDance`);
export const getFavoriteDances = () => API.get('/dances/favorites');

export const addTeam = (team) => API.post('/teams/add', team);
export const updateTeam = (id, team) => API.patch(`/teams/update/${id}`, team);
export const updatePic = (id, image) => API.patch(`/teams/updatePic/${id}`, image)
export const findTeamById = (id) => API.get(`/teams/${id}`);
export const fetchTeams = () => API.get('/teams/');
export const searchTeams = (input) => API.post('/teams/search', input);
export const deleteTeam = (id) => API.delete(`/teams/delete/${id}`);
export const addPic = (id, image) => API.patch(`/teams/addPic/${id}`, image)
export const likeTeam = (id) => API.patch(`/teams/${id}/likeTeam`);
export const getFavoriteTeams = () => API.get('/teams/favorites'); // eventually make a combined favorites function

export const addPro = (pro) => API.post('/pros/add', pro);
export const updatePro = (id, pro) => API.patch(`/pros/update/${id}`, pro);
export const setProPic = (id, image) => API.patch(`/pros/setPic/${id}`, image)
export const findProById = (id) => API.get(`/pros/${id}`);
export const fetchPros = () => API.get('/pros/');
export const searchPros = (input) => API.post('/pros/search', input);
export const deletePro = (id) => API.delete(`/pros/delete/${id}`);
export const addProPic = (id, image) => API.patch(`/pros/addPic/${id}`, image)
export const likePro = (id) => API.patch(`/pros/${id}/likePro`);
export const getFavoritePros = () => API.get('/pros/favorites');

export const addCeleb = (celeb) => API.post('/celebs/add', celeb);
export const updateCeleb = (id, celeb) => API.patch(`/celebs/update/${id}`, celeb);
export const setCelebPic = (id, image) => API.patch(`/celebs/setPic/${id}`, image)
export const findCelebById = (id) => API.get(`/celebs/${id}`);
export const fetchCelebs = () => API.get('/celebs/');
export const deleteCeleb = (id) => API.delete(`/celebs/delete/${id}`);
