import React, {useEffect, useState} from "react";
import {wordCard} from "../../interfaces/interfaces";
import {arrayShuffler} from "../../Services/arrayShuffler";
import {useDispatch} from "react-redux";
import {shuffleHandler} from "../../Services/arrayShuffler";
import {wordInterface} from "../../AdminSection/WordCreator/WordCreatorFireBase";
import { v4 as uuidv4 } from 'uuid';

import './memoryCardGame.scss'
// FIX IT
export const MemoryCardGame = ({user, words, onGameFinish}: any) => {
    const dispatch = useDispatch();
    const [startTask, setStartTask] = useState(false);
    const [wordsForTheTask, setWordsForTheTask] = useState<wordCard[]>([]);
    const [finalArray, setFinalArray] = useState<wordCard[]>([]);

    useEffect(() => {
        if (words.length > 0) {
            setWordsForTheTask(arrayShuffler(words).slice(0, 9));
        }
    }, [words])

    const generateWords = () => {
        // FIX IT ~> extends??
        let modifiedArray = wordsForTheTask.map((word: wordInterface | any) => {
            return {...word, trans: !word.trans ? 'modified' : ''}
        })
        modifiedArray = [...wordsForTheTask, ...modifiedArray];
        const preparedFinalArray = shuffleHandler(modifiedArray).map((word: wordInterface, index: number) => ({
            ...word
        }))
        setFinalArray(preparedFinalArray)
    }

    const [matched, setMatched] = useState<any>([]);
    const [flipped, setFlipped] = useState(false);

    const [openCard, setOpenCard] = useState<any>([]);

    const flipHandler = (index: number) => {
        setOpenCard((opened: any) => [...opened, index])
    }

    useEffect(() => {
        if (openCard.length < 2) return;
        const firstMatched = finalArray[openCard[0]];
        const secondMatched = finalArray[openCard[1]];
        if (secondMatched?.id === firstMatched?.id) {
            setMatched([...matched, firstMatched?.id]);
        }

        if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000);
    }, [openCard])

    return (
        <div className='memory-game__global-wrapper'>
            <button
                className='memory-game__start'
                hidden={finalArray.length > 0} type='button'
                onClick={() => {
                    generateWords();
                    setStartTask(false);
                }}>Start
            </button>
            <div className='memory-game'>
                {finalArray?.map((word: wordInterface | any) => {
                    return (
                        <div key={uuidv4(word.word)}>
                            <button
                                className={`memory-game__word ${flipped ? 'flipped' : ''}`}
                                onClick={() => {
                                    flipHandler(word.id)
                                    setFlipped(!!(openCard.includes(word.id) || matched.includes(word.id)))
                                }}
                            >
                                {word.word}
                            </button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
