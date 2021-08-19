import React, {useEffect, useState, useRef} from "react";
import {wordCard} from "../types/types";
import {keyHandler} from "../Services/keyHandler";
import '../Practice/WordMatching/definitionWord.scss';
import {useDispatch} from "react-redux";
import {getAllWords} from "../Actions/actions";
import {getWordsDataBase} from "../Services/dataGetter";
import {arrayShuffler} from "../Services/arrayShuffler";
import {Answer} from "./Answer";

export const Tests = (props: any) => {
    // можно ли забрать из глоабального стора?
    const [words, setWords] = useState<wordCard[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getWordsDataBase().then(wordSets => {
            dispatch(getAllWords(wordSets));
            setWords(wordSets);
        })
    }, [])
console.log(words)
    const [randomNumber, setRandomNumber] = useState(0);

    const generateRandomNumber = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }
    let quizArray = arrayShuffler(words).slice(0, 4)
    let answerOfTheQuiz = quizArray[randomNumber];

    const [selectedAnswer, setAnswer] = useState<any>();

    const divElem = useRef(null);
    const [some, setSome] = useState<any>(false)
    const inputEl = useRef<any>(null);
    const onButtonClick = () => {
        inputEl.current.className = 'match-the-word__word match-the-word_animated'
    };
    const [points, setPoints] = useState(0)
    return (
        <div>
            <h3>Guessed word: {answerOfTheQuiz?.word}</h3>
            <div  className="match-the-word">
                {quizArray.map((word, index) => (
                    <Answer
                        inputEl={inputEl}
                        className="match-the-word__word"
                        key={keyHandler(index)}
                        word={word}
                        answerOfTheQuiz={answerOfTheQuiz}
                        onButtonClick={onButtonClick}
                    />
                ))}
            </div>
            <button

                onClick={() => {
                generateRandomNumber()
                setAnswer({})
            }}>Next
            </button>
        </div>
    );
}
// incorrect version
// <div>
//     <h1>Match word</h1>
//     <h3 style={{'width' : '100%'}}>{answer?.word}</h3>
//     <div className='match-the-word'>
//         {words.map((word: wordCard, index: number) => {
//             return (
//              <div key={keyHandler(index)}
//                   style={{
//                       fontSize: '40px',
//                       color: selectedAnswer && selectedAnswer?.id === answer?.id ? "green" : "red"
//                   }}
//                   onClick={() => setAnswer(word)}
//                   // className={word.word === answer.word && word.id === answer.id ? 'yes' : ''}
//              >
//                  {word.word === answer.word ? 'yes' : 'no'}
//                  <button
//                      id='btn'
//                      key={keyHandler(index)}
//                      className={'match-the-word__word'}
//                      value={word.word}
//                      onClick={(evt) => {
//                          handler(evt)
//                      }}
//                  >
//                      {word.word}
//                  </button>
//              </div>
//             )
//         })}
//     </div>
//     <div className='match-the-word__result'>{words[randomNumber]?.definition}</div>
//     <button
//         onClick={(evt) => {
//             handler2(evt)
//     }} className='button'>Next</button>
// </div>