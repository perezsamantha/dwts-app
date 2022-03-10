import { monthNames } from '../../../constants/dropdowns';

export const getBirthdays = (arr, today) => {
    const isToday = (date) => {
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth()
        );
    };

    return arr.filter((item) => {
        const birthday = new Date(item.birthday);

        return isToday(birthday);
    });
};

export const getMonthName = (i) => {
    return monthNames[i];
};

export const getDateName = (i) => {
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
