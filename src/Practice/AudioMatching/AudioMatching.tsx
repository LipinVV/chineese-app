import React, { useEffect, useState } from 'react';
import {getWordsFromFireBase} from "../../Services/getWordsFromFireBase";
import { Link } from 'react-router-dom';
import './audioMatching.scss';
import {wordInterface} from "../../AdminSection/WordCreator/WordCreatorFireBase";


export const AudioMatching = ({user} : any) => {

    const [words, setWords] = useState<wordInterface[]>([]);
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

    const numberGenerator = Math.floor(Math.random() * 12);
    const [num, setNum] = useState(numberGenerator);

    const showRandomWordUrl = (allWords : wordInterface[], num : number) => {
        const foundWord = allWords.find((word) => word.id === num)
        return foundWord?.audioUrl
    }

    const showRandomWord = (num : number) => {
        for (let word of words) {
            if (word.id === num) {
                return word.word;
            } else {
                continue
            }
        }
    }

    const handleGenerator = () => {
        setNum(numberGenerator);
        setAnswer('');
    }

    const [answer, setAnswer] = useState('');
    const handleChanger = (evt : any) => {
        const { value } = evt.target;
        setAnswer(value);
    }

    const handleKeyPress = (evt : any) => {
        if (evt.keyCode === 13 && answer === showRandomWord(num)) {
            nextAudio();
        }
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

    return (
        <div className='audio-matching'>
                <div className='audio-matching__current-word'>
                    {Boolean(showRandomWordUrl(words, num)) && isShowPlayer && (
                        <audio id={showRandomWord(num)} autoPlay>
                            <source src={showRandomWordUrl(words, num)} />
                        </audio>
                    )}
                    <button className='audio-matching__play' onClick={soundOutput}>Play the word</button>
                </div>
                <label className='audio-matching__answer-label'>
                    <input
                        className='audio-matching__answer-field'
                        type='text'
                        value={answer}
                        onChange={handleChanger}
                        onKeyDown={handleKeyPress}
                    />
                </label>
                <button
                    className='audio-matching__next-question'
                    onClick={nextAudio}
                >Next</button>
        </div>
    )
}