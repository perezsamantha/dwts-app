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
    dancers: [],
    users: [],
    celeb: {},
    pro: {},
    season: {},
    team: {},
    episode: {},
    dance: {},
    judge: {},
    score: {},
    dancer: {},
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

        case actionType.DANCEADD_SUCCESS:
            return { ...state, dances: [...state.dances, action.payload] };
        case actionType.DANCEUPDATE_SUCCESS:
            return { ...state, dances: [...state.dances.map(dance => dance.id === action.payload.id ? action.payload : dance)] }
        case actionType.DANCESEARCH_SUCCESS:
            return { ...state, dances: action.payload.dances, seasons: action.payload.seasons, episodes: action.payload.episodes };
        case actionType.DANCEFIND_SUCCESS:
            return { ...state, dance: action.payload };
        case actionType.DANCEDELETE_SUCCESS:
            return { ...state, dances: state.dances.filter((dance) => dance.id !== action.payload) };

        case actionType.SCOREADD_SUCCESS:
            return { ...state, scores: [...state.scores, action.payload] };
        case actionType.SCOREUPDATE_SUCCESS:
            return { ...state, scores: [...state.scores.map(score => score.id === action.payload.id ? action.payload : score)] }
        case actionType.SCORESEARCH_SUCCESS:
            return { ...state, scores: action.payload.scores, dances: action.payload.dances, judges: action.payload.judges };
        case actionType.SCOREFIND_SUCCESS:
            return { ...state, score: action.payload };
        case actionType.SCOREDELETE_SUCCESS:
            return { ...state, scores: state.scores.filter((score) => score.id !== action.payload) };

        case actionType.DANCERADD_SUCCESS:
            return { ...state, dancers: [...state.dancers, action.payload] };
        case actionType.DANCERUPDATE_SUCCESS:
            return { ...state, dancers: [...state.dancers.map(dancer => dancer.id === action.payload.id ? action.payload : dancer)] }
        case actionType.DANCERSEARCH_SUCCESS:
            return { ...state, dancers: action.payload.dancers, dances: action.payload.dances, teams: action.payload.teams, pros: action.payload.pros, celebs: action.payload.celebs };
        case actionType.DANCERFIND_SUCCESS:
            return { ...state, dancer: action.payload };
        case actionType.DANCERDELETE_SUCCESS:
            return { ...state, dancers: state.dancers.filter((dancer) => dancer.id !== action.payload) };

        default:
            return state;
    }
};

export default dataReducer;