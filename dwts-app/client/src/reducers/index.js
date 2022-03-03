import { combineReducers } from 'redux';

import auth from './auth';
//import fans from './fans';
import loading from './loading';
import errors from './errors';
//import data from './data';

import celebs from './celebs';
import pros from './pros';
import seasons from './seasons';
import teams from './teams';
import episodes from './episodes';
import dances from './dances';
import judges from './judges';
import scores from './scores';
import dancers from './dancers';
import users from './users';

export const reducers = combineReducers({
    auth,
    loading,
    errors,
    celebs,
    pros,
    seasons,
    teams,
    episodes,
    dances,
    judges,
    scores,
    dancers,
    users,
});
