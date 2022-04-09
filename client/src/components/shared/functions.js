import { monthNames } from '../../constants/dropdowns';
//TODO: separate into separate files under functions folder?
export const convertDate = (val) => {
    if (val === null) {
        return '';
    }
    const date = new Date(val);
    return (
        (date.getMonth() > 8
            ? date.getMonth() + 1
            : '0' + (date.getMonth() + 1)) +
        '/' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        '/' +
        date.getFullYear()
    );
};

export const getShortDate = (val) => {
    if (val === null) {
        return '';
    }
    const date = new Date(val);
    return (
        date.getMonth() +
        1 +
        '/' +
        date.getDate() +
        '/' +
        (date.getFullYear() % 100)
    );
};

export const getMonthAndDay = (val) => {
    const date = new Date(val);
    const month = date.getMonth();
    const i = date.getDate();

    let monthStr,
        dateStr = '';

    monthStr = monthNames[month];

    if (i === null) {
        dateStr = '';
    }
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        dateStr = i + 'st';
    } else if (j === 2 && k !== 12) {
        dateStr = i + 'nd';
    } else if (j === 3 && k !== 13) {
        dateStr = i + 'rd';
    } else {
        dateStr = i + 'th';
    }

    return monthStr + ' ' + dateStr;
};

export const getUserBirthday = (month, day) => {
    if (month === null && day === null) {
        return '';
    }

    const i = day;
    let monthStr,
        dateStr = '';

    if (month) {
        monthStr = monthNames[month - 1];
    }

    if (day) {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            dateStr = i + 'st';
        } else if (j === 2 && k !== 12) {
            dateStr = i + 'nd';
        } else if (j === 3 && k !== 13) {
            dateStr = i + 'rd';
        } else {
            dateStr = i + 'th';
        }
    }

    return monthStr + ' ' + dateStr;
};

export const getMonthDayAndYear = (val) => {
    const date = new Date(val);
    const month = date.getMonth();
    const i = date.getDate();
    const year = date.getFullYear();

    let monthStr,
        dateStr = '';

    monthStr = monthNames[month];

    if (i === null) {
        dateStr = '';
    }
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        dateStr = i + 'st';
    } else if (j === 2 && k !== 12) {
        dateStr = i + 'nd';
    } else if (j === 3 && k !== 13) {
        dateStr = i + 'rd';
    } else {
        dateStr = i + 'th';
    }

    return monthStr + ' ' + dateStr + ', ' + year;
};

export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const convertPlacement = (i) => {
    if (i === null) {
        return '';
    }
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + 'st';
    }
    if (j === 2 && k !== 12) {
        return i + 'nd';
    }
    if (j === 3 && k !== 13) {
        return i + 'rd';
    }
    return i + 'th';
};

export const convertHeight = (heightInInches) => {
    if (!heightInInches) {
        return '';
    }
    let feet = Math.floor(heightInInches / 12);
    let inches = heightInInches % 12;

    return feet + `'` + inches;
};

export const getPro = (id, pros) => {
    return pros.find((pro) => pro.id === id);
};

export const getCeleb = (id, celebs) => {
    return celebs.find((pro) => pro.id === id);
};

export const getTeam = (id, teams) => {
    return teams.find((team) => team.id === id);
};

export const getSeasonAndWeek = (episode) => {
    let str = '';

    if (episode?.night) {
        str = `Season ${episode.season_id} \u2022 Week ${episode.week} \u2022 Night ${episode.night}`;
    } else {
        str = `Season ${episode.season_id} \u2022 Week ${episode.week}`;
    }

    return str;
};

export const getFullCelebName = (id, celebs) => {
    const celeb = celebs.find((celeb) => celeb.id === id);
    const celebName = celeb?.last_name
        ? celeb.first_name + ' ' + celeb.last_name
        : celeb.first_name;
    return celebName;
};

export const getFullName = (person) => {
    if (!person) {
        return '';
    }

    let str = '';

    if (person?.last_name) {
        str = person.first_name + ' ' + person.last_name;
    } else {
        str = person.first_name;
    }

    return str;
};

export const getFullTeamName = (celeb, pro) => {
    if (!celeb || !pro) {
        return '';
    }

    const celebName = celeb?.last_name
        ? celeb.first_name + ' ' + celeb.last_name
        : celeb.first_name;
    const proName = pro?.last_name
        ? pro.first_name + ' ' + pro.last_name
        : pro.first_name;
    return celebName + ' & ' + proName;
};

export const getShortTeamName = (celeb, pro) => {
    const celebName = celeb.first_name;
    const proName = pro.first_name;
    return celebName + ' & ' + proName;
};

export const getFullJudgeName = (id, judges) => {
    const judge = judges.find((judge) => judge.id === id);

    const judgeName = judge?.last_name
        ? judge.first_name + ' ' + judge.last_name
        : judge.first_name;
    return judgeName;
};

export const getTeamsByPro = (pro, teams) => {
    const teamsByPro = teams.filter((team) => team.pro_id === pro.id);

    // sort by season (ascending)
    teamsByPro.sort((a, b) => {
        if (a.season_id < b.season_id) {
            return -1;
        } else if (a.season_id > b.season_id) {
            return 1;
        }
        return 0;
    });

    return teamsByPro;
};

// export const getDancesByTeam = (team, dances, dancers, episodes) => {
//     const filteredDancers = dancers.filter(
//         (dancer) => dancer.team_id === team.id
//     );

//     const filteredDances = dances.reduce(function (filtered, dance) {
//         filteredDancers.map((dancer) =>
//             dancer.dance_id === dance.id ? filtered.push(dance) : null
//         );
//         return filtered;
//     }, []);

//     return filteredDances;
// };

// export const sortTeamDancesByWeek = (dances, episodes) => {
//     const sorted = dances.sort((a, b) => {
//         let episodeA = episodes.find((episode) => episode.id === a.episode_id);
//         let episodeB = episodes.find((episode) => episode.id === b.episode_id);
//         if (episodeA.week < episodeB.week) {
//             return -1;
//         } else if (episodeA.week > episodeB.week) {
//             return 1;
//         }
//         return 0;
//     });

//     return sorted;
// };

export const getAverageScore = (dances) => {
    let avgScore = 0;

    let scoresByDance;
    let totalScore;
    let numScores = 0;
    let allScores = [];

    dances.map((dance) => {
        scoresByDance = [];
        totalScore = 0;

        dance.scores.forEach((score) => {
            scoresByDance.push(score.value);
        });

        if (scoresByDance.length !== 0) {
            totalScore = scoresByDance.reduce((a, b) => a + b);

            allScores.push(totalScore);
        }

        return '';
    });

    numScores = allScores.length;
    if (allScores.length !== 0) {
        avgScore = allScores.reduce((a, b) => a + b) / numScores;
    }

    return avgScore;
};

// ✅ using array of score objects instead of array of plain values
export const getTotalScore = (scores) => {
    if (scores.length === 0) {
        return '';
    }

    let totalScore = 0;
    let numScores = 0;

    numScores = scores.length;

    if (scores.length !== 0) {
        totalScore = Object.values(scores).reduce(
            (a, { value }) => a + value,
            0
        );
    }

    return totalScore + '/' + numScores * 10;
};

// export const getScoreByDance = (dance, scores) => {
//     let scoresByDance = [];
//     let totalScore = 0;
//     let numScores = 0;

//     scores.map((score) => {
//         if (score.dance_id === dance.id) {
//             scoresByDance.push(score.value);
//             // leave out guest judge scores??
//         }

//         return '';
//     });

//     numScores = scoresByDance.length;

//     if (scoresByDance.length !== 0) {
//         totalScore = scoresByDance.reduce((a, b) => a + b);
//     }

//     return totalScore + '/' + numScores * 10;
// };

// export const filterScoresByDance = (dance, scores) => {
//     const arr = scores.filter((score) => score.dance_id === dance.id);

//     arr.sort((a, b) => {
//         if (a.order < b.order) {
//             return -1;
//         } else if (a.order > b.order) {
//             return 1;
//         } else {
//             return 0;
//         }
//     });

//     return arr;
// };

export const getNumberOfTens = (dances) => {
    let numTens = 0;

    dances.map((dance) =>
        dance.scores.map((score) =>
            Number(score.value) === 10 ? numTens++ : null
        )
    );

    return numTens;
};

export const getNumberOfPerfects = (dances) => {
    let numPerfects = 0;

    let scoresByDance;
    let totalScore;
    let numScores;

    dances.map((dance) => {
        scoresByDance = [];
        totalScore = 0;
        numScores = 0;

        dance.scores.forEach((score) => {
            scoresByDance.push(score.value);
        });

        numScores = scoresByDance.length;

        if (scoresByDance.length !== 0) {
            totalScore = scoresByDance.reduce((a, b) => a + b);
        }
        if (totalScore === numScores * 10 && totalScore !== 0) {
            numPerfects++;
        }

        return '';
    });

    return numPerfects;
};

// one for all and one for just main dancers where not background??
// export const getDancesByPro = (pro, teams, dances, dancers) => {
//     const filteredDancers = dancers.filter(
//         (dancer) =>
//             (dancer.pro_id === pro.id ||
//                 teams.find(
//                     (team) =>
//                         team.id === dancer.team_id && team.pro_id === pro.id
//                 )) &&
//             dancer.is_background === false
//     );

//     //let filtered = [];

//     const filteredDances = dances.reduce(function (filtered, dance) {
//         filteredDancers.map((dancer) =>
//             dancer.dance_id === dance.id ? filtered.push(dance) : null
//         );
//         return filtered;
//     }, []);

//     return filteredDances;
// };

// export const getDancersByDance = (dance, dancers) => {
//     const filteredDancers = dancers.filter(
//         (dancer) => dancer.dance_id === dance.id
//     );

//     return filteredDancers;
// };

export const getDanceName = (dance) => {
    let str = '';

    const ep = `S${dance.episode.season_id} \u2022 W${dance.episode.week}`;

    const style = `${dance.style}`;

    const song = dance?.song_artist
        ? `${dance.song_title} by ${dance.song_artist}`
        : `${dance.song_title}`;

    str = ep + ' | ' + style + ' - ' + song;

    return str;
};

export const getShortDanceName = (dance) => {
    let str = '';

    const style = `${dance.style}`;

    const song = dance?.song_artist
        ? `${dance.song_title} by ${dance.song_artist}`
        : `${dance.song_title}`;

    str = style + ' - ' + song;

    return str;
};

export const organizeDancers = (dancers) => {
    let organized = [];

    dancers.map((dancer) =>
        dancer.team_id !== null
            ? organized.push(
                  getShortTeamName(dancer.team.celeb, dancer.team.pro)
              )
            : null
    );

    dancers.map((dancer) =>
        dancer.celeb_id !== null
            ? organized.push(getFullName(dancer.celeb))
            : null
    );

    dancers.map((dancer) =>
        dancer.pro_id !== null ? organized.push(dancer.pro.first_name) : null
    );

    return organized;
};

export const getAverageUserScore = (scores) => {
    let avgScore = 0;

    let numScores = 0;
    let totalScores = [];

    scores.forEach((score) => {
        totalScores.push(score.value);
    });

    numScores = totalScores.length;
    if (totalScores.length !== 0) {
        avgScore = totalScores.reduce((a, b) => a + b) / numScores;
    }

    return avgScore;
};
