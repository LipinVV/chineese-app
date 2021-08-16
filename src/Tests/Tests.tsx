import React, {useEffect, useState} from "react";
import {wordCard} from "../types/types";
import {keyHandler} from "../Services/keyHandler";
import '../Practice/WordMatching/wordMatching.scss';
import {useDispatch} from "react-redux";
import {getAllWords} from "../Actions/actions";
import {getWordsDataBase} from "../Services/dataGetter";
import {arrayShuffler} from "../Services/arrayShuffler";
import {Book} from "./Answer";

export const Tests = (props: any) => {

    const [words, setWords] = useState<wordCard[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getWordsDataBase().then(wordSets => {
            dispatch(getAllWords(wordSets));
            setWords(wordSets);
        })
    }, [])

    const [randomNumber, setRandomNumber] = useState(0);

    const generateRandomNumber = () => {
        const randomInteger = Math.floor(Math.random() * 4);
        setRandomNumber(randomInteger);
    }
    let quizArray = arrayShuffler(words).slice(0,4);
    let answerOfTheQuiz = quizArray[randomNumber];

    const [selectedAnswer, setAnswer] = useState<any>();
    return (
        <div className="row turn">
            <h3>Guessed word: {answerOfTheQuiz?.word}</h3>
            <button onClick={() => {
                generateRandomNumber()
                setAnswer({})
            }}>PooRoom</button>
            <div className="col-6">
                {quizArray.map(word => (
                    <Book
                        key={keyHandler(1)}
                        word={word}
                        answerOfTheQuiz={answerOfTheQuiz}
                        selectedChoice={selectedAnswer}
                    />
                ))}
            </div>
        </div>
    );
}














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