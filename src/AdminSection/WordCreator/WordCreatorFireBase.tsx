import React, {useState} from "react";
import {fireBaseData} from "../../Services/firebase";
import './wordcreator.scss'
import {Word} from "../../Word/Word";
import {fireBaseStorage} from "../../Services/firebase";

export interface wordInterface {
    key: string,
    word: string,
    pinyin: string,
    definition: string,
    tone: number,
    audioUrl: string
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


    const tones: any = {
        0: 'grey',
        1: 'white',
        2: 'green',
        3: 'yellow',
        4: 'blue'
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

export const dictionary = [
    {id: 1, word: '爱', pinin: 'ài', definition: 'любить; любовь; любимый'},
    {id: 2, word: '八', pinin: 'bā', definition: 'восемь; восьмой'},
    {id: 3, word: '爸爸', pinin: 'bàba', definition: 'папа'},
    {id: 4, word: '杯子', pinin: 'bēizi', definition: 'стакан; кружка; бокал; рюмка'},
    {id: 5, word: '北京', pinin: 'běi jīng', definition: 'Пекин'},
    {id: 6, word: '本', pinin: 'běn', definition: 'счётное слово для растений с корнем'},
    {id: 7, word: '不客气', pinin: 'bù kě qi', definition: 'ничего страшного; не стоит'},
    {id: 8, word: '不', pinin: 'bù', definition: 'отрицательная частица "не"'},
    {id: 9, word: '菜', pinin: 'cài', definition: 'овощи; блюдо; пища; стол'},
    {id: 10, word: '茶', pinin: 'chá', definition: 'чай'},
    {id: 11, word: '吃', pinin: 'chī', definition: 'есть, кушать'},
    {id: 12, word: '出租车', pinin: 'chū zū chē', definition: 'такси'},
    {id: 13, word: '打电话', pinin: 'dǎ diàn huà', definition: 'звонить по телефону'},
    {id: 14, word: '大', pinin: 'dà', definition: 'большой; крупный; великий; огромный'},
    {id: 15, word: '的', pinin: 'de', definition: 'суффикс прилагательного; суффикс притяжательности'},
    {id: 16, word: '点', pinin: 'diǎn', definition: 'капля; немножко, чуточку; точка; запятая'},
    {id: 17, word: '电脑', pinin: 'diàn nǎo', definition: 'компьютер'},
    {id: 18, word: '电视', pinin: 'diàn shì', definition: 'телевидение; телевизионный'},
    {id: 19, word: '电影', pinin: 'diàn yǐng', definition: 'кино'},
    {id: 20, word: '东西', pinin: 'dōngxi', definition: 'вещь; предмет'},
    {id: 21, word: '都', pinin: 'dōu', definition: 'все; всё'},
    {id: 22, word: '读', pinin: 'dú', definition: 'читать; зачитывать'},
    {id: 23, word: '对不起', pinin: 'duì bu qǐ', definition: 'виноват!, простите!, извините! 	'},
    {id: 24, word: '多', pinin: 'duō', definition: 'много; многочисленный; свыше'},
    {id: 25, word: '多少', pinin: 'duō shao', definition: 'сколько?'},
    {id: 26, word: '儿子', pinin: 'érzi', definition: 'сын'},
    {id: 27, word: '二', pinin: 'èr', definition: 'два; второй'},
    //  不客气, 北京, 出租车 are missed mp3
    {id: 28, word: '饭馆', pinin: 'fàn guǎn', definition: 'ресторан; столовая'},
    {id: 29, word: '飞机', pinin: 'fēijī', definition: 'самолёт'},
    {id: 30, word: '分钟', pinin: 'fēn zhōng', definition: 'минута'},
    {id: 31, word: '高兴', pinin: 'gāo xìng', definition: 'радоваться; радостный'},
    {id: 32, word: '个', pinin: 'gè', definition: '	универсальное сч. сл.; отдельный; индивидуальный'},
    {id: 33, word: '工作', pinin: 'gōng zuò', definition: 'работать; работа'},
    {id: 34, word: '狗', pinin: 'gǒu', definition: 'собака; собачий'},
    {id: 35, word: '汉语', pinin: 'hànyǔ', definition: 'китайский язык'},
    {id: 36, word: '好', pinin: 'hǎo', definition: 'хороший; хорошо; приятный; удобный'},
    {id: 37, word: '喝', pinin: 'hē', definition: 'пить'},
    {id: 38, word: '和', pinin: 'hé', definition: 'мирный; союз и; предлог с'},
    {id: 39, word: '很', pinin: 'hěn', definition: 'очень; весьма'},
    {id: 40, word: '后面', pinin: 'hòumiàn', definition: 'задняя сторона; зад; позади, сзади; задний'},
    {id: 41, word: '回', pinin: 'huí', definition: 'возвращаться'},
]