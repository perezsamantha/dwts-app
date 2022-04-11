import { Box, Link } from '@mui/material';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';

function SocialsLink(props) {
    const { platform, username } = props;
    if (username === null) {
        return '';
    }

    switch (platform) {
        case 'instagram':
            return (
                <Link
                    href={'https://www.' + platform + '.com/' + username}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="inherit"
                >
                    <Box
                        component={motion.div}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <BsInstagram />
                    </Box>
                </Link>
            );
        case 'twitter':
            return (
                <Link
                    href={'https://www.' + platform + '.com/' + username}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="inherit"
                >
                    <Box
                        component={motion.div}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <BsTwitter />
                    </Box>
                </Link>
            );
        case 'tiktok':
            return (
                <Link
                    href={'https://www.' + platform + '.com/@' + username}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="inherit"
                >
                    <Box
                        component={motion.div}
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <FaTiktok />
                    </Box>
                </Link>
            );
        default:
            return <></>;
    }
}

export default SocialsLink;
