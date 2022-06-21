import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

import { PORT, CLIENT_ORIGIN } from './config.js';
app.use(cookieParser());
app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());

import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import prosRouter from './routes/pros.js';
import dancesRouter from './routes/dances.js';
import seasonsRouter from './routes/seasons.js';
import celebsRouter from './routes/celebs.js';
import judgesRouter from './routes/judges.js';
import episodesRouter from './routes/episodes.js';
import scoresRouter from './routes/scores.js';
import dancersRouter from './routes/dancers.js';
import toursRouter from './routes/tours.js';
import tourCastRouter from './routes/tourCast.js';
import activityRouter from './routes/activity.js';
import pollsRouter from './routes/polls.js';

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/pros', prosRouter);
app.use('/api/dances', dancesRouter);
app.use('/api/seasons', seasonsRouter);
app.use('/api/celebs', celebsRouter);
app.use('/api/judges', judgesRouter);
app.use('/api/episodes', episodesRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/dancers', dancersRouter);
app.use('/api/tours', toursRouter);
app.use('/api/tour_cast', tourCastRouter);
app.use('/api/activity', activityRouter);
app.use('/api/polls', pollsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
