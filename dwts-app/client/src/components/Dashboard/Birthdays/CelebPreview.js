import { Avatar, Stack, Typography } from '@mui/material';

function CelebPreview(props) {
    const { celeb } = props;
    return (
        <Stack alignItems="center">
            <Avatar></Avatar>
            <Typography variant="body1">{celeb.first_name}</Typography>
            <Typography variant="body2">{celeb.last_name}</Typography>
            {/* socials? since they don't have their own page */}
        </Stack>
    );
}

export default CelebPreview;
