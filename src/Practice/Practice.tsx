import React from "react";
import './practice.scss'
import {WordCard} from "./WordCard/WordCard";
import {WordMatching} from "./WordMatching/WordMatching";

export const Practice = () => {


    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <WordMatching/>
            <WordCard />
            {/*<WordCard id={words.id} word={words.word} definition={words.w}/>*/}
        </div>
    )
}