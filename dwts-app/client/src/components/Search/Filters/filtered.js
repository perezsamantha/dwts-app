import { getAge } from '../../shared/functions';

// TODO: sort before returning arr ???

export const filterDances = (dances, filters) => {
    // console.log(filters);
    const filterKeys = Object.keys(filters);
    const arr = dances.filter((dance) => {
        return filterKeys.every((key) => {
            switch (key) {
                // case 'seasons':
                //     // nest by getting data from episodes
                //     return dance.episode_id >= filters.seasons[0] &&
                //     dance.season_id <= filters.seasons[1]
                //         ? true
                //         : false;
                // case 'pros':
                //     // nest by getting data from teams -> pros
                //     return dance.episode_id >= filters.seasons[0] &&
                //     dance.season_id <= filters.seasons[1]
                //         ? true
                //         : false;
                // case 'teams':
                //     // nest by getting data from teams
                //     return dance.episode_id >= filters.seasons[0] &&
                //     dance.season_id <= filters.seasons[1]
                //         ? true
                //         : false;
                case 'styles':
                    if (filters.styles.length === 0) {
                        return true;
                    }
                    return filters.styles.includes(dance.style) ? true : false;
                case 'themes':
                    if (filters.themes.length === 0) {
                        return true;
                    }
                    return filters.themes.includes(dance.theme) ? true : false;
                case 'runningOrders':
                    return dance.running_order >= filters.runningOrders[0] &&
                        dance.running_order <= filters.runningOrders[1]
                        ? true
                        : false;
                case 'hasPictures':
                    if (filters.hasPictures === 'false') {
                        return true;
                    } else {
                        return dance.pictures !== null ? true : false;
                    }
                case 'hasLink':
                    if (filters.hasLink === 'false') {
                        return true;
                    } else {
                        return dance.link !== null ? true : false;
                    }
                default:
                    return true;
            }
        });
    });

    // console.log(arr);

    return arr;
};

export const filterTeams = (teams, filters) => {
    //console.log(filters);
    const filterKeys = Object.keys(filters);
    const arr = teams.filter((team) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'pros':
                    if (filters.pros.length === 0) {
                        return true;
                    }
                    return filters.pros.includes(team.pro_id) ? true : false;
                case 'seasons':
                    return team.season_id >= filters.seasons[0] &&
                        team.season_id <= filters.seasons[1]
                        ? true
                        : false;
                case 'placements':
                    return team.placement >= filters.placements[0] &&
                        team.placement <= filters.placements[1]
                        ? true
                        : false;
                case 'hasPictures':
                    if (filters.hasPictures === 'false') {
                        return true;
                    } else {
                        return team.pictures !== null ? true : false;
                    }
                default:
                    return true;
            }
        });
    });

    //console.log(arr);

    return arr;
};

export const filterPros = (pros, filters) => {
    const filterKeys = Object.keys(filters);
    const arr = pros.filter((pro) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'gender':
                    if (filters.gender.length === 0) {
                        return true;
                    }
                    return filters.gender.includes(pro.gender) ? true : false;
                case 'height':
                    return pro.height >= filters.height[0] &&
                        pro.height <= filters.height[1]
                        ? true
                        : false;
                case 'age':
                    const age = getAge(pro.birthday);
                    return age >= filters.age[0] && age <= filters.age[1]
                        ? true
                        : false;
                case 'showJuniors':
                    if (filters.showJuniors === 'true') {
                        return true;
                    } else {
                        return !pro.is_junior ? true : false;
                    }
                default:
                    return true;
            }
        });
    });

    return arr;
};
