import React from "react";
import {wordCard} from "../../../interfaces/interfaces";
import {keyHandler} from "../../../services/keyHandler";
import {store} from "../../../../App";
import './wordcard.scss';

export const WordCard = () => {
    const wordsFromStore: wordCard[] = Object.values(store.getState().wordsGetter);
    return (
        <div className='word-card__wrapper'>
            {wordsFromStore?.map((word: wordCard, index: number) => {
                return (
                    <div className='word-card'
                         key={keyHandler(index)}
                    >
                        <div className='word-card__field'>{word.word}</div>
                        <div className='word-card__field'>{word.pinyin}</div>
                        <div className='word-card__field'>{word.definition}</div>
                        <div className='word-card__field'>{word.tone}</div>
                        <div className='word-card__field'>{word.toLearn?.toString()}</div>
                        <div className='word-card__field'>{word.isFavourite?.toString()}</div>
                    </div>
                )
            })}
        </div>
    )
}