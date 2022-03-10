import { Box, Link } from '@mui/material';

import { BsFillPlayBtnFill } from 'react-icons/bs';

function DanceLink(props) {
    const { link } = props;
    if (link === null) {
        return '';
    }

    return (
        <Box sx={{ width: 25, height: 25, margin: 'auto' }}>
            <Link
                href={link}
                target="_blank"
                rel="noopener"
                underline="none"
                color="inherit"
            >
                <BsFillPlayBtnFill style={{ width: '100%', height: '100%' }} />
            </Link>
        </Box>
    );
}

export default DanceLink;
