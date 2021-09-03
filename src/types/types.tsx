export type wordCard = {
    correct: string;
    id: number,
    word: string,
    pinyin: string,
    definition: string,
    tone: number,
    isFavourite: boolean,
    toLearn: boolean,
    audioUrl: string,
    key: string,
}