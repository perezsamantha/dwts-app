import { heightsInInches } from '../constants/dropdowns';

export const initialCelebState = {
    celebs: [],
    celeb: {
        id: null,
        cover_pic: null,
        first_name: null,
        last_name: null,
        birthday: null,
        height: null,
        gender: null,
        twitter: null,
        instagram: null,
        tiktok: null,
        is_junior: false,
    },
};

export const initialProState = {
    pros: [],
    pro: {
        id: null,
        cover_pic: null,
        first_name: null,
        last_name: null,
        birthday: null,
        height: null,
        gender: null,
        twitter: null,
        instagram: null,
        tiktok: null,
        is_junior: false,
    },
    filters: {
        sortBy: 'firstName',
        age: [0, 100],
        height: [
            heightsInInches[0],
            heightsInInches[heightsInInches.length - 1],
        ],
        gender: ['Male', 'Female'],
        showJuniors: 'false',
    },
};

export const initialSeasonState = {
    seasons: [],
    season: {
        id: null,
        cover_pic: null,
        host: null,
        cohost: null,
        extra: null,
    },
};

export const initialTeamState = {
    teams: [],
    team: {
        id: null,
        cover_pic: null,
        celeb_id: null,
        pro_id: null,
        mentor_id: null,
        season_id: null,
        placement: null,
        team_name: null,
        extra: null,
    },
    filters: {
        sortBy: 'seasonDesc',
        seasons: [],
        placements: [],
        hasPictures: 'false',
        pros: [],
    },
};

export const initialEpisodeState = {
    episodes: [],
    episode: {
        id: null,
        season_id: null,
        week: null,
        night: null,
        theme: null,
        date: null,
        extra: null,
    },
};

export const initialDanceState = {
    dances: [],
    dance: {
        id: null,
        episode_id: null,
        style: null,
        running_order: null,
        song_title: null,
        song_artist: null,
        is_main: true,
        daily_date: null,
        link: null,
        extra: null,
    },
    filters: {
        sortBy: 'episodeDesc',
        styles: [],
        seasons: [],
        teams: [],
        pros: [],
        hasPictures: 'false',
        weeks: [],
        themes: [],
        hasLink: 'false',
        isPerfect: 'false',
        isMain: 'false',
    },
};

export const initialJudgeState = {
    judges: [],
    judge: {
        id: null,
        first_name: null,
        last_name: null,
        birthday: null,
    },
};

export const initialScoreState = {
    scores: [],
    score: {
        id: null,
        dance_id: null,
        judge_id: null,
        value: null,
        order: null,
        is_guest: false,
    },
};

export const initialDancerState = {
    dancers: [],
    dancer: {
        id: null,
        dance_id: null,
        team_id: null,
        pro_id: null,
        celeb_id: null,
        is_background: false,
        extra: null,
    },
};

export const initialTourState = {
    tours: [],
    tourCast: [],
    tour: {
        id: null,
        cover_pic: null,
        name: null,
        season_id: null,
        first_show: new Date().toISOString(),
        last_show: new Date().toISOString(),
        extra: null,
    },
    castMember: {
        id: null,
        tour_id: null,
        pro_id: null,
        celeb_id: null,
        is_swing: false,
        extra: null,
    },
};

export const initialUserState = {
    users: [],
    user: {
        id: null,
        cover_pic: null,
        username: null,
        email: null,
        password: null,
        email_verified: false,
        nickname: null,
        watching_since: null,
        instagram: null,
        twitter: null,
        tiktok: null,
        birthday_month: null,
        birthday_day: null,
        role: 'fan',
    },
    filters: {
        sortBy: 'username',
        pros: [],
        teams: [],
    },
};

export const initialActivityState = {
    likes: [],
};
