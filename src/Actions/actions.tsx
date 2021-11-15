export const ACTIONS = {
    GET_ALL_WORDS: 'GET_ALL_WORDS',
    GET_TOTAL_POINTS: 'GET_TOTAL_POINTS',
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
    IS_LOGGED_IN: 'IS_LOGGED_IN',
    INCREMENT_USER_POINTS: 'INCREMENT_USER_POINTS',
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

export const getAllWords = (data: { audioUrl: string; pinyin: string; tone: number; definition: string; id: number; word: string; key: string }[]) => {
    return {
        type: ACTIONS.GET_ALL_WORDS,
        payload: data
    }
}

export const incrementUserPoints = (points: number) => {
    return {
        type: ACTIONS.INCREMENT_USER_POINTS,
        payload: points
    }
}

