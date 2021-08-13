export const ACTIONS = {
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
    IS_LOGGED_IN: 'IS_LOGGED_IN'
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