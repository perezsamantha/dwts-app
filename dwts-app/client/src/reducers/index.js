import { combineReducers } from "redux";

import auth from './auth';
import fans from './fans';

export const reducers = combineReducers({ auth, fans });