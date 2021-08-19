import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './../WordMatching/definitionWord.scss'
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";


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
        setClickerCounter( clickerCounter + 1)
        if(clickerCounter >= 0) {
            console.log(evt.preventDefault())
        }
        return array;
    }
    const [matchedPair, setMatchedPair]: any = useState(false);
    const [completedPairs, setCompletedPairs]: any = useState([]);
    useEffect(() => {
        if (array.length === 2 && array[0] === array[1]) {
            setMatchedPair(true);
            setStatus(true)
            const toggled = practice.map((word) => {
                console.log(completedPairs.includes(word))
                return {
                    ...word,
                    correct: word.word === array[0] ? 'correct-pair' : word.correct
                }
            })
            setPractice(toggled);
            setCompletedPairs([...completedPairs, array]);
            setCollectedPoints(collectedPoints + 1);
            setNumberOfQuestions(numberOfQuestions - 1);
            setArray([]);
            setSelectedOne('')
            setSelectedTwo('')
        }

        if (array.length === 2 && array[0] !== array[1]) {
            setMatchedPair(false);
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.word === array[0] ? 'incorrect-pair' : word.correct,
                }
            })
            setPractice(toggled);
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
    const [selectedOne, setSelectedOne]: any = useState();
    const [selectedTwo, setSelectedTwo]: any = useState();
    console.log(selectedOne, array, matchedPair)

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
                                // disabled={completedPairs.includes(word.word)}
                                // disabled={selected?.word === word.word}
                                disabled={selectedOne?.word === word.word}
                                key={word.word}
                                value={word.word}
                                onClick={(evt) => {
                                    logic(evt);
                                    setSelectedOne(word);
                                }}
                                className={`answer ${word.correct}`}
                            >
                                {word.word}
                            </button>
                        )
                    )}
                    {practice.map((word : wordCard) => {
                        return {
                            ...word,
                            answer: word.word
                        }
                    }).map((word: any) => (
                            <button
                                type='button'
                                // data-unit={word.definition}
                                // disabled={completedPairs.includes(word.word)}
                                disabled={selectedTwo?.word === word.answer}
                                key={word.pinyin}
                                value={word.word}
                                onClick={(evt) => {
                                    logic(evt);
                                    setSelectedTwo(word);
                                }}
                                className={`answer ${word.correct}`}
                            >
                                {word.pinyin}
                            </button>
                        )
                    )}
                </div>
            </div>
            {numberOfQuestions === 0 &&
            <div style={{marginTop: '30px', paddingTop: '30px'}} className='match-the-word__winner-zone'>
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