import { Card, Divider, Grid, Typography } from '@mui/material';
import { pros, celebs, fans } from './sampleData';
import { getBirthdays, getDateName, getMonthName } from './birthdayFunctions';
import ProPreview from './ProPreview';
import CelebPreview from './CelebPreview';
import FanPreview from './FanPreview';

function Birthdays() {
    // TODO: make sure it works in different time zones
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();

    const todayStr = getMonthName(month) + ' ' + getDateName(date);

    const proBirthdays = getBirthdays(pros, today);
    const celebBirthdays = getBirthdays(celebs, today);
    const fanBirthdays = getBirthdays(fans, today);

    const noBirthdays =
        proBirthdays.length === 0 &&
        celebBirthdays.length === 0 &&
        fanBirthdays.length === 0;

    // TODO: eventually load in data and change pros/fans to links

    return (
        !noBirthdays && (
            <Card elevation={3}>
                <Typography variant="h5">Today's Birthdays</Typography>
                <Divider />

                {proBirthdays.length !== 0 && (
                    <>
                        <Typography variant="h6">Pros</Typography>
                        <Grid container spacing={2} mb={1}>
                            {proBirthdays.map((pro, index) => (
                                <Grid item key={index}>
                                    <ProPreview pro={pro} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {celebBirthdays.length !== 0 && (
                    <>
                        <Typography variant="h6">Celebs</Typography>
                        <Grid container spacing={2} mb={1}>
                            {celebBirthdays.map((celeb, index) => (
                                <Grid item key={index}>
                                    <CelebPreview celeb={celeb} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {fanBirthdays.length !== 0 && (
                    <>
                        <Typography variant="h6">Fans</Typography>
                        <Grid container spacing={2} mb={1}>
                            {fanBirthdays.map((fan, index) => (
                                <Grid item key={index}>
                                    <FanPreview fan={fan} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Card>
        )
    );
}

export default Birthdays;
