import {wordCard} from "../types/types";

export const wordGetter = (state: wordCard[] = [], action: any) => {
    switch (action.type) {
        case 'GET_ALL_WORDS': {
            return action.payload
        }
        default: {
            return state
        }
    }
}