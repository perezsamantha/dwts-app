import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

function DailyDancesOverview() {
    useEffect(() => {
        // load in daily dances and regular dances to see what's been used already
    }, []);

    function GetDates(startDate, daysToAdd) {
        var aryDates = [];

        for (var i = 0; i <= daysToAdd; i++) {
            var currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            aryDates.push(
                DayAsString(currentDate.getDay()) +
                    ', ' +
                    MonthAsString(currentDate.getMonth()) +
                    ' ' +
                    currentDate.getDate() +
                    ' ' +
                    currentDate.getFullYear()
            );
        }

        return aryDates;
    }

    function MonthAsString(monthIndex) {
        //+9-var d = new Date();
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

    var startDate = new Date();
    var aryDates = GetDates(startDate, 7);
    console.log(aryDates);

    return (
        <Box>
            <Typography variant="h5">
                Daily Dances - Week at a glance
            </Typography>

            {aryDates.map((date, index) => (
                <Typography key={index}>{date}</Typography>
            ))}
        </Box>
    );
}

export default DailyDancesOverview;
