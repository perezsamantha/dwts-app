import { Avatar, Stack, Typography } from '@mui/material';

function CelebPreview(props) {
    const { celeb } = props;
    return (
        <Stack alignItems="center">
            <Avatar src={celeb.cover_pic}></Avatar>
            <Typography variant="body1">{celeb.first_name}</Typography>
            <Typography variant="body2">{celeb.last_name}</Typography>
        </Stack>
    );
}

export default CelebPreview;
