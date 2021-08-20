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
    const [practice, setPractice] = useState<wordCard[]>([]);

    const [randomNumber, setRandomNumber] = useState(0);
    const generateCorrectAnswer = () => {
        const randomInteger = Math.floor(Math.random() * 5);
        setRandomNumber(randomInteger);
    }

    const generateWords = () => {
        setPractice(arrayShuffler(wordsFromStore).slice(0, 5));
        generateCorrectAnswer()
    }

    const [status, setStatus] = useState<any>(false);
    const [wrongAnswer, setWrongAnswer] = useState<any>(false);
    const [startTask, setStartTask] = useState(false);
    const [collectedPoints, setCollectedPoints] = useState(0);

    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [array, setArray] = useState<any>([]);
    const [clickerCounter, setClickerCounter] = useState(0)

    const logic = (evt: any) => {
        const {value} = evt.target
        setArray([...array, value])
        setClickerCounter(clickerCounter + 1)
        return array;
    }

    const [selectedOne, setSelectedOne]: any = useState();

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
            setNumberOfQuestions(numberOfQuestions - 1);
            setArray([]);
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
            setNumberOfQuestions(numberOfQuestions - 1);
            setArray([]);
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

    const modifiedArray = practice.map((word: any) => {
        return {...word, trans: !word.trans ? 'modified' : ''}
    })

    let transformedArray: any = [...practice, ...modifiedArray];
    const [finalArray, setFinalArray]: any = useState([]);

    return (
        <div className='board-game__global-wrapper'>
            <div className='board-game__task'>
                <div className='board-game__wrapper'>
                    <button
                        className='board-game__start'
                        hidden={startTask} type='button'
                        onClick={() => {
                            generateWords()
                            // setStartTask(true)
                            setMatchedPair(false)
                            setArray([])
                            setFinalArray(shuffleHandler(transformedArray))
                        }}>Start
                    </button>
                </div>
                <div className='board-game'>
                    {(finalArray).map((word: any, index: any) => (
                            <>
                                <button
                                    key={word.pinyin + word.word}
                                    value={word.word}
                                    style={{display: word.trans ? "none" : 'inherit'}}
                                    onClick={(evt: any) => {
                                        logic(evt)
                                    }} className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                >
                                    {word.trans === undefined && word.word}
                                </button>
                                <button
                                    key={word.word + word.pinyin}
                                    value={word.word}
                                    style={{display: !word.trans ? "none" : 'inherit'}}
                                    onClick={(evt: any) => {
                                        logic(evt)
                                    }} className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                >
                                    {word.trans !== undefined && word.pinyin}
                                </button>
                            </>
                        )
                    )}
                </div>
            </div>
            {numberOfQuestions === 0 &&
            <div style={{marginTop: '30px', paddingTop: '30px'}} className='board-game__winner-zone'>
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
                        dispatch(incrementUserPoints(collectedPoints))
                        updateUserPoints().then(data => data)
                        setStatus(false)
                        setWrongAnswer(false)
                        setArray([])
                        setCollectedPoints(0)
                        generateWords()
                    }}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}