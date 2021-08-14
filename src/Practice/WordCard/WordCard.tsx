import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {getWordsDataBase} from "../../Services/dataGetter";
import {keyHandler} from "../../Services/keyHandler"
import './wordcard.scss'

export const WordCard = () => {

    const [words, setWords] = useState<wordCard[]>([])
    useEffect(() => {
        getWordsDataBase().then(wordSets => setWords(wordSets))
    }, [])
    return (
        <div className='word-card__wrapper'>
            {words.map((word: wordCard, index: number) => {
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