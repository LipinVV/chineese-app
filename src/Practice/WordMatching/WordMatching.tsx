import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {store} from "../../App";
import {keyHandler} from "../../Services/keyHandler";
import './wordMatching.scss';

export const WordMatching = () => {
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const arrayShuffler = (arr: wordCard[]) => {
        let newPos, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1))
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    }
    const [practice, setPractice] = useState<wordCard[]>([]);
    const [randomNumber, setRandomNumber] = useState(0);
    const [statusOfTheCorrectAnswer, setStatusOfTheCorrectAnswer] = useState(true);
    const [won, setWon] = useState(practice[0]?.word)

    const generateCorrectAnswer = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }

    const generateFourWords = () => {
        setPractice(arrayShuffler(wordsFromStore).filter((_: any, i: number) => i < 4));
        generateCorrectAnswer()
    }

    const handler = (evt :any) => {
        if (evt.target.value === practice[randomNumber].word) {
            setWon(evt.target.value)
            console.log('won', won)
            // generateFourWords()
            setStatusOfTheCorrectAnswer(false)
        }
        if (evt.target.value !== practice[randomNumber].word) {
            setStatusOfTheCorrectAnswer(true)
        }
        generateFourWords()
    }

    useEffect(() => {
        generateFourWords()
        generateCorrectAnswer()
    }, [])


    return (
        <div>
            <h1 style={{'textAlign': 'center'}}>Match word</h1>
            <div className='match-the-word'>
                {practice.map((word: wordCard, index: number) => {
                    return (
                        <label
                            key={keyHandler(index)}
                            style={{'textAlign': 'center'}}
                            className='match-the-word__word'
                        >
                            {word.word}
                            <br/>
                            {word.isFavourite?.toString()}
                            <input
                                className='match-the-word__input'
                                type='radio'
                                value={word.word}
                                checked={word.definition === practice[randomNumber]?.definition}
                                onChange={handler}
                            />
                        </label>
                    )
                })}
            </div>
            <div className='match-the-word__result'>{practice[randomNumber]?.definition}</div>
            <div>{won}</div>
        </div>
    )
}