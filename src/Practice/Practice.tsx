import React, {useEffect, useState} from "react";
import './practice.scss'
import {getWordsDataBase} from "../Services/dataGetter";
import {WordCard} from "./WordCard/WordCard";
import {wordCard} from "../types/types";

export const Practice = () => {
    const [words, setWords] = useState<wordCard[]>([])

    useEffect(() => {
        getWordsDataBase().then(wordSets => setWords(wordSets))
    }, [])
    console.log(words, 'words in Practice')

    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <WordCard />
            {/*<WordCard id={words.id} word={words.word} definition={words.w}/>*/}
        </div>
    )
}