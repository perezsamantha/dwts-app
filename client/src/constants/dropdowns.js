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
].sort((a, b) => a.localeCompare(b));

let seasons = Array.from({ length: 30 }, (_, i) => i + 1);
seasons.splice(27, 0, 27.5);

export const seasonNumbers = seasons;

export const weeks = Array.from({ length: 11 }, (_, i) => i + 1);

export const placements = Array.from({ length: 16 }, (_, i) => i + 1);

export const runningOrders = Array.from({ length: 16 }, (_, i) => i + 1);

export const scores = Array.from({ length: 10 }, (_, i) => i + 1);

export const themes = ['Disney', 'Switch-Up', 'Halloween', 'Trio'].sort(
    (a, b) => a.localeCompare(b)
);

// 4'0 to 7'3
// lower it if doing juniors by height during season ??
export const heightsInInches = Array.from({ length: 40 }, (_, i) => i + 48);

export const agesInYears = Array.from({ length: 101 }, (_, i) => i);

export const hosts = ['Tom Bergeron', 'Tyra Banks'];

export const cohosts = [
    'Lisa Canning',
    'Samantha Harris',
    'Brooke Burke',
    'Erin Andrews',
];

export const genders = [
    'Male',
    'Female',
    //'Other',
];

export const scoreOrders = Array.from({ length: 5 }, (_, i) => i + 1);

export const roles = ['fan', 'pro', 'moderator', 'admin'];

export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const months = Array.from({ length: 12 }, (_, i) => i + 1);

export const days = Array.from({ length: 31 }, (_, i) => i + 1);
