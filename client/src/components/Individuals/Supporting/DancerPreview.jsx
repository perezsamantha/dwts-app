import { Avatar, Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function DancerPreview(props) {
    const { dancer, type } = props;

    let team,
        celeb,
        pro = {};

    switch (type) {
        case 'team':
            team = dancer.team;
            celeb = dancer.team.celeb;
            pro = dancer.team.pro;
            return (
                <Box
                    component={motion.div}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        scale: 1.075,
                        transition: { duration: 0.3 },
                    }}
                >
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
                </Box>
            );
        case 'pro':
            pro = dancer.pro;
            return (
                <Box
                    component={motion.div}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        scale: 1.075,
                        transition: { duration: 0.3 },
                    }}
                >
                    <Stack alignItems="center" spacing={1}>
                        <Avatar
                            src={pro.cover_pic}
                            sx={{ width: 50, height: 50 }}
                        />
                        <Stack>
                            <Typography
                                color={
                                    dancer.is_background
                                        ? 'text.secondary'
                                        : 'text.primary'
                                }
                            >
                                {pro.first_name}
                            </Typography>
                            <Typography
                                color={
                                    dancer.is_background
                                        ? 'text.secondary'
                                        : 'text.primary'
                                }
                            >
                                {pro.last_name}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            );
        case 'celeb':
            celeb = dancer.celeb;
            return (
                <Box
                    component={motion.div}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        scale: 1.075,
                        transition: { duration: 0.3 },
                    }}
                >
                    <Stack alignItems="center" spacing={1}>
                        <Avatar
                            src={celeb.cover_pic}
                            sx={{ width: 50, height: 50 }}
                        />
                        <Stack>
                            <Typography>{celeb.first_name}</Typography>
                            <Typography>{celeb.last_name}</Typography>
                        </Stack>
                    </Stack>
                </Box>
            );
        default:
            return <></>;
    }

    // TODO: indicate if background dancer
}

export default DancerPreview;
