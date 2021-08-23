import {wordCard} from "../types/types";

export const arrayShuffler = (arr: wordCard[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
}

export const shuffleHandler = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}