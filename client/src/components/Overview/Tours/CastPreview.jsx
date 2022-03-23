import { Avatar, Box, Stack, Typography } from '@mui/material';

function CastPreview(props) {
    const { item } = props;

    return (
        <Box>
            <Stack alignItems="center">
                <Avatar
                    sx={{ height: 30, width: 30 }}
                    src={item.cover_pic}
                ></Avatar>
                <Typography sx={{ fontSize: 12 }}>{item.first_name}</Typography>
            </Stack>
        </Box>
    );
}

export default CastPreview;
