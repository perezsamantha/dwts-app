import { getNumberOfPerfects, getNumberOfWins } from '../../shared/functions';

export const getPerfectsByTeam = (teams) => {
    if (!teams || teams.length === 0) {
        return [];
    }
    teams.sort((a, b) => {
        if (a.season_id > b.season_id) {
            return 1;
        } else if (a.season_id < b.season_id) {
            return -1;
        } else {
            return 0;
        }
    });

    const categorizeByPerfects = teams.reduce((acc, item) => {
        const numPerfects = getNumberOfPerfects(item.dances);
        const found = acc.find((a) => a.key === numPerfects);

        if (found) {
            found.data.push(item);
        } else {
            acc.push({ key: numPerfects, data: [item] });
        }

        return acc;
    }, []);

    let perfects = categorizeByPerfects;

    perfects.sort((a, b) => {
        if (a.key > b.key) {
            return -1;
        } else if (a.key < b.key) {
            return 1;
        } else {
            return 0;
        }
    });

    return perfects;
};

export const getPerfectsByPro = (pros) => {
    if (!pros || pros.length === 0) {
        return [];
    }

    const categorizeByPerfects = pros.reduce((acc, item) => {
        const numPerfects = getNumberOfPerfects(item.dances);
        const found = acc.find((a) => a.key === numPerfects);

        if (found) {
            found.data.push(item);
        } else {
            acc.push({ key: numPerfects, data: [item] });
        }

        return acc;
    }, []);

    let perfects = categorizeByPerfects;

    perfects.sort((a, b) => {
        if (a.key > b.key) {
            return -1;
        } else if (a.key < b.key) {
            return 1;
        } else {
            return 0;
        }
    });

    return perfects;
};

export const getWinsByPro = (pros) => {
    if (!pros || pros.length === 0) {
        return [];
    }

    const categorizeByWins = pros.reduce((acc, item) => {
        const numWins = getNumberOfWins(item.teams);
        const found = acc.find((a) => a.key === numWins);

        if (found) {
            found.data.push(item);
        } else {
            acc.push({ key: numWins, data: [item] });
        }

        return acc;
    }, []);

    let wins = categorizeByWins;

    wins.sort((a, b) => {
        if (a.key > b.key) {
            return -1;
        } else if (a.key < b.key) {
            return 1;
        } else {
            return 0;
        }
    });

    return wins;
};

export const getSeasonsAsPro = (pros) => {
    if (!pros || pros.length === 0) {
        return [];
    }

    const categorizeBySeasonsAsPro = pros.reduce((acc, item) => {
        const found = acc.find((a) => a.key === item?.teams?.length);

        if (found) {
            found.data.push(item);
        } else {
            acc.push({ key: item?.teams?.length, data: [item] });
        }

        return acc;
    }, []);

    let seasons = categorizeBySeasonsAsPro;

    seasons.sort((a, b) => {
        if (a.key > b.key) {
            return -1;
        } else if (a.key < b.key) {
            return 1;
        } else {
            return 0;
        }
    });

    return seasons;
};
