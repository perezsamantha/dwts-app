import { Avatar, Stack, Typography } from '@mui/material';

function ProPreview(props) {
    const { pro } = props;
    return (
        <Stack alignItems="center">
            <Avatar src={pro.cover_pic}></Avatar>
            <Typography variant="body1">{pro.first_name}</Typography>
            <Typography variant="body2">{pro.last_name}</Typography>
        </Stack>
    );
}

export default ProPreview;
