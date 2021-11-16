import {wordInterface} from "../../views/AdminSection/WordCreator/WordConstructor";
import {ACTIONS} from "./actions";

export const reducers = (state: wordInterface[] = [], action: any) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_WORDS: {
            return action.payload
        }
        default: {
            return state
        }
    }
}