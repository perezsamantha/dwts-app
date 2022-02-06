import { useSelector } from 'react-redux';

export const convertBirthday = (params) => {
    const date = new Date(params.getValue(params.id, 'birthday'));
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
};

export const convertDate = (params) => {
    const date = new Date(params.getValue(params.id, 'date'));
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
};

export const GetCelebName = (params) => {
    const celebs = useSelector(state => state.data.celebs);

    let celebName;
    celebs.map(celeb => celeb.id === params.value ? celebName = `${celeb.first_name} ${celeb?.last_name}` : '');
    return celebName;
}

export const GetProName =(params) => {
    const pros = useSelector(state => state.data.pros);

    let proName;
    pros.map(pro => pro.id === params.value ? proName = `${pro.first_name} ${pro?.last_name}` : '');
    return proName;
}

export const GetSeasonNumber = (params) => {
    const seasons = useSelector(state => state.data.seasons);
    
    let seasonNumber;
    seasons.map(season => season.id === params.value ? seasonNumber = `${season.number}` : '');
    return seasonNumber;
}

export const GetEpisodeNumber = (params) => {
    const seasons = useSelector(state => state.data.seasons);
    const episodes = useSelector(state => state.data.episodes);
    
    let episodeNumber;
    episodes.map(episode => episode.id === params.value ? seasons.map(season => season.id === episode.season_id ? episodeNumber = `${season.number}-${episode?.week}-${episode?.night}` : '') : '');
    return episodeNumber;
}