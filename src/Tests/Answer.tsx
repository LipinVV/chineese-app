import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../Actions/actions";

export const Answer = ({inputEl,  onButtonClick, answerOfTheQuiz, word } : any) => {

    const dispatch = useDispatch()
    const [selectedAnswer, setAnswer] = useState<any>();
    const [points, setPoints] = useState(1)
    console.log(points)
    return (
        <div
            ref={inputEl}
            className='match-the-word__word'
            style={{
                backgroundColor: selectedAnswer && selectedAnswer.id === answerOfTheQuiz.id && "rgb(12,102,110, 0.7)",
                // animationName: selectedAnswer &&  selectedAnswer.id !== answerOfTheQuiz.id  ? 'shake' : '',
                // animationDuration: selectedAnswer &&  selectedAnswer.id !== answerOfTheQuiz.id  ? '0.6s' : ''
            }}
            onClick={() => {
                setAnswer(word)
                onButtonClick()
                dispatch(incrementUserPoints(points))
            }}
        >
            <h1>{word.word}</h1>
        </div>
    );
}