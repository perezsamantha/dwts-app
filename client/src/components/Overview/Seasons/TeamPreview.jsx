import { Box, Stack, Typography } from '@mui/material';

function TeamPreview(props) {
    const { team } = props;
    const { celeb, pro } = team;
    return (
        <Box>
            <Stack alignItems="center">
                {/* <Avatar
                    sx={{ height: 35, width: 35 }}
                    src={team.cover_pic}
                ></Avatar> */}
                <Typography sx={{ fontSize: 12 }} noWrap>
                    {celeb.first_name} &
                </Typography>
                <Typography sx={{ fontSize: 12 }} noWrap>
                    {pro.first_name}
                </Typography>
            </Stack>
        </Box>
    );
}

export default TeamPreview;
