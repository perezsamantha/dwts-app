import { combineReducers } from "redux";

import auth from './auth';
import fans from './fans';
//import teams from './teams';
//import pros from './pros';
//import dances from './dances';
import loading from './loading';
//import celebs from './celebs';
//import seasons from './seasons';
//import judges from './judges';
import data from './data';

export const reducers = combineReducers({ auth, fans, loading, data });