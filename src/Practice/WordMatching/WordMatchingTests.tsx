import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {store} from "../../App";
import {keyHandler} from "../../Services/keyHandler";
import './wordMatching.scss';
import {useDispatch} from "react-redux";
import {colorReducer} from "../../Reducers/colors";
import {ACTIONS, getColor} from "../../Actions/actions";

export const WordMatchingTests = () => {
    const dispatch = useDispatch();


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

    const generateCorrectAnswer = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }

    const [styles, setStyles] = useState<any>()

    const generateFourWords = () => {
        setPractice(arrayShuffler(wordsFromStore).filter((_: any, i: number) => i < 4));
        generateCorrectAnswer()
    }

    // const inputHandler = (evt) => {
    //     const { value } = evt.target
    //     setValue(value)
    // }
    const [someValue, setSomeValue] = useState('1')
    const handler = (evt :any) => {
        let color = evt.target.style
        color.backgroundColor = 'white'
        if (evt.target.value === practice[randomNumber]?.word) {
            color.backgroundColor = Object.values(store.getState().bg)[0]
            console.log(color)
        }
    }

    useEffect(() => {
        generateFourWords()
        generateCorrectAnswer()
    }, [])



    return (
        <div>
            <h1>Match word</h1>
            <div className='match-the-word'>
                {practice.map((word: wordCard, index: number) => {
                    return (
                        <button
                            id='btn'
                            key={keyHandler(index)}
                            className='match-the-word__word'
                            value={word.word}
                            onClick={(evt) => {
                                handler(evt);
                            }}
                        >
                            {word.word}
                            <br/>
                            {word.isFavourite?.toString()}
                        </button>
                    )
                })}
            </div>
            <div>
            </div>
            <div className='match-the-word__result'>{practice[randomNumber]?.definition}</div>
            <button
                style={styles}
                onClick={(evt) => {
                    setStyles(styles)
                    generateFourWords();
            }} className='button'>Next</button>
        </div>
    )
}