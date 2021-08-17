import React from "react";
import './practice.scss'
import {WordCard} from "./WordCard/WordCard";
import {WordMatching} from "./WordMatching/WordMatching";
import {Tests} from "../Tests/Tests";
import {userInterface} from "../Services/dataGetter";

export const Practice = ({user}: any) => {


    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <WordMatching user={user}/>
            {/*<Tests/>*/}
        </div>
    )
}