import * as actionType from '../constants/actionTypes';

// initial state from here?

const dataReducer = (
    state = {
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
    },
    action
) => {
    switch (action.type) {
        case actionType.CELEBADD_SUCCESS:
            return { ...state, celebs: [...state.celebs, action.payload] };
        case actionType.CELEBUPDATE_SUCCESS:
            return {
                ...state,
                celebs: [
                    ...state.celebs.map((celeb) =>
                        celeb.id === action.payload.id ? action.payload : celeb
                    ),
                ],
            };
        case actionType.CELEBSEARCH_SUCCESS:
            return { ...state, celebs: action.payload };
        case actionType.CELEBFIND_SUCCESS:
            return { ...state, celeb: action.payload };
        case actionType.CELEBDELETE_SUCCESS:
            return {
                ...state,
                celebs: state.celebs.filter(
                    (celeb) => celeb.id !== action.payload
                ),
            };

        case actionType.PROADD_SUCCESS:
            return { ...state, pros: [...state.pros, action.payload] };
        case actionType.PROUPDATE_SUCCESS:
            return {
                ...state,
                pros: [
                    ...state.pros.map((pro) =>
                        pro.id === action.payload.id ? action.payload : pro
                    ),
                ],
                pro: action.payload.pro,
            };
        case actionType.PROSEARCH_SUCCESS:
            return { ...state, pros: action.payload };
        case actionType.PROFIND_SUCCESS:
            return { ...state, pro: action.payload };
        case actionType.PRODELETE_SUCCESS:
            return {
                ...state,
                pros: state.pros.filter((pro) => pro.id !== action.payload),
            };

        case actionType.SEASONADD_SUCCESS:
            return { ...state, seasons: [...state.seasons, action.payload] };
        case actionType.SEASONUPDATE_SUCCESS:
            return {
                ...state,
                seasons: [
                    ...state.seasons.map((season) =>
                        season.id === action.payload.oldId
                            ? action.payload.season
                            : season
                    ),
                ],
            };
        case actionType.SEASONSEARCH_SUCCESS:
            return { ...state, seasons: action.payload };
        case actionType.SEASONFIND_SUCCESS:
            return { ...state, season: action.payload };
        case actionType.SEASONDELETE_SUCCESS:
            return {
                ...state,
                seasons: state.seasons.filter(
                    (season) => season.id !== action.payload
                ),
            };

        case actionType.TEAMADD_SUCCESS:
            return { ...state, teams: [...state.teams, action.payload] };
        case actionType.TEAMUPDATE_SUCCESS:
            return {
                ...state,
                teams: [
                    ...state.teams.map((team) =>
                        team.id === action.payload.id ? action.payload : team
                    ),
                ],
                team: action.payload.team,
            };
        case actionType.TEAMSEARCH_SUCCESS:
            return {
                ...state,
                teams: action.payload,
            };
        case actionType.TEAMFIND_SUCCESS:
            return {
                ...state,
                team: action.payload,
            };
        case actionType.TEAMDELETE_SUCCESS:
            return {
                ...state,
                teams: state.teams.filter((team) => team.id !== action.payload),
            };

        case actionType.EPISODEADD_SUCCESS:
            return { ...state, episodes: [...state.episodes, action.payload] };
        case actionType.EPISODEUPDATE_SUCCESS:
            return {
                ...state,
                episodes: [
                    ...state.episodes.map((episode) =>
                        episode.id === action.payload.id
                            ? action.payload
                            : episode
                    ),
                ],
            };
        case actionType.EPISODESEARCH_SUCCESS:
            return {
                ...state,
                episodes: action.payload,
            };
        case actionType.EPISODEFIND_SUCCESS:
            return { ...state, episode: action.payload };
        case actionType.EPISODEDELETE_SUCCESS:
            return {
                ...state,
                episodes: state.episodes.filter(
                    (episode) => episode.id !== action.payload
                ),
            };

        case actionType.DANCEADD_SUCCESS:
            return { ...state, dances: [...state.dances, action.payload] };
        case actionType.DANCEUPDATE_SUCCESS:
            return {
                ...state,
                dances: [
                    ...state.dances.map((dance) =>
                        dance.id === action.payload.id ? action.payload : dance
                    ),
                ],
            };
        case actionType.DANCESEARCH_SUCCESS:
            return {
                ...state,
                dances: action.payload,
            };
        case actionType.DANCEFIND_SUCCESS:
            return {
                ...state,
                dance: action.payload,
            };
        case actionType.DANCEDELETE_SUCCESS:
            return {
                ...state,
                dances: state.dances.filter(
                    (dance) => dance.id !== action.payload
                ),
            };

        case actionType.JUDGEADD_SUCCESS:
            return { ...state, judges: [...state.judges, action.payload] };
        case actionType.JUDGEUPDATE_SUCCESS:
            return {
                ...state,
                judges: [
                    ...state.judges.map((judge) =>
                        judge.id === action.payload.id ? action.payload : judge
                    ),
                ],
            };
        case actionType.JUDGESEARCH_SUCCESS:
            return { ...state, judges: action.payload };
        case actionType.JUDGEFIND_SUCCESS:
            return { ...state, judge: action.payload };
        case actionType.JUDGEDELETE_SUCCESS:
            return {
                ...state,
                judges: state.judges.filter(
                    (judge) => judge.id !== action.payload
                ),
            };

        case actionType.SCOREADD_SUCCESS:
            return { ...state, scores: [...state.scores, action.payload] };
        case actionType.SCOREUPDATE_SUCCESS:
            return {
                ...state,
                scores: [
                    ...state.scores.map((score) =>
                        score.id === action.payload.id ? action.payload : score
                    ),
                ],
            };
        case actionType.SCORESEARCH_SUCCESS:
            return {
                ...state,
                scores: action.payload,
            };
        case actionType.SCOREFIND_SUCCESS:
            return { ...state, score: action.payload };
        case actionType.SCOREDELETE_SUCCESS:
            return {
                ...state,
                scores: state.scores.filter(
                    (score) => score.id !== action.payload
                ),
            };

        case actionType.DANCERADD_SUCCESS:
            return { ...state, dancers: [...state.dancers, action.payload] };
        case actionType.DANCERUPDATE_SUCCESS:
            return {
                ...state,
                dancers: [
                    ...state.dancers.map((dancer) =>
                        dancer.id === action.payload.id
                            ? action.payload
                            : dancer
                    ),
                ],
            };
        case actionType.DANCERSEARCH_SUCCESS:
            return {
                ...state,
                dancers: action.payload,
            };
        case actionType.DANCERFIND_SUCCESS:
            return { ...state, dancer: action.payload };
        case actionType.DANCERDELETE_SUCCESS:
            return {
                ...state,
                dancers: state.dancers.filter(
                    (dancer) => dancer.id !== action.payload
                ),
            };

        case actionType.USERADD_SUCCESS:
            return { ...state, users: [...state.users, action.payload.result] };
        case actionType.USERUPDATE_SUCCESS:
            return {
                ...state,
                users: [
                    ...state.users.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    ),
                ],
            };
        case actionType.USERSEARCH_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case actionType.USERFIND_SUCCESS:
            return { ...state, user: action.payload };
        case actionType.USERDELETE_SUCCESS:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };

        default:
            return state;
    }
};

export default dataReducer;
