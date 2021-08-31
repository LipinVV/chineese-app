import React, {useState, useEffect} from 'react'
import {getWordsFromFireBase} from "../Services/getWordsFromFireBase";
import './dictionary.scss';
import {wordInterface} from "../AdminSection/WordCreator/WordCreatorFireBase";
import {Word} from "../Word/Word";

export const Dictionary = ({menuIsOpen, setMenuIsOpen}: any) => {
    // @ts-ignore
    const [words, setWords]: wordInterface[] = useState([]);
    // @ts-ignore
    const [filtered, setFiltered]: wordInterface[] = useState([]);

    const getAllWords = async () => {
        try {
            const allWordsFromServer = await getWordsFromFireBase()
            console.log(allWordsFromServer)
            // @ts-ignore
            setWords(allWordsFromServer)
            // @ts-ignore
            setFiltered(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllWords()
        console.log('words', words)
    }, [])

    const [play, setPlay] = useState(false)
    const playerHandler = () => {
        if (!play) {
            setPlay(true)
        }
    }

    let soundOutput = (src: any) => {
        const sound = new Audio(`${src}`);
        return sound.play();
    }

    return (
        <div>Dictionary
            {            //@ts-ignore
                Boolean(words.length) && words.map((word: wordInterface) => {
                    return (
                        <ul className='word-template' key={word.word}>
                            <li className='word-template-field'><Word word={word.word} tone={word.tone}/></li>
                            <li className='word-template-field'>{word.pinyin}</li>
                            <li className='word-template-field'>{word.definition}</li>
                            <li className='word-template-field'>tone: {word.tone}</li>
                            <li className='word-template-field' onClick={() => soundOutput(word.audioUrl)} >play</li>
                        </ul>
                    )
                })}
        </div>
    )
}