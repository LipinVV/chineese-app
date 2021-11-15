import {wordInterface} from "../../../components/views/AdminSection/WordCreator/WordConstructor";

export const reducers = (state: wordInterface[] = [], action: any) => {
    switch (action.type) {
        case 'GET_ALL_WORDS': {
            return action.payload
        }
        default: {
            return state
        }
    }
}