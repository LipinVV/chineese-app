import {logOutReducer} from "./logout";
import {combineReducers} from "redux";

export const allReducers = combineReducers({
    logout: logOutReducer,
})