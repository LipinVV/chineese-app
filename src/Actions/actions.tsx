import {wordCard} from "../types/types";

export const ACTIONS = {
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
    IS_LOGGED_IN: 'IS_LOGGED_IN',
    GET_ALL_WORDS: 'GET_ALL_WORDS'
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

