import { getAge, isPerfect } from '../../shared/functions';

export const filterDances = (dances, filters) => {
    const filterKeys = Object.keys(filters);
    const filtered = dances.filter((dance) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'seasons':
                    if (filters.seasons.length === 0) {
                        return true;
                    }
                    return filters.seasons.includes(dance.episode.season_id)
                        ? true
                        : false;
                case 'weeks':
                    if (filters.weeks.length === 0) {
                        return true;
                    }
                    return filters.weeks.includes(dance.episode.week)
                        ? true
                        : false;
                case 'pros':
                    if (filters.pros.length === 0) {
                        return true;
                    }
                    // this way only returns dances where all selected pros are in the dance (i think)
                    // return filters.pros.every((id) => {
                    //     return dance.dancers.some((dancer) => {
                    //         if (dancer.team) {
                    //             return dancer.team.pro_id === id;
                    //         }
                    //         return dancer.pro_id === id;
                    //     });
                    // });
                    return dance.dancers.some((dancer) => {
                        if (dancer.team) {
                            return filters.pros.includes(dancer.team.pro.id);
                        }
                        return filters.pros.includes(dancer.pro_id);
                    });
                case 'teams':
                    if (filters.teams.length === 0) {
                        return true;
                    }
                    return dance.dancers.some((dancer) =>
                        filters.teams.includes(dancer.team_id)
                    );
                case 'styles':
                    if (filters.styles.length === 0) {
                        return true;
                    }
                    return filters.styles.includes(dance.style) ? true : false;
                case 'themes':
                    if (filters.themes.length === 0) {
                        return true;
                    }
                    return filters.themes.includes(dance.episode.theme)
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
                case 'isPerfect':
                    if (filters.isPerfect === 'false') {
                        return true;
                    } else {
                        return isPerfect(dance.scores) ? true : false;
                    }
                case 'isMain':
                    if (filters.isMain === 'false') {
                        return true;
                    } else {
                        return dance.isMain !== null ? true : false;
                    }
                default:
                    return true;
            }
        });
    });

    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'episodeDesc':
                if (a.episode.date > b.episode.date) {
                    return -1;
                } else if (a.episode.date < b.episode.date) {
                    return 1;
                } else {
                    return 0;
                }
            case 'episodeAsc':
                if (a.episode.date < b.episode.date) {
                    return -1;
                } else if (a.episode.date > b.episode.date) {
                    return 1;
                } else {
                    return 0;
                }
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
                    return filters.pros.includes(team.pro_id);
                case 'seasons':
                    if (filters.seasons.length === 0) {
                        return true;
                    }
                    return filters.seasons.includes(team.season_id)
                        ? true
                        : false;
                case 'placements':
                    if (filters.placements.length === 0) {
                        return true;
                    }
                    return filters.placements.includes(team.placement)
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
                // case 'height':
                //     return pro.height >= filters.height[0] &&
                //         pro.height <= filters.height[1]
                //         ? true
                //         : false;
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
                let firstA = a.first_name.toUpperCase();
                let firstB = b.first_name.toUpperCase();
                if (firstA < firstB) {
                    return -1;
                } else if (firstA > firstB) {
                    return 1;
                } else {
                    return 0;
                }
            case 'lastName':
                let lastA = a.last_name.toUpperCase();
                let lastB = b.last_name.toUpperCase();
                if (lastA < lastB) {
                    return -1;
                } else if (lastA > lastB) {
                    return 1;
                } else {
                    return 0;
                }
            case 'age': //youngest to oldest
                let birthdayA = a.birthday;
                let birthdayB = b.birthday;
                if (birthdayA > birthdayB) {
                    return -1;
                } else if (birthdayA < birthdayB) {
                    return 1;
                } else {
                    return 0;
                }
            // case 'height': //shortest to tallest
            //     if (a.height < b.height) {
            //         return -1;
            //     } else if (a.height > b.height) {
            //         return 1;
            //     } else {
            //         return 0;
            //     }
            // case 'avgPlacement':
            // case 'numPerfects':
            // case 'wins':
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

export const filterFans = (fans, filters) => {
    const filterKeys = Object.keys(filters);
    const filtered = fans.filter((fan) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'pros':
                    if (filters.pros.length === 0) {
                        return true;
                    }
                    return filters.pros.some((id) => {
                        return fan.likes.pros.some((pro) => pro.id === id);
                    });
                case 'teams':
                    if (filters.teams.length === 0) {
                        return true;
                    }
                    return filters.teams.some((id) => {
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
                    if (nicknameA === '.') {
                        return 1;
                    }
                    return -1;
                } else if (nicknameA > nicknameB) {
                    if (nicknameB === '.') {
                        return -1;
                    }
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
