import React from "react";
import './practice.scss'
import {Link} from "react-router-dom";
import {WordMatching} from "./WordMatching/WordMatching";


export const Practice = ({user}: any) => {


    return (
        <div className='practice'>
            <h1 className='practice__header'>Practice</h1>
            <div className='practice__navigation'>
                <Link className='practice__navigation-link' to='/practice/word-matching'>Definition-Word</Link>
                <Link className='practice__navigation-link' to='/practice/word-matching'>Word-Definition </Link>
                <Link className='practice__navigation-link' to='/practice/word-matching'>Audio Challenge </Link>
                <Link className='practice__navigation-link' to='/practice/word-matching'>Sprint </Link>
            </div>
        </div>
    )
}