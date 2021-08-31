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
    }, [])

    let soundOutput = (src: any) => {
        const sound = new Audio(`${src}`);
        return sound.play();
    }

    return (
        <div className='dictionary'>
            {            //@ts-ignore
                Boolean(words.length) && words.map((word: wordInterface) => {
                    return (
                        <ul className='dictionary__word' key={word.word}>
                            <li className='dictionary__word-field'><Word word={word.word} tone={word.tone}/></li>
                            <li className='dictionary__word-field'>{word.pinyin}</li>
                            <li className='dictionary__word-field'>{word.definition}</li>
                            <li className='dictionary__word-field' onClick={() => soundOutput(word.audioUrl)} >play</li>
                        </ul>
                    )
                })}
        </div>
    )
}