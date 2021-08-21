import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './boardGame.scss'
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";
import {shuffleHandler} from "../../Services/arrayShuffler";
import {keyHandler} from "../../Services/keyHandler";

export const BoardGame = ({user}: any) => {
    const dispatch = useDispatch();
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const [practice, setPractice] = useState<wordCard[]>([]);
    const [finalArray, setFinalArray]: any = useState<any>([]);
    const generateWords = () => {
        setPractice(arrayShuffler(wordsFromStore).slice(0, 9));
        let modifiedArray = practice.map((word: any) => {
            return {...word, trans: !word.trans ? 'modified' : ''}
        })
        modifiedArray = [...practice, ...modifiedArray];
        // let transformedArray: any = [...practice, ...modifiedArray];
        setFinalArray(shuffleHandler(modifiedArray))
    }

    const [charged, setCharged] = useState(false)
    const [charged2, setCharged2] = useState(false)
    const [globalCounter, setGlobalCounter]: any = useState(0)

    const [status, setStatus] = useState<any>(false);
    const [startTask, setStartTask] = useState(false);
    const [collectedPoints, setCollectedPoints] = useState(0);
    const [array, setArray] = useState<any>([]);

    const logic = (evt: any) => {
        const {value} = evt.target
        setArray([...array, value])
        return array;
    }

    const [matchedPair, setMatchedPair]: any = useState(false);
    const [completedPairs, setCompletedPairs]: any = useState([]);
    useEffect(() => {
        if (array.length === 2 && array[0] === array[1]) {
            setMatchedPair(true);
            setStatus(true)
            const toggled = finalArray.map((word: any) => {
                return {
                    ...word,
                    correct: word.word === array[0] ? 'correct-pair' : word.correct
                }
            })
            setFinalArray(toggled);
            setCompletedPairs([...completedPairs, array]);
            setCollectedPoints(collectedPoints + 1);
            setArray([]);
            setCharged(false)
            setCharged2(false)
        }
        if (array.length === 2 && array[0] !== array[1]) {
            setMatchedPair(false);
            const toggled = finalArray.map((word: any) => {
                return {
                    ...word,
                    correct: word.word === array[0] ? 'incorrect-pair' : word.correct,
                }
            })
            setFinalArray(toggled);
            setCollectedPoints(collectedPoints);
            setArray([]);
            setCharged(false)
            setCharged2(false)
        }
    }, [array])
    const updateUserPoints = async () => {
        try {
            let {data: users}: any = await server
                .from('users')
            const chosenUser = users.find((person: any) => person.nickname === user)
            const {data} = await server
                .from('users')
                .update([
                    {
                        globalPoints: chosenUser.globalPoints + collectedPoints,
                    }
                ])
                .match({nickname: user})
            console.log('user is updated =>', data)
        } catch (error) {
            console.error(error)
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
                            generateWords()
                            console.log('practice', practice)
                            console.log('finalArray', finalArray)
                            setMatchedPair(false)
                            setArray([])
                            setStartTask(false)
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
                                    disabled={array[0] === word.word && word.trans === undefined && charged}
                                    onClick={(evt: any) => {
                                        logic(evt)
                                        setCharged(true)
                                        setGlobalCounter(globalCounter + 1)
                                    }}
                                    className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                >
                                    {word.trans === undefined && word.word}
                                </button>
                                <button
                                    disabled={word.trans && array[0] === word.word && charged2}
                                    key={word.word + word.pinyin}
                                    value={word.word}
                                    style={{display: !word.trans ? "none" : 'inherit'}}
                                    onClick={(evt: any) => {
                                        logic(evt)
                                        setCharged2(true)
                                        setGlobalCounter(globalCounter + 1)
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
                        generateWords()
                        setMatchedPair(false)
                        setArray([])
                        dispatch(incrementUserPoints(collectedPoints))
                        updateUserPoints().then(data => data)
                        setGlobalCounter(0)
                    }}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}