import {logInReducer, logOutReducer} from "./auth-reducers";
import {combineReducers} from "redux";
import {wordGetter} from './wordGetter'
import {colorReducer} from "./colors";

export const allReducers = combineReducers({
    logout: logOutReducer,
    login: logInReducer,
    wordsGetter: wordGetter,
    bg: colorReducer
})