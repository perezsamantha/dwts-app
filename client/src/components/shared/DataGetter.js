import { useSelector } from 'react-redux';
import * as tableType from '../../constants/tableTypes';

function DataGetter(props) {
    const celebs = useSelector((state) => state.celebs.celebs);
    const pros = useSelector((state) => state.pros.pros);
    const teams = useSelector((state) => state.teams.teams);
    const seasons = useSelector((state) => state.seasons.seasons);
    const episodes = useSelector((state) => state.episodes.episodes);
    const judges = useSelector((state) => state.judges.judges);
    const dances = useSelector((state) => state.dances.dances);
    const tours = useSelector((state) => state.tours.tours);
    const type = props.type;
    const id = props.id;

    let string;

    switch (type) {
        case tableType.CELEB:
            celebs.find((celeb) =>
                celeb.id === id
                    ? (string = `${celeb.first_name} ${celeb?.last_name}`)
                    : ''
            );
            break;
        case tableType.PRO:
            pros.find((pro) =>
                pro.id === id
                    ? (string = `${pro.first_name} ${pro?.last_name}`)
                    : ''
            );
            break;
        case tableType.SEASON:
            seasons.find((season) =>
                season.id === id ? (string = `${season.id}`) : ''
            );
            break;
        case tableType.TEAM:
            let celebName, proName;
            teams.find((team) =>
                team.id === id
                    ? celebs.find((celeb) =>
                          celeb.id === team.celeb_id
                              ? (celebName = `${celeb.first_name}`)
                              : ''
                      )
                    : ''
            );
            teams.find((team) =>
                team.id === id
                    ? pros.find((pro) =>
                          pro.id === team.pro_id
                              ? (proName = `${pro.first_name}`)
                              : ''
                      )
                    : ''
            );
            string = celebName + ' & ' + proName;
            break;
        case tableType.EPISODE:
            episodes.map((episode) =>
                episode.id === id
                    ? seasons.map((season) =>
                          season.id === episode.season_id && episode.night
                              ? (string = `S${season.id} W${episode?.week} N${episode?.night}`)
                              : season.id === episode.season_id
                              ? (string = `S${season.id} W${episode?.week}`)
                              : ''
                      )
                    : ''
            );
            break;
        case tableType.JUDGE:
            judges.map((judge) =>
                judge.id === id
                    ? (string = `${judge.first_name} ${judge?.last_name}`)
                    : ''
            );
            break;
        case tableType.DANCE:
            let episodeNumber, danceName;
            // dances.map((dance) =>
            //     dance.id === id
            //         ? (episodeNumber = DataGetter({
            //               id: dance.episode_id,
            //               type: tableType.EPISODE,
            //           }))
            //         : ''
            // );
            dances.map((dance) =>
                dance.id === id
                    ? episodes.map((episode) =>
                          episode.id === dance.episode_id
                              ? seasons.map((season) =>
                                    season.id === episode.season_id &&
                                    episode.night
                                        ? (episodeNumber = `S${season.id} W${episode?.week} N${episode?.night}`)
                                        : season.id === episode.season_id
                                        ? (episodeNumber = `S${season.id} W${episode?.week}`)
                                        : ''
                                )
                              : ''
                      )
                    : ''
            );
            dances.map((dance) =>
                dance.id === id
                    ? (danceName = `${dance.style} - ${dance?.song_title} by ${dance?.song_artist}`)
                    : ''
            );
            string = danceName + ' | ' + episodeNumber;
            break;

        case tableType.TOUR:
            tours.find((team) =>
                team.id === id
                    ? (string = `${team.name} (Season ${team.season_id})`)
                    : ''
            );
            break;

        default:
    }

    return string || '';
}

export default DataGetter;