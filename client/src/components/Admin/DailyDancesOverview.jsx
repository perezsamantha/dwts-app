import { useEffect } from 'react';
import {
    Card,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancesWithoutData } from '../../actions/dances';
import { getDanceName } from '../shared/functions';

function DailyDancesOverview() {
    const dispatch = useDispatch();
    const dances = useSelector((state) => state.dances.dances);
    const loading = useSelector((state) => state.loading.DANCESEARCH);

    useEffect(() => {
        dispatch(fetchDancesWithoutData());
    }, [dispatch]);

    function GetDates(startDate, daysToAdd) {
        var arrDates = [];

        for (var i = 0; i <= daysToAdd; i++) {
            var currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            arrDates.push(currentDate);
            // aryDates.push(
            //     DayAsString(currentDate.getDay()) +
            //         ', ' +
            //         MonthAsString(currentDate.getMonth()) +
            //         ' ' +
            //         currentDate.getDate() +
            //         ' ' +
            //         currentDate.getFullYear()
            // );
        }

        return arrDates;
    }

    function MonthAsString(monthIndex) {
        var month = new Array(12);
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';

        return month[monthIndex];
    }

    function DayAsString(dayIndex) {
        var weekdays = new Array(7);
        weekdays[0] = 'Sunday';
        weekdays[1] = 'Monday';
        weekdays[2] = 'Tuesday';
        weekdays[3] = 'Wednesday';
        weekdays[4] = 'Thursday';
        weekdays[5] = 'Friday';
        weekdays[6] = 'Saturday';

        return weekdays[dayIndex];
    }

    const startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const arrDates = GetDates(startDate, 7);

    const withinWeek = (date) => {
        return (
            date >= startDate.setHours(0, 0, 0, 0) &&
            date <= endDate.setHours(0, 0, 0, 0)
        );
    };

    let arr = [];
    const weekInAdvance = [];

    if (!loading) {
        arr = dances.filter((dance) => dance.daily_date);
        arr = arr.filter((dance) => {
            const date = new Date(dance.daily_date);
            return withinWeek(date);
        });

        arrDates.forEach((date) => {
            const dance = arr.find((d) => {
                const dailyDate = new Date(d.daily_date);
                date.setHours(0, 0, 0, 0);
                if (dailyDate > date) {
                    return false;
                } else if (dailyDate < date) {
                    return false;
                } else {
                    return true;
                }
            });

            weekInAdvance.push({
                date:
                    // DayAsString(date.getDay()) +
                    // ', ' +
                    MonthAsString(date.getMonth()) + ' ' + date.getDate(),
                dance: dance ? getDanceName(dance) : 'No dance selected',
            });
        });
    }

    return (
        <Card elevation={3} my={2}>
            <Typography variant="h5">
                Daily Dances - Week at a glance
            </Typography>
            <Divider />

            <Table aria-label="daily-dance-table">
                {/* <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5">Day</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">Dance</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {weekInAdvance.map((day, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="right">
                                <Typography noWrap>{day.date}</Typography>
                            </TableCell>
                            <TableCell sx={{ paddingLeft: 2 }}>
                                <Typography>{day.dance}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default DailyDancesOverview;
