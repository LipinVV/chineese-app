import React, {useState, useEffect} from 'react'
import {getWordsFromFireBase} from "../Services/getWordsFromFireBase";
import './dictionary.scss';
import {wordInterface} from "../AdminSection/WordCreator/WordCreatorFireBase";
import {Word} from "../Word/Word";
// FIX IT
export const Dictionary = ({menuIsOpen} : any) => {
    const [words, setWords] = useState<wordInterface[]>([]);
    const [filtered, setFiltered] = useState<wordInterface[]>([]);

    const getAllWords = async () => {
        try {
            const allWordsFromServer = await getWordsFromFireBase()
            setWords(allWordsFromServer)
            setFiltered(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllWords()
    }, [])

    const soundOutput = (src : string) => {
        const sound = new Audio(`${src}`);
        return sound.play();
    }

    const filter = (word: string, allWords: wordInterface[]) => {
        const arrangedWords = allWords.filter((value : wordInterface) => {
            if (word === '') {
                return value;
            }
            if (value.definition.toLowerCase().includes(word.toLowerCase()) ||
                value.word.toLowerCase().includes(word.toLowerCase())) {
                return value;
            }
        })
        setFiltered(arrangedWords)
    }

    const [checked, setChecked] = useState([]);

    const handleChanger = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = evt.target;
        // FIX IT
        setChecked((prevState: any) => {
            if (prevState.includes(Number(value))) {
                return prevState.filter((element: string | number) => element !== Number(value))
            } else {
                return [...prevState, Number(value)]
            }
        })
    }

    const [globallyChecked, setGloballyChecked] = useState(false);

    const globalHandleChanger = () => {
        setGloballyChecked(prevState => !prevState)
    }

    const declineNoun = (count: number) => {
        count = Math.abs(count) % 100;
        let count1 = count % 10;
        if (count > 10 && count < 20) {
            return 'слов';
        }
        if (count1 > 1 && count1 < 5) {
            return 'слова';
        }
        if (count1 === 1) {
            return 'слово';
        }
        return 'слов';
    }

    return (
        <div className='dictionary'>
            <input
                className='dictionary__input'
                type='text'
                placeholder='Type a word...'
                onChange={(evt) => filter(evt.target.value, words)}
            />
            {
                Boolean(filtered.length) && filtered.map((word: wordInterface) => {
                    return (
                        <div key={word.word}>
                            <div></div>
                            <ul className='dictionary__word' key={word.word}>
                                <li className='dictionary__word-field'>
                                    <input
                                        type='checkbox'
                                        value={word.id}
                                        // @ts-ignore
                                        checked={checked.includes(word.id) || globallyChecked}
                                        onChange={handleChanger}
                                    />
                                </li>
                                <li className='dictionary__word-field'><Word word={word.word} tone={word.tone}/></li>
                                <li className='dictionary__word-field'>{word.pinyin}</li>
                                <li className='dictionary__word-field'>{word.definition}</li>
                                <li className='dictionary__word-field' onClick={() => soundOutput(word.audioUrl)}></li>
                            </ul>
                        </div>
                    )
                })}
        </div>
    )
}