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
    'Team Dance',
].sort((a, b) => a.localeCompare(b));

let seasons = Array.from({ length: 30 }, (_, i) => i + 1);
seasons.splice(27, 0, 27.5);

export const seasonNumbers = seasons;

export const weeks = Array.from({ length: 11 }, (_, i) => i + 1);

export const placements = Array.from({ length: 16 }, (_, i) => i + 1);

export const runningOrders = Array.from({ length: 16 }, (_, i) => i + 1);

export const scores = Array.from({ length: 10 }, (_, i) => i + 1);

export const themes = [
    'Disney',
    'Switch-Up',
    'Halloween',
    'Trio',
    'Disney: Heroes',
    'Disney: Villains',
    'Janet Jackson',
    'Queen',
    'Britney Spears',
    'Most Memorable Year',
    'Semifinals',
    'Finals',
    'Finale',
    'Premiere',
    'Horror',
    'Grease',
    "'80s",
    'Villains',
    'Icons',
    'Movie',
    'Cast From The Past',
    'Dance-Off',
    'Boy Band & Girl Group',
    'New York City',
    'Vegas',
    'Country',
    'Team Dance',
    'MVP',
    'Ballroom',
    'Latin',
    'Guilty Pleasures',
    'A Night at the Movies',
    'Quarterfinals',
    '400th Episode',
    'First Elimination',
    'TV',
    'Face-Off',
    'Cirque du Soleil',
    'Eras',
    'Showstoppers',
    'Famous Dances',
    "Judges' Team-up Challenge",
    'Hometown Glory',
    'My Jam Monday',
    'Spring Break',
    "America's Choice",
    'Dynamic Duos',
    'Plugged/Unplugged',
    "Celebrity's Pick",
    'Party Anthems',
    'Celebrity Dance Duels',
    'American Icons',
    'Hollywood',
    'Cher',
    'Prom',
    'Best Year of My Life',
    "Len's Side-by-Side Challenge",
    'Stevie Wonder',
    'Iconic Dances',
    "Opponents' Choice",
    'Dance Fusion',
    'Rock',
    'Motown',
    'Classical',
    'Broadway',
    'Instant Choreography',
    'Personal Story',
    'American',
    'Ballroom Greats',
    'Story',
    'Acoustic',
    '200th Episode',
    'Story-telling',
    'Double-score',
    'Marathon',
    'Race to the Semifinals',
    'Road to the Finals',
    'Song from the Year I Was Born',
    'Giving Thanks',
    'Time Machine',
    'Results Show',
    'Exclusive First Look',
].sort((a, b) => a.localeCompare(b));

// 4'0 to 7'3
// lower it if doing juniors by height during season ??
export const heightsInInches = Array.from({ length: 40 }, (_, i) => i + 48);

export const agesInYears = Array.from({ length: 101 }, (_, i) => i);

export const hosts = ['Tom Bergeron', 'Tyra Banks', 'Jordan Fisher'];

export const cohosts = [
    'Lisa Canning',
    'Samantha Harris',
    'Brooke Burke',
    'Erin Andrews',
    'Frankie Muniz',
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
