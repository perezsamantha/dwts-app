import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const convertDate = (val) => {
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
    if (j == 1 && k != 11) {
        return i + 'st';
    }
    if (j == 2 && k != 12) {
        return i + 'nd';
    }
    if (j == 3 && k != 13) {
        return i + 'rd';
    }
    return i + 'th';
};

export const Likes = (props) => {
    const { user, likes } = props;

    if (likes.length > 0) {
        return likes.find((like) => like.user_id === user?.result?.id) ? (
            <>
                <FavoriteIcon />
            </>
        ) : (
            <>
                <FavoriteBorderIcon />
            </>
        );
    }

    return (
        <>
            <FavoriteBorderIcon />
        </>
    );
};

// what
export const getFullTeamName = (celeb, pro) => {
    // const { team, celebs, pros } = props;
    // const pro = pros.find((pro) => pro.id === team.pro_id);
    // const celeb = celebs.find((celeb) => celeb.id === team.celeb_id);

    const celebName = celeb?.last_name
        ? celeb.first_name + ' ' + celeb.last_name
        : celeb.first_name;
    const proName = pro?.last_name
        ? pro.first_name + ' ' + pro.last_name
        : pro.first_name;
    return celebName + ' & ' + proName;
};

export const getDancesByTeam = (team, dances, dancers) => {
    const filteredDancers = dancers.filter(
        (dancer) => dancer.team_id === team.id
    );

    let filtered = [];

    const filteredDances = dances.reduce(function (filtered, dance) {
        filteredDancers.map((dancer) =>
            dancer.dance_id === dance.id ? filtered.push(dance) : null
        );
        return filtered;
    }, []);

    return filteredDances;
};

export const getNumberOfTens = (dances, scores) => {
    let numTens = 0;

    // const calculateTens = scores.reduce(function (numTens, score) {
    //     dances.map((dance) => (dance.id === score.dance_id ? numTens++ : null));
    //     return numTens;
    // });
    //console.log(calculateTens);

    dances.map((dance) =>
        scores.map((score) =>
            score.dance_id === dance.id && Number(score.value) === 10
                ? numTens++
                : null
        )
    );

    return numTens;
};

// TODO: num perfect scores

// TODO: all scores per dance
