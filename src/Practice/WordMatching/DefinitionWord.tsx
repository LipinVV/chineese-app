import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './definitionWord.scss';
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {Fireworks} from "fireworks-js/dist/react";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";

export const DefinitionWord = ({user}: any) => {
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
    // hardcore version
    const generateCorrectAnswerHardCore = () => {
        const randomInteger = Math.floor(Math.random() * 8);
        setRandomNumber(randomInteger);
    }

    const generateEightWordsHardCore = () => {
        setPractice(arrayShuffler(wordsFromStore).slice(0, 8));
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
        if (value === practice[randomNumber].word && wrongAnswer === false) {
            setCollectedPoints(collectedPoints + 1)
        }
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
            setWrongAnswer(true)
            setCollectedPoints(collectedPoints)
            const toggled = practice.map((word) => {
                return {
                    ...word,
                    correct: word.word === value ? 'incorrect' : word.correct,
                }
            })
            setPractice(toggled);
        }
    }
    const [startTask, setStartTask] = useState(false);
    const correctAnswer: any = practice[randomNumber]?.definition; // FIX IT
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
    const [taskMode, setTaskMode] = useState(false);
    return (
        <div className='match-the-word__global-wrapper'>
            {numberOfQuestions === 0 && collectedPoints === 3 && <Fireworks options={options} style={style}/>}
            {numberOfQuestions === 0 && collectedPoints === 6 && <Fireworks options={options} style={style}/>}
            {numberOfQuestions !== 0 &&
            <div className='match-the-word__task'>
                {!startTask ? <h1 style={{'textAlign': 'center'}}>Match a
                    definition and a word</h1> : <h1 style={{'textAlign': 'center'}}>Choose correct answer</h1>}
                <div className='match-the-word__wrapper'>
                    <button
                        className='match-the-word__start'
                        hidden={startTask} type='button'
                        onClick={() => {
                            generateFourWords()
                            setStartTask(true)
                        }}>Normal mode
                    </button>
                    <button
                        className='match-the-word__start'
                        hidden={startTask} type='button'
                        onClick={() => {
                            generateEightWordsHardCore()
                            setStartTask(true)
                            setTaskMode(true)
                            setNumberOfQuestions(6)
                        }}>Advanced mode
                    </button>
                </div>
                <div hidden={!startTask} className='match-the-word__result'>{correctAnswer}</div>
                <div className='match-the-word'>
                    {practice.map((word: wordCard) => (
                            <button
                                type='button'
                                data-unit={word.definition}
                                disabled={status || wrongAnswer === true}
                                key={word.word}
                                value={word.word}
                                onClick={validation}
                                className={`answer ${word.correct}`}
                            >
                                {/*<Word word={word.word} tone={word.tone}/>*/}
                                {word.word}
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
                        onClick={
                            () => {
                                {
                                    !taskMode ? generateFourWords() : generateEightWordsHardCore()
                                }
                                setStatus(false)
                                setNumberOfQuestions(prevState => prevState - 1)
                                setWrongAnswer(false)
                            }
                        }>Next
                    </button>
                </div>
                {wrongAnswer && !status &&
                <div className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        onClick={
                            () => {
                                {
                                    !taskMode ? generateFourWords() : generateEightWordsHardCore()
                                }
                                setStatus(false)
                                setNumberOfQuestions(prevState => prevState - 1)
                                setWrongAnswer(false)
                            }
                        }>Incorrect answer
                    </button>
                </div>
                }
            </div>}
            {numberOfQuestions === 0 &&
            <div className='match-the-word__winner-zone'>
                <div>
                    {taskMode && numberOfQuestions === 0 &&
                    <h1 className='match-the-word__header-winner'>{collectedPoints === 3 ? `Congratulations, ${user}, you've earned {collectedPoints} points` : `You've earned ${collectedPoints} points`}</h1>
                    }
                    {!taskMode && numberOfQuestions === 0 &&
                    <h1 className='match-the-word__header-winner'>{collectedPoints === 6 ? `Congratulations, ${user}, you've earned {collectedPoints} points` : `You've earned ${collectedPoints} points`}</h1>
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
                        {
                            !taskMode ? setNumberOfQuestions(3) : setNumberOfQuestions(6)
                        }
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