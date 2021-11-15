export const ACTIONS = {
    GET_ALL_WORDS: 'GET_ALL_WORDS',
}

export const getAllWords = (data: { audioUrl: string; pinyin: string; tone: number; definition: string; id: number; word: string; key: string }[]) => {
    return {
        type: ACTIONS.GET_ALL_WORDS,
        payload: data
    }
}