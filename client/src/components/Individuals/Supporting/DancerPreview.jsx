import { Avatar, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCeleb, getPro, getTeam } from '../../shared/functions';

function DancerPreview(props) {
    const { dancer, type } = props;
    const celebs = useSelector((state) => state.celebs.celebs);
    const pros = useSelector((state) => state.pros.pros);
    const teams = useSelector((state) => state.teams.teams);

    let team,
        celeb,
        pro = {};

    switch (type) {
        case 'team':
            team = getTeam(dancer.team_id, teams);
            celeb = getCeleb(team.celeb_id, celebs);
            pro = getPro(team.pro_id, pros);
            return (
                <Stack alignItems="center" spacing={1}>
                    <Avatar
                        src={team.cover_pic}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Stack>
                        <Typography>{celeb.first_name} &</Typography>
                        <Typography>{pro.first_name}</Typography>
                    </Stack>
                </Stack>
            );
        case 'pro':
            pro = getPro(dancer.pro_id, pros);
            return (
                <Stack alignItems="center" spacing={1}>
                    <Avatar
                        src={pro.cover_pic}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Typography>{pro.first_name}</Typography>
                </Stack>
            );
        case 'celeb':
            celeb = getCeleb(dancer.celeb_id, celebs);
            return (
                <Stack alignItems="center" spacing={1}>
                    <Avatar
                        src={celeb.cover_pic}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Typography>{celeb.first_name}</Typography>
                </Stack>
            );
        default:
            return <></>;
    }

    // TODO: indicate if background dancer
}

export default DancerPreview;
