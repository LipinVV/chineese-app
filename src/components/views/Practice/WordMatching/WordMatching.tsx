import React, {useEffect, useState} from "react";
import {arrayShuffler} from "../../../services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../../../state/userPoints/actions";
import {wordCard} from "../../../interfaces/interfaces";
import {userInterface} from "../../../services/dataGetter";
import {Fireworks} from "fireworks-js/dist/react";
import {server, store} from "../../../../App";
import './wordMatchingTasks.scss';


export interface matchingWordProps {
    user: string | undefined,
    onGameFinished: () => void,
    mainEntity: 'word' | 'definition' | 'audioUrl'
}

export const WordMatching = ({user, onGameFinished, mainEntity}: matchingWordProps) => {

    const dispatch = useDispatch();
    const wordsFromStore: wordCard[] = Object.values(store.getState().wordsGetter);
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

    const generateCorrectAnswerAdvanced = () => {
        const randomInteger = Math.floor(Math.random() * 8);
        setRandomNumber(randomInteger);
    }

    const generateEightWordsAdvanced = () => {
        setWordsForTheTask(arrayShuffler(wordsFromStore).slice(0, 8));
        generateCorrectAnswerAdvanced()
    }

    const [rightAnswer, setRightAnswer] = useState<boolean>(false);
    const [wrongAnswer, setWrongAnswer] = useState<boolean>(false);
    const correctAnswer: string = mainEntity === 'word' ? wordsForTheTask[randomNumber]?.definition : wordsForTheTask[randomNumber]?.word; // FIX IT
    const validation = (evt: React.ChangeEvent<any>) => {
        const {value} = evt.target;
        if (mainEntity === 'word' || mainEntity === 'audioUrl') {
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
        if (mainEntity === 'definition') {
            if (value === wordsForTheTask[randomNumber].definition && wrongAnswer === false) {
                setCollectedPoints(collectedPoints + 1)
            }
            if (value === wordsForTheTask[randomNumber].definition) {
                setRightAnswer(true)
                const toggled = wordsForTheTask.map((word) => {
                    return {
                        ...word,
                        correct: word.definition === value ? 'correct' : word.correct
                    }
                })
                setWordsForTheTask(toggled);
            }
            if (value !== wordsForTheTask[randomNumber].definition) {
                setRightAnswer(false)
                setWrongAnswer(true)
                setCollectedPoints(collectedPoints)
                const toggled = wordsForTheTask.map((word) => {
                    return {
                        ...word,
                        correct: word.definition === value ? 'incorrect' : word.correct,
                    }
                })
                setWordsForTheTask(toggled);
            }
        }
    }
    const [startTask, setStartTask] = useState(false);


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
    const style: {} = {
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
            const chosenUser = users.find((person: userInterface) => person.nickname === user)
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

    const [isShowPlayer, setShowPlayer] = useState(true);
    const nextAudio = () => {
        setShowPlayer(false);

        setTimeout(() => {
            setShowPlayer(true);
        }, 300)
    }

    const soundOutput = () => {
        const sound = new Audio(`${wordsForTheTask[randomNumber].audioUrl}`);
        return sound.play();
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
                <div hidden={!startTask}
                     className='match-the-word__result'>{mainEntity === 'word' || mainEntity === 'definition' ? correctAnswer :
                    <div>
                        {isShowPlayer && <audio id={String(wordsForTheTask[randomNumber]?.id)} autoPlay>
                            <source src={wordsForTheTask[randomNumber]?.audioUrl}/>
                        </audio>}
                        <button className='match-the-word__audio' onClick={soundOutput}>Listen to the word</button>
                    </div>
                }
                </div>
                {mainEntity === 'word' || mainEntity === 'definition' ? <div className='match-the-word'>
                        {wordsForTheTask.map((word: wordCard) => {
                                return <button
                                    type='button'
                                    data-unit={mainEntity === 'word' ? word.definition : word.word}
                                    disabled={rightAnswer}
                                    key={word.word}
                                    value={word[mainEntity]}
                                    onClick={validation}
                                    className={`answer ${word.correct}`}
                                >
                                    {word[mainEntity]}
                                </button>
                            }
                        )}
                    </div>
                    :
                    <div className='match-the-word'>
                        {wordsForTheTask.map((word: wordCard) => {
                                return <button
                                    type='button'
                                    data-unit={mainEntity === 'audioUrl' && word.word}
                                    disabled={rightAnswer}
                                    key={word.word}
                                    value={word.word}
                                    onClick={validation}
                                    className={`answer ${word.correct}`}
                                >
                                    {word.definition}
                                </button>
                            }
                        )}
                    </div>
                }
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
                                mainEntity === 'audioUrl' && nextAudio()
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
                    <h1 className='match-the-word__header-winner'>{collectedPoints === 3 ? `Congratulations, ${user}, you've earned {collectedPoints} points` : `You've got ${collectedPoints} points`}</h1>
                    }
                    {!taskMode && numberOfQuestions === 0 &&
                    <h1 className='match-the-word__header-winner'>{collectedPoints === 6 ? `Congratulations, ${user}, you've earned {collectedPoints} points` : `You've got ${collectedPoints} points`}</h1>
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
