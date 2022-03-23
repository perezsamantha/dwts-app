import * as actionType from '../constants/actionTypes';

// initial state from here?

const episodeReducer = (
    state = {
        episodes: [],
        episode: {},
        likes: 0,
    },
    action
) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default episodeReducer;
