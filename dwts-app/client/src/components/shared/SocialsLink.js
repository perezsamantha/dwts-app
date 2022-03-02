import { Link } from '@mui/material';

function SocialsLink(props) {
    const { platform, username } = props;

    return (
        <Link
            href={'https://www.' + platform + '.com' + username}
            target="_blank"
            rel="noopener"
            underline="none"
        >
            @{username}
        </Link>
    );
}

export default SocialsLink;
