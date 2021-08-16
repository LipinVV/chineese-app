import {wordCard} from "../types/types";

export const arrayShuffler = (arr: wordCard[]) => {
    // let newPos, temp;
    // for (let i = arr.length - 1; i > 0; i--) {
    //     newPos = Math.floor(Math.random() * (i + 1))
    //     temp = arr[i];
    //     arr[i] = arr[newPos];
    //     arr[newPos] = temp;
    // }
    // return arr;
    return [...arr].sort(() => Math.random() - 0.5);
}