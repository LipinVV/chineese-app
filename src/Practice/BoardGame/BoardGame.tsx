import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './boardGame.scss'
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";
import {shuffleHandler} from "../../Services/arrayShuffler";

export const BoardGame = ({user}: any) => {
    const dispatch = useDispatch();
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const [wordsForTheTask, setWordsForTheTask] = useState<wordCard[]>([]);
    const [finalArray, setFinalArray]: any = useState<any>([]);
    useEffect(() => {
        if(wordsFromStore.length > 0) {
            setWordsForTheTask(arrayShuffler(wordsFromStore).slice(0, 9));
        }
    }, [])
    const generateWords = () => {
        let modifiedArray = wordsForTheTask.map((word: any) => {
            return {...word, trans: !word.trans ? 'modified' : ''}
        })
        modifiedArray = [...wordsForTheTask, ...modifiedArray];
        console.log('wordsFromStore', wordsFromStore)
        console.log('modifiedArray', modifiedArray)
        setFinalArray(shuffleHandler(modifiedArray))
    }

    const [firstChosenWord, setFirstChosenWord] = useState(false);
    const [secondChosenWord, setSecondChosenWord] = useState(false);
    const [globalCounter, setGlobalCounter]: any = useState(0);

    const [rightAnswer, setRightAnswer] = useState<any>(false);
    const [startTask, setStartTask] = useState(false);
    const [collectedPoints, setCollectedPoints] = useState(0);
    const [arrayToCompareChosenWords, setArrayToCompareChosenWords] = useState<any>([]);

    const logic = (evt: any) => {
        const {value} = evt.target;
        setArrayToCompareChosenWords([...arrayToCompareChosenWords, value]);
        return arrayToCompareChosenWords;
    }

    const [matchedPair, setMatchedPair]: any = useState(false);
    const [completedPairs, setCompletedPairs]: any = useState([]);
    useEffect(() => {
        if (arrayToCompareChosenWords.length === 2 && arrayToCompareChosenWords[0] === arrayToCompareChosenWords[1]) {
            setMatchedPair(true);
            setRightAnswer(true);
            const toggled = finalArray.map((word: any) => {
                return {
                    ...word,
                    correct: word.word === arrayToCompareChosenWords[0] ? 'correct-pair' : word.correct
                }
            })
            setFinalArray(toggled);
            setCompletedPairs([...completedPairs, arrayToCompareChosenWords]);
            setCollectedPoints(collectedPoints + 1);
            setArrayToCompareChosenWords([]);
            setFirstChosenWord(false);
            setSecondChosenWord(false);
        }
        if (arrayToCompareChosenWords.length === 2 && arrayToCompareChosenWords[0] !== arrayToCompareChosenWords[1]) {
            setMatchedPair(false);
            const toggled = finalArray.map((word: any) => {
                return {
                    ...word,
                    correct: word.word === arrayToCompareChosenWords[0] ? 'incorrect-pair' : word.correct,
                }
            })
            setFinalArray(toggled);
            setCollectedPoints(collectedPoints);
            setArrayToCompareChosenWords([]);
            setFirstChosenWord(false);
            setSecondChosenWord(false);
        }
    }, [arrayToCompareChosenWords])
    const updateUserPoints = async () => {
        try {
            let {data: users}: any = await server
                .from('users')
            const chosenUser = users.find((person: any) => person.nickname === user);
            const {data} = await server
                .from('users')
                .update([
                    {
                        globalPoints: chosenUser.globalPoints + collectedPoints,
                    }
                ])
                .match({nickname: user})
            console.log('user is updated =>', data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='board-game__global-wrapper'>
            <div className='board-game__task'>
                <div className='board-game__wrapper'>
                    <button
                        className='board-game__start'
                        // hidden={startTask} type='button'
                        hidden={finalArray.length > 0} type='button'
                        onClick={() => {
                            generateWords();
                            setMatchedPair(false);
                            setArrayToCompareChosenWords([]);
                            setStartTask(false);

                        }}>Start
                    </button>
                </div>
                <div className='board-game'>
                    {finalArray?.map((word: any, index: any) => (
                            <>
                                <button
                                    key={word.pinyin + word.word}
                                    value={word.word}
                                    style={{display: word.trans ? "none" : 'inherit'}}
                                    disabled={arrayToCompareChosenWords[0] === word.word && word.trans === undefined && firstChosenWord}
                                    onClick={(evt: any) => {
                                        logic(evt);
                                        setFirstChosenWord(true);
                                        setGlobalCounter(globalCounter + 1);
                                    }}
                                    className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                >
                                    {word.trans === undefined && word.word}
                                </button>
                                <button
                                    disabled={word.trans && arrayToCompareChosenWords[0] === word.word && secondChosenWord}
                                    key={word.word + word.pinyin}
                                    value={word.word}
                                    style={{display: !word.trans ? "none" : 'inherit'}}
                                    onClick={(evt: any) => {
                                        logic(evt);
                                        setSecondChosenWord(true);
                                        setGlobalCounter(globalCounter + 1);
                                    }}
                                    className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                >
                                    {word.trans !== undefined && word.pinyin}
                                </button>
                            </>
                        )
                    )}
                </div>
            </div>
            {globalCounter === 18 &&
            <div style={{marginTop: '30px'}} className='board-game__winner-zone'>
                <Link
                    to='/practice'
                    className='board-game__exit'
                    onClick={updateUserPoints}
                >
                    To practice page
                </Link>
                <button
                    type='button'
                    className='board-game__restart'
                    onClick={() => {
                        generateWords();
                        setMatchedPair(false);
                        setArrayToCompareChosenWords([]);
                        dispatch(incrementUserPoints(collectedPoints));
                        updateUserPoints().then(data => data);
                        setGlobalCounter(0);
                    }}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}