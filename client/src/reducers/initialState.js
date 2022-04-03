import { heightsInInches } from '../constants/dropdowns';

export const initialCelebState = {
    celebs: [],
    celeb: {},
};

export const initialProState = {
    pros: [],
    pro: {},
    filters: {
        sortBy: 'firstName',
        age: [0, 100],
        height: [
            heightsInInches[0],
            heightsInInches[heightsInInches.length - 1],
        ],
        gender: ['Male', 'Female'],
        showJuniors: false,
    },
};

export const initialSeasonState = {
    seasons: [],
    season: {},
};

export const initialTeamState = {
    teams: [],
    team: {},
    filters: {
        sortBy: 'seasonDesc',
        seasons: [],
        placements: [],
        hasPictures: 'false',
        pros: [],
        // averageScore: []
    },
};

export const initialEpisodeState = {
    episodes: [],
    episode: {},
};

export const initialDanceState = {
    dances: [],
    dance: {},
    filters: {
        sortBy: 'episodeDesc',
        styles: [],
        seasons: [],
        teams: [],
        pros: [],
        hasPictures: 'false',
        weeks: [],
        // score,
        themes: [],
        hasLink: 'false',
        //scores: []
    },
};

export const initialJudgeState = {
    judges: [],
    judge: {},
};

export const initialScoreState = {
    scores: [],
    score: {},
};

export const initialDancerState = {
    dancers: [],
    dancer: {},
};

export const initialTourState = {
    tours: [],
    tourCast: [],
    tour: {},
    castMember: {},
};

export const initialUserState = {
    users: [],
    user: {},
    filters: {
        sortBy: 'username',
        pros: [],
        teams: [],
        // birthdayMonth ??
    },
};
