import React from "react";
import './practice.scss'
import {WordCard} from "./WordCard/WordCard";
import {WordMatching} from "./WordMatching/WordMatching";
import {WordMatchingTests} from "./WordMatching/WordMatchingTests";

export const Practice = () => {


    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <WordMatchingTests/>
            {/*<WordMatching/>*/}
            {/*<WordCard />*/}
            {/*<WordCard id={words.id} word={words.word} definition={words.w}/>*/}
        </div>
    )
}