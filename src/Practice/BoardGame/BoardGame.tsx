import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './../WordMatching/definitionWord.scss'
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";

// //  npm install pinyin
// let dictionary: any = []
// import ('./../../dictionaryInEnglish.json').then((data) => dictionary.push(data))
// console.log(dictionary)
// let pinyin = require('pinyin')
// console.log(pinyin)

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
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
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
            const toggled = practice.map((word) => {
                console.log(word.word, array[0], word.correct)
                return {
                    ...word,
                    correct: word.word === array[0] ? 'correct' : word.correct
                }
            })
            setPractice(toggled);
            setCompletedPairs([...completedPairs, array]);
            setCollectedPoints(collectedPoints + 1);
            setNumberOfQuestions(numberOfQuestions - 1);
            setArray([]);
        }

        if (array.length === 2 && array[0] !== array[1]) {
            console.log('casted here ==>', array[0], array[1])
            setMatchedPair(false);
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.word === array[0] ? 'incorrect' : word.correct,
                }
            })
            setPractice(toggled);
            setCollectedPoints(collectedPoints);
            setNumberOfQuestions(numberOfQuestions - 1);
            setArray([]);
        }
    }, [array])

    return (
        <div className='match-the-word__global-wrapper'>
            <div className='match-the-word__task'>
                {!startTask ? <h1 style={{'textAlign': 'center'}}>Find correct pairs</h1> :
                    <h1 style={{'textAlign': 'center'}}>Correct: {matchedPair.toString()}</h1>}
                <div className='match-the-word__wrapper'>
                    <button
                        className='match-the-word__start'
                        hidden={startTask} type='button'
                        onClick={() => {
                            generateWords()
                            setStartTask(true)
                            setMatchedPair(false)
                            setArray([])
                        }}>Start
                    </button>
                </div>
                <div className='match-the-word'>
                    {practice.map((word: wordCard) => (
                            <button
                                type='button'
                                // data-unit={word.definition}
                                disabled={completedPairs.includes(word.word)}
                                key={word.word}
                                value={word.word}
                                onClick={logic}
                                className={`answer ${word.correct}`}
                            >
                                {word.word}
                            </button>
                        )
                    )}
                    {practice.map((word: wordCard) => (
                            <button
                                type='button'
                                // data-unit={word.definition}
                                disabled={completedPairs.includes(word.word)}
                                key={word.pinyin}
                                value={word.word}
                                onClick={logic}
                                className={`answer ${word.correct}`}
                            >
                                {word.pinyin}
                            </button>
                        )
                    )}
                </div>
                <div style={status !== true ? {'display': 'none'} : {}}
                     className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        hidden={status !== true}
                        onClick={
                            () => {
                                generateWords()
                                setStatus(false)
                                setWrongAnswer(false)
                                setArray([])
                            }
                        }>Next
                    </button>
                </div>
            </div>
            {numberOfQuestions === 0 &&
            <div className='match-the-word__winner-zone'>
                <Link
                    to='/practice'
                    className='match-the-word__exit'
                    onClick={updateUserPoints}
                >
                    To practice page
                </Link>
                <button
                    type='button'
                    className='match-the-word__restart'
                    onClick={() => {
                        dispatch(incrementUserPoints(collectedPoints))
                        setCollectedPoints(0)
                        updateUserPoints().then(data => data)
                    }}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}