export const ACTIONS = {
    INCREMENT_USER_POINTS: 'INCREMENT_USER_POINTS',
}


export const incrementUserPoints = (points: number) => {
    return {
        type: ACTIONS.INCREMENT_USER_POINTS,
        payload: points
    }
}

