import React, {useState} from "react";
import {fireBaseData} from "../../Services/firebase";
import './wordcreator.scss';
import {Word} from "../../Word/Word";
import {fireBaseStorage} from "../../Services/firebase";

export interface wordInterface {
    id: number,
    key: string,
    word: string,
    pinyin: string,
    definition: string,
    tone: number,
    audioUrl: string,
    correct: string,
    isFavourite: boolean,
    toLearn: boolean,
}

export const WordCreatorFireBase = () => {
    const [word, setWord] = useState('');
    const [pinyin, setPinyin] = useState('');
    const [definition, setDefinition] = useState('');
    const [tone, setTone] = useState('');
    const [toLearn, setIstoLearn] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [error, setError] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const clearHandler = () => {
        setWord('');
        setPinyin('');
        setDefinition('');
        setTone('');
    }

    const uploadData = async () => {
        const preparedWord = {
            word:  word,
            pinyin: pinyin,
            definition: definition ,
            tone: tone,
            toLearn: toLearn,
            isFavourite: isFavourite,
            audioUrl: audioUrl,
        }
        const newDoc = await fireBaseData.collection('Dictionary').add(preparedWord);
        console.log('newDoc', newDoc)
    }
// FIX IT
    const uploadFile = async (evt: any) => {
        const { files } = evt.target;
        const snapshotRef = fireBaseStorage.child(`/audio/${files[0].name}`)
        const snapshot = await snapshotRef.put(files[0]);
        const fileUrl = await snapshot.ref.getDownloadURL();
        const {origin, pathname} = new URL(fileUrl);
        const preparedAudioUrl = `${origin}${pathname}?alt=media`
        setAudioUrl(preparedAudioUrl)
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
                <label className='word__label'>Upload audio file
                    <input
                        type='file'
                        onChange={uploadFile}
                    />
                </label>
            </div>
            <div>{error}</div>
            <button
                type='button'
                onClick={uploadData}
                disabled={word === '' || definition === '' || pinyin === ''}
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