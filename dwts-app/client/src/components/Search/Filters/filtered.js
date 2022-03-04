import { getAge } from '../../shared/functions';

export const filterPros = (pros, filters) => {
    //const test = pros.filter()
    //console.log(filters);

    const filterKeys = Object.keys(filters);
    const arr = pros.filter((pro) => {
        return filterKeys.every((key) => {
            switch (key) {
                case 'gender':
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
