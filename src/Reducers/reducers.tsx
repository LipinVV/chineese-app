import {logInReducer, logOutReducer} from "./auth-reducers";
import {combineReducers} from "redux";
import {wordGetter} from './wordGetter';


export const allReducers = combineReducers({
    logout: logOutReducer,
    login: logInReducer,
    wordsGetter: wordGetter,
})
