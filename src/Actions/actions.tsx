import {wordCard} from "../types/types";

export const ACTIONS = {
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
    IS_LOGGED_IN: 'IS_LOGGED_IN',
    GET_ALL_WORDS: 'GET_ALL_WORDS',
    GET_WHITE_COLOR: 'GET_WHITE_COLOR',
    GET_RED_COLOR: 'GET_RED_COLOR'
}

export const isLoggedOut = (status: boolean) => {
    return {
        type: ACTIONS.IS_LOGGED_OUT,
        payload: status
    }
}

export const isLoggedIn = (status: boolean) => {
    return {
        type: ACTIONS.IS_LOGGED_IN,
        payload: status
    }
}

export const getAllWords = (data: wordCard) => {
    return {
        type: ACTIONS.GET_ALL_WORDS,
        payload: data
    }
}

export const getColor = (color : any) => {
    return {
        type: ACTIONS.GET_WHITE_COLOR,
        payload: color
    }
}

export const getRedColor = (color : any) => {
    return {
        type: ACTIONS.GET_RED_COLOR,
        payload: color
    }
}

