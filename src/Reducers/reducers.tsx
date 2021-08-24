import {logInReducer, logOutReducer} from "./auth-reducers";
import {combineReducers} from "redux";
import {wordGetter} from './wordGetter'
import {counterReducer} from "./counter";


export const allReducers = combineReducers({
    logout: logOutReducer,
    login: logInReducer,
    wordsGetter: wordGetter,
    incrementPoints: counterReducer,
})
