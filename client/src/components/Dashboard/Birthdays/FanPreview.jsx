import { Avatar, Stack, Typography } from '@mui/material';

function FanPreview(props) {
    const { fan } = props;
    return (
        <Stack alignItems="center">
            <Avatar src={fan.cover_pic}></Avatar>
            <Typography variant="body1">{fan.nickname || '.'}</Typography>
            <Typography variant="body2">@{fan.username}</Typography>
        </Stack>
    );
}

export default FanPreview;
