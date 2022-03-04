import { getAge } from '../../shared/functions';

export const filterTeams = (teams, filters) => {
    console.log(filters);
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

    console.log(arr);

    return arr;
};

export const filterPros = (pros, filters) => {
    //const test = pros.filter()
    //console.log(filters);

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

    //console.log(arr);

    return arr;
};
