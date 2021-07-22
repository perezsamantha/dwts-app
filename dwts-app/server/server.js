import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/uploads', express.static('uploads'));

//const prosRouter = require('./routes/pros');
//const usersRouter = require('./routes/users');
import usersRouter from './routes/users.js';
import fansRouter from './routes/fans.js';
import teamsRouter from './routes/teams.js';

//app.use('/pros', prosRouter);
app.use('/users', usersRouter);
app.use('/fans', fansRouter);
app.use('/teams', teamsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

mongoose.set('useFindAndModify', false);