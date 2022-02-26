import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const convertDate = (val) => {
    const date = new Date(val);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
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
}

export const convertPlacement = (i) => {
    if (i === null) {
        return '';
    }
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export const Likes = (props) => {
    const item = props.item;
    const user = props.user;

    if (item.likes?.length > 0) {
        return item.likes.find((like) => like === user?.result?.id) ?
            (
                <><FavoriteIcon /></>
            ) : (
                <><FavoriteBorderIcon /></>
            )
    }

    return <><FavoriteBorderIcon /></>;
}