import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Likes(props) {
    const { user, likes } = props;

    if (likes?.length > 0) {
        return likes.find((like) => like === user?.result?.id) ? (
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
}

export default Likes;
