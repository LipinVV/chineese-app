import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {store} from "../../App";
import {keyHandler} from "../../Services/keyHandler";
import './wordMatching.scss';
import {arrayShuffler} from "../../Services/arrayShuffler";

export const WordMatching = () => {
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const [practice, setPractice] = useState<wordCard[]>([]);
    const [randomNumber, setRandomNumber] = useState(0);

    const generateCorrectAnswer = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }

    const generateFourWords = () => {
        setPractice(arrayShuffler(wordsFromStore).slice(0, 4));
        generateCorrectAnswer()
    }
    useEffect(() => {
        generateFourWords()
    }, [])
    const [status, setStatus] = useState<any>(false)

    const validation = (evt: any) => {
        const { value } = evt.target;
        if (value === practice[randomNumber].word) {
            setStatus(true)
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.word === value ? 'correct' : word.correct
                }
            })
            setPractice(toggled);
        }
        if (value !== practice[randomNumber].word) {
            setStatus(false)
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.word === value ? 'incorrect' : word.correct,
                }
            })
            setPractice(toggled);
        }
    }
    const [startTask, setStartTask] = useState(false)
    return (
        <div>
            <h1 style={{'textAlign': 'center'}}>Match a word</h1>
            <div className='match-the-word__wrapper'>
                <button className='match-the-word__start'  hidden={startTask} type='button' onClick={() => {
                    generateFourWords()
                    setStartTask(true)
                }}>Start</button>
            </div>
            <div hidden={!startTask} className='match-the-word__result'>{practice[randomNumber]?.definition}</div>
            <div className='match-the-word'>
                {practice.map((word: wordCard, index: number) => (
                        <button
                            disabled={status}
                            key={keyHandler(index)}
                            value={word.word}
                            onClick={validation}
                            className={`answer ${word.correct}`}
                        >
                            {word.word}
                        </button>
                    )
                )}
            </div>
            <div className='match-the-word__wrapper'>
                <button className='match-the-word__next' hidden={status !== true} onClick={() => {
                    generateFourWords()
                    setStatus(false)
                }}>Next</button>
            </div>
        </div>
    )
}