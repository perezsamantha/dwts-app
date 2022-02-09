import { combineReducers } from "redux";

import auth from './auth';
import fans from './fans';
import loading from './loading';
import data from './data';

export const reducers = combineReducers({ auth, fans, loading, data });