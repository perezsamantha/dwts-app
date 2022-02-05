import * as actionType from '../constants/actionTypes';

// initial state from here?

const dataReducer = (state = {
    celebs: [],
    pros: [],
    seasons: [],
    teams: [],
    episodes: [],
    dances: [],
    judges: [],
    scores: [],
    users: [],
    celeb: {},
    pro: {},
    season: {},
    team: {},
    episode: {},
    dance: {},
    judge: {},
    score: {},
    user: {},
}, action) => {
    switch (action.type) {
        case actionType.TEAMADD_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case actionType.TEAMUPDATE_SUCCESS:
            return { ...state, teams: [...state.teams.map(team => team.id === action.payload.id ? action.payload : team)] }
        case actionType.TEAMSEARCH_SUCCESS:
            return { ...state, teams: action.payload };
        case actionType.TEAMFIND_SUCCESS:
            return { ...state, team: action.payload };
        case actionType.TEAMDELETE_SUCCESS:
            return { ...state, teams: state.teams.filter((team) => team.id !== action.payload) };
        case actionType.TEAMITEMS_SUCCESS:
            return { ...state, teams: action.payload.teams, celebs: action.payload.celebs, pros: action.payload.pros, seasons: action.payload.seasons };

        case actionType.EPISODEADD_SUCCESS:
            return { ...state, episodes: [...state.episodes, action.payload] };
        case actionType.EPISODEUPDATE_SUCCESS:
            return { ...state, episodes: [...state.episodes.map(episode => episode.id === action.payload.id ? action.payload : episode)] }
        case actionType.EPISODESEARCH_SUCCESS:
            return { ...state, episodes: action.payload };
        case actionType.EPISODEFIND_SUCCESS:
            return { ...state, episode: action.payload };
        case actionType.EPISODEDELETE_SUCCESS:
            return { ...state, episodes: state.episodes.filter((episode) => episode.id !== action.payload) };
        case actionType.EPISODEITEMS_SUCCESS:
            return { ...state, episodes: action.payload.episodes, seasons: action.payload.seasons };

        default:
            return state;
    }
};

export default dataReducer;