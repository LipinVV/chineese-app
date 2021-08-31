import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {server, store} from "../../App";
import './wordMatchingTasks.scss';
import {arrayShuffler} from "../../Services/arrayShuffler";
import {Link} from "react-router-dom";
import {Fireworks} from "fireworks-js/dist/react";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../Actions/actions";


interface definitionWordProps {
    user: string | undefined,
    onGameFinished: () => void,
    mainEntity: 'word' | 'definition'
}

export const WordMatching = ({user, onGameFinished, mainEntity}: definitionWordProps) => {

    const dispatch = useDispatch();
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const [wordsForTheTask, setWordsForTheTask] = useState<wordCard[]>([]);
    const [randomNumber, setRandomNumber] = useState(0);

    const generateCorrectAnswer = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }

    const generateFourWords = () => {
        setWordsForTheTask(arrayShuffler(wordsFromStore).slice(0, 4));
        generateCorrectAnswer()
    }
    // hardcore version
    const generateCorrectAnswerAdvanced = () => {
        const randomInteger = Math.floor(Math.random() * 8);
        setRandomNumber(randomInteger);
    }

    const generateEightWordsAdvanced = () => {
        setWordsForTheTask(arrayShuffler(wordsFromStore).slice(0, 8));
        generateCorrectAnswerAdvanced()
    }

    const [rightAnswer, setRightAnswer] = useState<any>(false);
    const [wrongAnswer, setWrongAnswer] = useState<any>(false);
    const validation = (evt: any) => {
        const {value} = evt.target;
        if (value === wordsForTheTask[randomNumber].word && wrongAnswer === false) {
            setCollectedPoints(collectedPoints + 1)
        }
        if (value === wordsForTheTask[randomNumber].word) {
            setRightAnswer(true)
            const toggled = wordsForTheTask.map((word) => {
                return {
                    ...word,
                    correct: word.word === value ? 'correct' : word.correct
                }
            })
            setWordsForTheTask(toggled);
        }
        if (value !== wordsForTheTask[randomNumber].word) {
            setRightAnswer(false)
            setWrongAnswer(true)
            setCollectedPoints(collectedPoints)
            const toggled = wordsForTheTask.map((word) => {
                return {
                    ...word,
                    correct: word.word === value ? 'incorrect' : word.correct,
                }
            })
            setWordsForTheTask(toggled);
        }
    }
    const [startTask, setStartTask] = useState(false);
    const correctAnswer: any = mainEntity === 'word' ? wordsForTheTask[randomNumber]?.definition : wordsForTheTask[randomNumber]?.word; // FIX IT

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

    const [taskMode, setTaskMode] = useState(false);

    const repeatHandler = async () => {
        !taskMode ? setNumberOfQuestions(3) : setNumberOfQuestions(6)
        setCollectedPoints(0)

        await updateUserPoints()
        onGameFinished()
        dispatch(incrementUserPoints(collectedPoints))
    }

    const collectedPointsHandler = async () => {
        await updateUserPoints()
        onGameFinished()
        dispatch(incrementUserPoints(collectedPoints))
    }

    return (
        <div className='match-the-word__global-wrapper'>
            {numberOfQuestions === 0 && collectedPoints === 3 && <Fireworks options={options} style={style}/>}
            {numberOfQuestions === 0 && collectedPoints === 6 && <Fireworks options={options} style={style}/>}
            {numberOfQuestions !== 0 &&
            <div className='match-the-word__task'>
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
                            generateEightWordsAdvanced()
                            setStartTask(true)
                            setTaskMode(true)
                            setNumberOfQuestions(6)
                        }}>Advanced mode
                    </button>
                </div>
                <div hidden={!startTask} className='match-the-word__result'>{correctAnswer}</div>
                <div className='match-the-word'>
                    {wordsForTheTask.map((word: wordCard) => {
                        console.log('word[mainEntity]', word[mainEntity])
                        return <button
                                type='button'
                                data-unit={word[mainEntity]}
                                disabled={rightAnswer}
                                key={word.word}
                                value={word[mainEntity]}
                                onClick={validation}
                                className={`answer ${word.correct}`}
                            >
                                {/*<Word word={word.word} tone={word.tone}/>*/}
                                {word[mainEntity]}
                            </button>
                        }
                    )}
                </div>
                <div style={rightAnswer !== true || numberOfQuestions === 0 ? {'display': 'none'} : {}}
                     className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        hidden={rightAnswer !== true || numberOfQuestions === 0}
                        onClick={
                            () => {
                                !taskMode ? generateFourWords() : generateEightWordsAdvanced()
                                setRightAnswer(false)
                                setNumberOfQuestions(prevState => prevState - 1)
                                setWrongAnswer(false)
                            }
                        }>Next
                    </button>
                </div>
                {wrongAnswer && !rightAnswer &&
                <div className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        disabled={wrongAnswer}
                        onClick={
                            () => {
                                !taskMode ? generateFourWords() : generateEightWordsAdvanced()
                                setRightAnswer(false)
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
                    onClick={collectedPointsHandler}
                >
                    To practice page
                </Link>
                <button
                    type='button'
                    className='match-the-word__restart'
                    onClick={repeatHandler}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}
