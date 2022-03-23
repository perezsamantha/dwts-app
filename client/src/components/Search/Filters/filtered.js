import { getAge } from '../../shared/functions';

export const filterDances = (dances, filters) => {
    const filterKeys = Object.keys(filters);
    const filtered = dances.filter((dance) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'seasons':
                    return dance.episode.season_id >= filters.seasons[0] &&
                        dance.episode.season_id <= filters.seasons[1]
                        ? true
                        : false;
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

    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'likes': // high to low
                if (a.likes.length > b.likes.length) {
                    return -1;
                } else if (a.likes.length < b.likes.length) {
                    return 1;
                } else {
                    return 0;
                }
            default:
                return 0;
        }
    });

    return filtered;
};

export const filterTeams = (teams, filters) => {
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

    return arr;
};

export const filterPros = (pros, filters) => {
    const filterKeys = Object.keys(filters);
    const filtered = pros.filter((pro) => {
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

    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'firstName':
                return 1;
            case 'lastName':
                let nameA = a.last_name.toUpperCase();
                let nameB = b.last_name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0;
                }
            case 'age': //youngest to oldest
                let ageA = getAge(a.birthday);
                let ageB = getAge(b.birthday);
                if (ageA < ageB) {
                    return -1;
                } else if (ageA > ageB) {
                    return 1;
                } else {
                    return 0;
                }
            case 'height': //shortest to tallest
                if (a.height < b.height) {
                    return -1;
                } else if (a.height > b.height) {
                    return 1;
                } else {
                    return 0;
                }
            // case 'avgPlacement':
            // case 'numPerfects':
            // case 'wins':
            default:
                return 0;
        }
    });

    return filtered;
};

export const filterFans = (fans, filters) => {
    const filterKeys = Object.keys(filters);
    const filtered = fans.filter((fan) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'pros':
                    if (filters.pros.length === 0) {
                        return true;
                    }
                    return filters.pros.every((id) => {
                        return fan.likes.pros.some((pro) => pro.id === id);
                    });
                case 'teams':
                    if (filters.teams.length === 0) {
                        return true;
                    }
                    return filters.teams.every((id) => {
                        return fan.likes.teams.some((team) => team.id === id);
                    });
                default:
                    return true;
            }
        });
    });

    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'username':
                let usernameA = a.username.toUpperCase();
                let usernameB = b.username.toUpperCase();
                if (usernameA < usernameB) {
                    return -1;
                } else if (usernameA > usernameB) {
                    return 1;
                } else {
                    return 0;
                }
            case 'nickname':
                let nicknameA = a.nickname.toUpperCase();
                let nicknameB = b.nickname.toUpperCase();
                if (nicknameA < nicknameB) {
                    return -1;
                } else if (nicknameA > nicknameB) {
                    return 1;
                } else {
                    return 0;
                }
            default:
                return 0;
        }
    });

    return filtered;
};
