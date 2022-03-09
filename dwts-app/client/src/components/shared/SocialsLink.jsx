import { Link } from '@mui/material';

import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';

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
                    <BsInstagram />
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
                    <BsTwitter />
                </Link>
            );
        case 'tiktok':
            return (
                <Link
                    href={'https://www.' + platform + '.com/' + username}
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    color="inherit"
                >
                    <FaTiktok />
                </Link>
            );
        default:
            return <></>;
    }
}

export default SocialsLink;
