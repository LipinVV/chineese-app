import React, {useEffect, useState} from "react";
import './practice.scss'
import {Link} from "react-router-dom";
import {Dictionary} from "../Dictionary/Dictionary";

export const Practice = ({setMenuIsOpen} : any) => {
    const [styleOfTheFirstPractice, setStyleOfTheFirstPractice] = useState({display: 'none'});
    const [styleOfTheSecondPractice, setStyleOfTheSecondPractice] = useState({display: 'none'});
    const [styleOfTheThirdPractice, setStyleOfTheThirdPractice] = useState({display: 'none'});
    const [styleOfTheFourthPractice, setStyleOfTheFourthPractice] = useState({display: 'none'});
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const reportWindowSize = () => {
            setWidth(window.innerWidth)
        }
        window.onresize = reportWindowSize;
        window.addEventListener('resize', reportWindowSize);
    }, [])

    return (
        <div className='practice'>
            <div className='practice__navigation'>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                        setStyleOfTheFirstPractice({display: 'flex'});
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                        setStyleOfTheFirstPractice({display: 'none'})
                    }}
                    className='practice__navigation-link' to='/practice/definition-word'>
                    <span className='practice__navigation-title'>Definition-Word</span></Link>
                <div className='practice__navigation__task-description' style={styleOfTheFirstPractice}>
                        <h4 className='practice__navigation__task-header'>Description of the task:</h4>
                        <div className='practice__navigation__task-text'>Match a definition with it's character</div>
                </div>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                        setStyleOfTheSecondPractice({display: 'flex'});
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                        setStyleOfTheSecondPractice({display: 'none'})
                    }} className='practice__navigation-link' to='/practice/word-definition'><span
                    className='practice__navigation-title'>Word-Definition</span> </Link>
                <div className='practice__navigation__task-description' style={styleOfTheSecondPractice}>
                    <h4 className='practice__navigation__task-header'>Description of the task:</h4>
                    <div className='practice__navigation__task-text'>Match a character with it's definition</div>
                </div>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                        setStyleOfTheFourthPractice({display: 'flex'});
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                        setStyleOfTheFourthPractice({display: 'none'})
                    }} className='practice__navigation-link' to='/practice/board-game'><span
                    className='practice__navigation-title'>Board game</span></Link>
                <div className='practice__navigation__task-description' style={styleOfTheFourthPractice}>
                    <h4 className='practice__navigation__task-header'>Description of the task:</h4>
                    <div className='practice__navigation__task-text'>Find all correct pairs of word and pinyin</div>
                </div>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setStyleOfTheThirdPractice({display: 'flex'});
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setStyleOfTheThirdPractice({display: 'none'})
                    }} className='practice__navigation-link' to='/practice/audio-matching'><span
                    className='practice__navigation-title'>Audio-word</span></Link>
                <div className='practice__navigation__task-description' style={styleOfTheThirdPractice}>
                    <h4 className='practice__navigation__task-header'>Description of the task:</h4>
                    <div className='practice__navigation__task-text'>Type a word in accordance to the audio <br/>Play audio a few times is necessary</div>
                </div>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setStyleOfTheThirdPractice({display: 'flex'});
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setStyleOfTheThirdPractice({display: 'none'})
                    }} className='practice__navigation-link' to='/practice/audio-definition'><span
                    className='practice__navigation-title'>Audio-matching</span></Link>
                <div className='practice__navigation__task-description' style={styleOfTheThirdPractice}>
                    <h4 className='practice__navigation__task-header'>Description of the task:</h4>
                    <div className='practice__navigation__task-text'>Match the audio with it's definition <br/>Play audio a few times is necessary</div>
                </div>
            </div>
        </div>
    )
}