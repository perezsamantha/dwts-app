import { getSeasonAndWeek } from '../../shared/functions';

export const getThrowbacks = (episodes, tours) => {
    let throwbacks = [];
    const today = new Date();

    const isToday = (date) => {
        return (
            date.getUTCDate() === today.getDate() &&
            date.getUTCMonth() === today.getMonth()
        );
    };

    const getYearsAgo = (date) => {
        return today.getYear() - date.getUTCYear();
    };

    episodes.forEach((episode) => {
        const date = new Date(episode.date);

        if (isToday(date)) {
            const yearsAgo = getYearsAgo(date);
            if (yearsAgo > 0) {
                throwbacks.push({
                    yearsAgo: yearsAgo,
                    desc:
                        `${getSeasonAndWeek(episode)}` +
                        (episode.theme ? ` (${episode.theme} Night)` : ''),
                });
            }
        }
    });

    tours.forEach((tour) => {
        const start = new Date(tour.first_show);
        const end = new Date(tour.last_show);

        if (isToday(start)) {
            const yearsAgo = getYearsAgo(start);
            if (yearsAgo > 0) {
                throwbacks.push({
                    yearsAgo: yearsAgo,
                    desc: `${tour.name} Tour kicked off`,
                });
            }
        }

        if (isToday(end)) {
            const yearsAgo = getYearsAgo(end);
            if (yearsAgo > 0) {
                throwbacks.push({
                    yearsAgo: yearsAgo,
                    desc: `${tour.name} Tour completed its run`,
                });
            }
        }
    });

    throwbacks.sort((a, b) => {
        if (a.yearsAgo < b.yearsAgo) {
            return -1;
        } else if (a.yearsAgo > b.yearsAgo) {
            return 1;
        } else {
            return 0;
        }
    });

    return throwbacks;
};
