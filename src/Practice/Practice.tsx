import React from "react";
import './practice.scss'
import {Link} from "react-router-dom";
import {DefinitionWord} from "./WordMatching/DefinitionWord";


export const Practice = ({user}: any) => {


    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <div className='practice__navigation'>
                <Link className='practice__navigation-link' to='/practice/definition-word'><span className='practice__navigation-title'>Definition-Word</span></Link>
                <Link className='practice__navigation-link' to='/practice/word-definition'><span className='practice__navigation-title'>Word-Definition</span> </Link>
                <Link className='practice__navigation-link' to='/practice/word-matching'><span className='practice__navigation-title'>Sprint </span></Link>
                <Link className='practice__navigation-link' to='/practice/board-game'><span className='practice__navigation-title'>Board game</span></Link>
            </div>
        </div>
    )
}