import React, {useState} from "react";
import {server} from "../../App";
import './wordcreator.scss'

interface word {
    word: string,
    pinin: string,
    definition: string
}

export const WordCreator = () => {
    const [word, setWord] = useState('');
    const [pinin, setPinin] = useState('');
    const [definition, setDefinition] = useState('');

    const clearHandler = () => {
        setWord('');
        setPinin('');
        setDefinition('');
    }

    const uploadDictionary = async () => {
        try {
            const {data} = await server
                .from<word>('dictionary')
                .insert([
                    {
                        word: word,
                        pinin: pinin,
                        definition: definition,
                    }
                ])
            console.log('word was send =>', data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <div className='word__creator'>
                <label className='word__label'>Word
                    <input
                        type='text'
                        value={word}
                        onChange={(evt) => setWord(evt.target.value)}
                    /></label>
                <label className='word__label'>Pinin
                    <input
                        type='text'
                        value={pinin}
                        onChange={(evt) => setPinin(evt.target.value)}
                    /></label>
                <label className='word__label'>Definition
                    <input
                        type='text'
                        value={definition}
                        onChange={(evt) => setDefinition(evt.target.value)}
                    /></label>
            </div>
            <button
                type='button'
                onClick={uploadDictionary}
            >UploadDictionary
            </button>
            <button
                type='button'
                onClick={clearHandler}
            >Clear
            </button>
        </div>
    )
}