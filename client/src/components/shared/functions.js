import { monthNames } from '../../constants/dropdowns';

export const convertDate = (val) => {
    if (val === null) {
        return '';
    }

    const date = new Date(val);

    return (
        (date.getUTCMonth() > 8
            ? date.getUTCMonth() + 1
            : '0' + (date.getUTCMonth() + 1)) +
        '/' +
        (date.getUTCDate() > 9 ? date.getUTCDate() : '0' + date.getUTCDate()) +
        '/' +
        date.getUTCFullYear()
    );
};

export const getShortDate = (val) => {
    if (val === null) {
        return '';
    }

    const date = new Date(val);

    return (
        date.getUTCMonth() +
        1 +
        '/' +
        date.getUTCDate() +
        '/' +
        (date.getUTCFullYear() % 100)
    );
};

// export const getMonthAndDay = (val) => {
//     const date = new Date(val);
//     const month = date.getMonth();
//     const i = date.getDate();

//     let monthStr,
//         dateStr = '';

//     monthStr = monthNames[month];

//     if (i === null) {
//         dateStr = '';
//     }
//     var j = i % 10,
//         k = i % 100;
//     if (j === 1 && k !== 11) {
//         dateStr = i + 'st';
//     } else if (j === 2 && k !== 12) {
//         dateStr = i + 'nd';
//     } else if (j === 3 && k !== 13) {
//         dateStr = i + 'rd';
//     } else {
//         dateStr = i + 'th';
//     }

//     return monthStr + ' ' + dateStr;
// };

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
    const month = date.getUTCMonth();
    const i = date.getUTCDate();
    const year = date.getUTCFullYear();

    let monthStr,
        dateStr = '';

    monthStr = monthNames[month];

    if (i === null) {
        dateStr = '';
    }
    // var j = i % 10,
    //     k = i % 100;
    // if (j === 1 && k !== 11) {
    //     dateStr = i + 'st';
    // } else if (j === 2 && k !== 12) {
    //     dateStr = i + 'nd';
    // } else if (j === 3 && k !== 13) {
    //     dateStr = i + 'rd';
    // } else {
    //     dateStr = i + 'th';
    // }
    dateStr = i;

    return monthStr + ' ' + dateStr + ', ' + year;
};

export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getUTCFullYear();
    var m = today.getMonth() - birthDate.getUTCMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getUTCDate())) {
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

export const getSeasonAndWeek = (episode) => {
    if (!episode) {
        return '';
    }

    let str = '';

    if (episode?.night) {
        str = `Season ${episode.season_id} \u2022 Week ${episode.week} \u2022 Night ${episode.night}`;
    } else {
        str = `Season ${episode.season_id} \u2022 Week ${episode.week}`;
    }

    return str;
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
    if (!celeb || !pro) {
        return '';
    }

    const celebName = celeb.first_name;
    const proName = pro.first_name;
    return celebName + ' & ' + proName;
};

export const getAverageScore = (dances) => {
    if (!dances || typeof dances === 'undefined' || dances.length === 0) {
        return 0;
    }

    let avgScore = 0;

    let scoresByDance;
    let totalScore;
    let numScores = 0;
    let allScores = [];

    dances.forEach((dance) => {
        scoresByDance = [];
        totalScore = 0;

        dance.scores.forEach((score) => {
            scoresByDance.push(score.value);
        });

        if (scoresByDance.length !== 0) {
            totalScore = scoresByDance.reduce((a, b) => a + b);

            allScores.push(totalScore);
        }
    });

    numScores = allScores.length;
    if (allScores.length !== 0) {
        avgScore = allScores.reduce((a, b) => a + b) / numScores;
    }

    return Math.round(avgScore * 1000) / 1000;
};

// ✅ using array of score objects instead of array of plain values
export const getTotalScore = (scores) => {
    if (!scores || typeof scores === 'undefined' || scores.length === 0) {
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

export const getNumberOfWins = (teams) => {
    if (!teams || typeof teams === 'undefined' || teams.length === 0) {
        return 0;
    }

    let numWins = 0;

    teams.forEach((team) => {
        if (team.placement && team.placement === 1) {
            numWins++;
        }
    });

    return numWins;
};

export const getAveragePlacement = (teams) => {
    if (!teams || typeof teams === 'undefined' || teams.length === 0) {
        return 0;
    }

    let avgPlacement = 0;
    let numPlacements = 0;
    let placements = [];

    teams.forEach((team) => {
        if (team.placement) {
            placements.push(team.placement);
        }
    });

    if (placements.length !== 0) {
        numPlacements = placements.length;
        avgPlacement = placements.reduce((a, b) => a + b) / numPlacements;
    }

    return Math.round(avgPlacement * 100) / 100;
};

export const getNumberOfTens = (dances) => {
    if (!dances || typeof dances === 'undefined' || dances.length === 0) {
        return 0;
    }

    let numTens = 0;

    dances.map((dance) =>
        dance.scores.map((score) =>
            Number(score.value) === 10 ? numTens++ : null
        )
    );

    return numTens;
};

export const getNumberOfPerfects = (dances) => {
    if (!dances || typeof dances === 'undefined') {
        return 0;
    }

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

export const getDanceName = (dance) => {
    if (!dance || typeof dance === 'undefined') {
        return '';
    }

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
    if (!dance || typeof dance === 'undefined') {
        return '';
    }

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
    if (!scores || typeof scores === 'undefined' || scores.length === 0) {
        return 0;
    }

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

    return Math.round(avgScore * 100) / 100;
};

export const isPerfect = (scores) => {
    if (!scores || typeof scores === 'undefined' || scores.length === 0) {
        return false;
    }

    let totalScore;
    const numScores = scores.length;

    totalScore = scores.reduce((a, b) => a + b.value, 0);

    if (totalScore === numScores * 10 && totalScore !== 0) {
        return true;
    } else {
        return false;
    }
};
