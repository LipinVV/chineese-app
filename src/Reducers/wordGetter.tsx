import {wordInterface} from "../AdminSection/WordCreator/WordCreatorFireBase";

export const wordGetter = (state: wordInterface[] = [], action: any) => {
    switch (action.type) {
        case 'GET_ALL_WORDS': {
            return action.payload
        }
        default: {
            return state
        }
    }
}