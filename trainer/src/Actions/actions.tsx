export const ACTIONS = {
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
}

export const isLoggedOut = (status: boolean) => {
    return {
        type: ACTIONS.IS_LOGGED_OUT,
        payload: status
    }
}