import { useSelector } from 'react-redux';

export const convertBirthday = (params) => {
    const date = new Date(params.getValue(params.id, 'birthday'));
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
};

export const convertDate = (params) => {
    const date = new Date(params.getValue(params.id, 'date'));
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
};

export const GetCelebName = (id) => {
    const celebs = useSelector(state => state.data.celebs);

    let celebName;
    celebs.map(celeb => celeb.id === id ? celebName = `${celeb.first_name} ${celeb?.last_name}` : '');
    return celebName;
}

export const GetProName = (id) => {
    const pros = useSelector(state => state.data.pros);

    let proName;
    pros.map(pro => pro.id === id ? proName = `${pro.first_name} ${pro?.last_name}` : '');
    return proName;
}

export const GetTeamName = (id) => {
    const teams = useSelector(state => state.data.teams);
    const celebs = useSelector(state => state.data.celebs);
    const pros = useSelector(state => state.data.pros);

    let celebName;
    let proName;
    teams.map(team => team.id === id ? celebs.map(celeb => celeb.id === team.celeb_id ? celebName = `${celeb.first_name}` : '') : '');
    teams.map(team => team.id === id ? pros.map(pro => pro.id === team.pro_id ? proName = `${pro.first_name}` : '') : '');
    return celebName + ' & ' + proName;
}

export const GetSeasonNumber = (id) => {
    const seasons = useSelector(state => state.data.seasons);

    let seasonNumber;
    seasons.map(season => season.id === id ? seasonNumber = `${season.number}` : '');
    return seasonNumber;
}

export const GetEpisodeNumber = (id) => {
    const seasons = useSelector(state => state.data.seasons);
    const episodes = useSelector(state => state.data.episodes);

    let episodeNumber;
    episodes.map(episode =>
        episode.id === id ? seasons.map(season =>
            season.id === episode.season_id && episode.night ? episodeNumber = `S${season.number} W${episode?.week} N${episode?.night}` :
                season.id === episode.season_id ? episodeNumber = `S${season.number} W${episode?.week}` : '') : '');
    return episodeNumber;
}

export const GetJudgeName = (id) => {
    const judges = useSelector(state => state.data.judges);

    let judgeName;
    judges.map(judge => judge.id === id ? judgeName = `${judge.first_name} ${judge?.last_name}` : '');
    return judgeName;
}

export const GetDanceName = (id) => {
    const dances = useSelector(state => state.data.dances);

    let episodeNumber;
    let danceName;
    dances.map(dance => dance.id === id ?
        episodeNumber = GetEpisodeNumber(dance.episode_id) : '');
    dances.map(dance => dance.id === id ?
        danceName = `${dance.style} - ${dance?.song_title} by ${dance?.song_artist}` : ''
    );

    return danceName + ' | ' + episodeNumber;
}