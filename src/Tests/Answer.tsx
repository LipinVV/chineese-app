import React, {useState} from "react";

export const Book = ({ selectedChoice, answerOfTheQuiz, word } : any) => {
    const [selectedAnswer, setAnswer] = useState<any>();
    const q = 1
    return (
        <div
            style={{
                color: selectedAnswer && selectedAnswer.id === answerOfTheQuiz.id ? "green" : "red"
            }}
            onClick={() => {setAnswer(word)}}
        >
            <h1>{word.word}</h1>
        </div>
    );
}