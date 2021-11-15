import {logInReducer, logOutReducer} from "./auth/reducers";
import {combineReducers} from "redux";
import {reducers} from './wordGetter/reducers';
import {incrementPointsReducer} from "./userPoints/reducers";

export const allReducers = combineReducers({
    logout: logOutReducer,
    login: logInReducer,
    wordsGetter: reducers,
    incrementPointsReducer: incrementPointsReducer,
})
