import {logInReducer, logOutReducer} from "./auth-reducers";
import {combineReducers} from "redux";

export const allReducers = combineReducers({
    logout: logOutReducer,
    login: logInReducer,
})