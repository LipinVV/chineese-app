import React, {useState} from "react";
import {wordCard} from "../../types/types";
import {store} from "../../App";
import {keyHandler} from "../../Services/keyHandler";
import './wordMatching.scss';
import {arrayShuffler} from "../../Services/arrayShuffler";
import ReactConfetti from "react-confetti";
import {Link} from "react-router-dom";
import {userInterface} from "../../Services/dataGetter";

export const WordMatching = ({user} : any) => {
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

    const validation = (evt: any) => {
        const {value} = evt.target;
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
    return (
        <div>
            {numberOfQuestions !== 0 && <div>
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
                    {practice.map((word: wordCard, index: number) => (
                            <button
                                type='button'
                                data-unit={word.definition}
                                disabled={status}
                                key={keyHandler(index)}
                                value={word.word}
                                onClick={validation}
                                className={`answer ${word.correct}`}
                            >
                                {word.word}
                            </button>
                        )
                    )}
                </div>
                <div className='match-the-word__wrapper'>
                    <button
                        type='button'
                        className='match-the-word__next'
                        hidden={status !== true || numberOfQuestions === 0}
                        onClick={() => {
                            generateFourWords()
                            setStatus(false)
                            setNumberOfQuestions(prevState => prevState - 1)
                        }}>Next
                    </button>
                </div>
            </div>}
            {numberOfQuestions === 0 && <ReactConfetti/>}
            {numberOfQuestions === 0 &&
            <div className='match-the-word__winner-zone'>
                <div>
                    <h1 style={{'textAlign': 'center', 'color' : 'white'}}>Congratulations, {user}!</h1>
                </div>
                <Link
                    to='/home'
                    className='match-the-word__exit'
                >
                    Exit task
                </Link>
                <button
                    type='button'
                    className='match-the-word__restart'
                    onClick={() => setNumberOfQuestions(3)}
                >
                    I want again!
                </button>
            </div>
            }
        </div>
    )
}