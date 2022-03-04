export const styles = [
    'Argentine Tango',
    'Tango',
    'Samba',
    'Salsa',
    'Waltz',
    'Viennese Waltz',
    'Cha Cha',
    'Charleston',
    'Foxtrot',
    'Paso Doble',
    'Jazz',
    'Contemporary',
    'Freestyle',
    'Jive',
    'Rumba',
    'Quickstep',
    'Bollywood',
    'Jitterbug',
    'Mambo',
    'Hip-Hop',
    'Disco',
    'Bolero',
    'Flamenco',
    'Lindy Hop',
    'Fusion',
    'Team',
];

export const seasons = Array.from({ length: 30 }, (_, i) => i + 1);
// juniors?

export const weeks = Array.from({ length: 11 }, (_, i) => i + 1);

// export const placements = Array.from({ length: 16 }, (_, i) => i + 1);

// turn into array of objects?
export const placements = [
    // "1st",
    // "2nd",
    // "3rd",
    // "4th",
    // "5th",
    // "6th",
    // "7th",
    // "8th",
    // "9th",
    // "10th",
    // "11th",
    // "12th",
    // "13th",
    // "14th",
    // "15th",
    // "16th",
    null,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
];

export const themes = ['No theme', 'Disney', 'Switch-Up', 'Halloween', 'Trio'];

export const guestDancers = [];

export const scores = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const runningOrders = [
    // "1st",
    // "2nd",
    // "3rd",
    // "4th",
    // "5th",
    // "6th",
    // "7th",
    // "8th",
    // "9th",
    // "10th",
    // "11th",
    // "12th",
    // "13th",
    // "14th",
    // "15th",
    // "16th",
    null,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
];

// 4'0 to 7'3
// lower it if doing juniors by height during season ??
export const heightsInInches = Array.from({ length: 40 }, (_, i) => i + 48);

export const agesInYears = Array.from({ length: 101 }, (_, i) => i);

export const hosts = [];
export const judges = [];

export const guestJudges = [];

export const genders = [
    //null,
    'Male',
    'Female',
    //'Other',
    // more inclusive?
];

export const scoreOrders = Array.from({ length: 5 }, (_, i) => i + 1);

export const roles = ['fan', 'pro', 'admin'];
