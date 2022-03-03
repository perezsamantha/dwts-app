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
        default:
            return state;
    }
};

export default dataReducer;
