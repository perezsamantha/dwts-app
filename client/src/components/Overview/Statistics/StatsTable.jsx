import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import { getFullName, getFullTeamName } from '../../shared/functions';

function StatsTable(props) {
    const { arr, type } = props;

    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: 'transparent',
                marginTop: 1,
                marginBottom: 1,
            }}
            elevation={0}
        >
            <Table>
                <TableBody>
                    {arr.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                'td, th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{item.key}</TableCell>
                            <TableCell>
                                {item.data
                                    .map((item) =>
                                        type === 'pro'
                                            ? getFullName(item)
                                            : type === 'team'
                                            ? getFullTeamName(
                                                  item.celeb,
                                                  item.pro
                                              )
                                            : ''
                                    )
                                    .join(', ')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StatsTable;
