import React, {useState} from "react";
import './wordcreator.scss'
import {Word} from "../../Word/Word";

export const WordCreator = () => {
    const [word, setWord] = useState('');
    const [pinyin, setPinyin] = useState('');
    const [definition, setDefinition] = useState('');
    const [tone, setTone] = useState('');

    const clearHandler = () => {
        setWord('');
        setPinyin('');
        setDefinition('');
        setTone('');
    }

    return (
        <div>
            <div className='word__creator'>
                <h1>
                    <Word word={word} tone={tone}/>
                </h1>
                <label className='word__label'>Word
                    <input
                        type='text'
                        value={word}
                        onChange={(evt) => setWord(evt.target.value)}
                    />
                </label>
                <label className='word__label'>Pinyin
                    <input
                        type='text'
                        value={pinyin}
                        onChange={(evt) => setPinyin(evt.target.value)}
                    />
                </label>
                <label className='word__label'>Definition
                    <input
                        type='text'
                        value={definition}
                        onChange={(evt) => setDefinition(evt.target.value)}
                    />
                </label>
                <label className='word__label'>Tone
                    <input
                        type='number'
                        value={tone}
                        onChange={(evt) => setTone(evt.target.value)}
                    />
                </label>
            </div>
            <button
                type='button'
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