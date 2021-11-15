import React, {useEffect, useState} from 'react';
import {getWordsFromFireBase} from "../../../services/getWordsFromFireBase";
import {incrementUserPoints} from "../../../../state/userPoints/actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {wordCard} from "../../../interfaces/interfaces";
import {userInterface} from "../../../services/dataGetter";
import {wordInterface} from "../../AdminSection/WordCreator/WordConstructor";
import {server} from "../../../../App";
import './audioMatching.scss';

export const AudioMatching = ({user, onGameFinished}: any) => {
    const [wordsRenderedForTheTask, setWordsRenderedForTheTask] = useState<wordCard[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);
    const [collectedPoints, setCollectedPoints] = useState(0);

    const [words, setWords] = useState<wordCard[]>([]);
    const getAllWords = async () => {
        try {
            const allWordsFromServer = await getWordsFromFireBase()
            setWords(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllWords()
    }, [])

    const numberGenerator = Math.floor(Math.random() * 20) + 1;
    const [num, setNum] = useState(numberGenerator);

    const showRandomWordUrl = (allWords: wordCard[], num: number) => {
        const foundWord = allWords.find((word) => word.id === num);
        return foundWord?.audioUrl;
    }

    const showRandomWord = (num: number) => {
        for (let word of words) {
            if (word.id === num) {
                return word.word;
            }
        }
    }

    const handleGenerator = () => {
        setNum(numberGenerator);
        setAnswer('');
    }

    const [answer, setAnswer] = useState('');
    const handleChanger = (evt: React.ChangeEvent<any>) => {
        const {value} = evt.target;
        setAnswer(value);
        if (value === showRandomWord(num)) {
            setCollectedPoints(collectedPoints + 1)
            setWrongAnswer(false);
        } else {
            setCollectedPoints(collectedPoints)
            setWrongAnswer(true);
        }
    }
    const [wrongAnswer, setWrongAnswer] = useState(false);

    const handleKeyPress = (evt: any) => {
        if (evt.keyCode === 13 && evt.target.value === showRandomWord(num)) {
                setCollectedPoints(collectedPoints + 1);
                console.log('+1')
            setNumberOfQuestions(numberOfQuestions - 1);
            nextAudio();
        }
        console.log('collectedPoints', collectedPoints)
    }

    const [isShowPlayer, setShowPlayer] = useState(true);
    const nextAudio = () => {
        setShowPlayer(false);
        handleGenerator();

        setTimeout(() => {
            setShowPlayer(true);
        }, 300)
    }

    const soundOutput = () => {
        const sound = new Audio(`${showRandomWordUrl(words, num)}`);
        return sound.play();
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
        } catch (error) {
            console.error(error)
        }
    }

    const repeatHandler = async () => {
        setCollectedPoints(0);
        await updateUserPoints();
        onGameFinished()
        dispatch(incrementUserPoints(collectedPoints));
        setNumberOfQuestions(3);
        setWordsRenderedForTheTask([]);
        setCorrectAnswers([]);
    }

    const collectedPointsHandler = async () => {
        await updateUserPoints();
        onGameFinished();
        dispatch(incrementUserPoints(collectedPoints));
        setWordsRenderedForTheTask([]);
    }

    return (
        <div className='audio-matching'>
            {numberOfQuestions !== 0 &&
            <div className='audio-matching__questions-left'>Words left: {numberOfQuestions}</div>}
            {numberOfQuestions === 0 &&
            <div className='audio-matching__questions-left'>You've got: {collectedPoints} points</div>}
            {numberOfQuestions !== 0 && <>
                <div className='audio-matching__current-word'>
                    {Boolean(showRandomWordUrl(words, num)) && isShowPlayer && numberOfQuestions !== 0 && (
                        <audio id={showRandomWord(num)} autoPlay>
                            <source src={showRandomWordUrl(words, num)}/>
                        </audio>
                    )}
                    <button className='audio-matching__play' onClick={soundOutput}>Listen to the word</button>
                </div>
                <label className='audio-matching__answer-label'>
                    <input
                        className='audio-matching__answer-field'
                        type='text'
                        value={answer}
                        onChange={handleChanger}
                        onKeyDown={handleKeyPress}/>
                </label>
                <button
                    className='audio-matching__next-question'
                    onClick={() => {
                        setNumberOfQuestions(prevState => prevState - 1)
                        nextAudio()
                        // @ts-ignore
                        wordsRenderedForTheTask.push(answer);
                        setCorrectAnswers([...correctAnswers, showRandomWord(num)])
                    }}
                >Next
                </button>
            </>}
            {numberOfQuestions === 0 && <div className='audio-matching__words-rendered-for-the-task'>
                {wordsRenderedForTheTask.map((word: wordInterface, index: number) => {
                    return (
                        // @ts-ignore
                        <div key={word + index} className={ word === answer ? 'audio-matching__answer-rendered-for-the-task' : 'audio-matching__answer-rendered-for-the-task audio-matching__answer-rendered-for-the-task'}>
                            <span className='audio-matching__correct-answer'>answer №{index + 1}: {correctAnswers[index]}</span>
                            <span className={correctAnswers[index] === word ? 'audio-matching__user-answer':  'audio-matching__user-answer-wrong'}>{word}</span>
                        </div>
                    )
                })}
            </div>}
            {numberOfQuestions === 0 && <button
                type='button'
                className='audio-matching__restart'
                onClick={repeatHandler}
            >
                Repeat
            </button>}
            {numberOfQuestions === 0 && <Link
                to='/practice'
                className='audio-matching__exit'
                onClick={collectedPointsHandler}
            >
                To practice page
            </Link>}
        </div>
    )
}