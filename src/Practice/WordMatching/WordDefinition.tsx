import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './definitionWord.scss';
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {Fireworks} from "fireworks-js/dist/react";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";

export const WordDefinition = ({user}: any) => {
    const dispatch = useDispatch();
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
    // in case  to get rid of 'Start' button -> add useEffect and put this
    // useEffect(() => {
    //     generateFourWords()
    // }, [])

    const [status, setStatus] = useState<any>(false);
    const [wrongAnswer, setWrongAnswer] = useState<any>(false);
    const validation = (evt: any) => {
        const {value} = evt.target;
        if (value === practice[randomNumber].definition && wrongAnswer === false) {
            setCollectedPoints(collectedPoints + 1)
        }
        if (value === practice[randomNumber].definition) {
            setStatus(true)
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.definition === value ? 'correct' : word.correct
                }
            })
            setPractice(toggled);
        }
        if (value !== practice[randomNumber].definition) {
            setStatus(false)
            setWrongAnswer(true)
            setCollectedPoints(collectedPoints)
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.definition === value ? 'incorrect' : word.correct,
                }
            })
            setPractice(toggled);
        }
    }
    const [startTask, setStartTask] = useState(false);
    const correctAnswer: any = practice[randomNumber]?.word; // FIX IT
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);
    const [collectedPoints, setCollectedPoints] = useState(0);

    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const reportWindowSize = () => {
            setWidth(window.innerWidth)
        }
        window.onresize = reportWindowSize;
        window.addEventListener('resize', reportWindowSize);
    }, [])

    const options = {
        speed: 5
    }
    const style: any = {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
    // useEffect(() => {
    //     if (numberOfQuestions === 0) {
    //         dispatch(incrementUserPoints(collectedPoints))
    //     }
    // }, [numberOfQuestions])

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
    console.log('collectedPoints', collectedPoints)
    console.log('wrongAnswer', wrongAnswer)
    return (
        <div className='match-the-word__global-wrapper'>
            {numberOfQuestions === 0 && collectedPoints === 3 && <Fireworks options={options} style={style}/>}
            {numberOfQuestions !== 0 &&
            <div className='match-the-word__task'>
                <h1 style={{'textAlign': 'center'}}>Match a word</h1>
                <div className='match-the-word__wrapper'>
                    <button
                        className='match-the-word__start'
                        hidden={startTask} type='button'
                        onClick={() => {
                            generateFourWords()
                            setStartTask(true)
                        }}>Start
                    </button>
                </div>
                <div hidden={!startTask} className='match-the-word__result'>{correctAnswer}</div>
                <div className='match-the-word'>
                    {practice.map((word: wordCard) => (
                            <button
                                type='button'
                                data-unit={word.word}
                                disabled={status || wrongAnswer === true}
                                key={word.word}
                                value={word.definition}
                                onClick={validation}
                                className={`answer ${word.correct}`}
                            >
                                {/*<Word word={word.word} tone={word.tone}/>*/}
                                {word.definition}
                            </button>
                        )
                    )}
                </div>
                <div style={status !== true || numberOfQuestions === 0 ? {'display': 'none'} : {}}
                     className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        hidden={status !== true || numberOfQuestions === 0}
                        onClick={() => {
                            generateFourWords()
                            setStatus(false)
                            setNumberOfQuestions(prevState => prevState - 1)
                            setWrongAnswer(false)
                        }}>Next
                    </button>
                </div>
                {wrongAnswer && !status &&
                <div className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        onClick={() => {
                            generateFourWords()
                            setStatus(false)
                            setNumberOfQuestions(prevState => prevState - 1)
                            setWrongAnswer(false)
                        }}>Wrong, but who cares
                    </button>
                </div>
                }
            </div>}
            {numberOfQuestions === 0 &&
            <div className='match-the-word__winner-zone'>
                <div>
                    {numberOfQuestions === 0 && collectedPoints === 3 ?
                    <h1 className='match-the-word__header-winner'>Congratulations, {user}, you've earned {collectedPoints} points</h1> :
                        <h1 className='match-the-word__header-winner'>You've earned {collectedPoints} points</h1>
                    }
                </div>
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
                        setNumberOfQuestions(3)
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