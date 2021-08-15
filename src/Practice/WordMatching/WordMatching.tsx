import React, {useState, useEffect} from "react";

export const WordMatching = () => {
    const [words, setWords] = useState([])


    const arrayShuffle = (arr: any) => {
        let newPos, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1))
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    }

    const [practice, setPractice] = useState([]);

    const renderQuiz = () => {
        setStatus(false)
        setPractice(arrayShuffle(words).filter((_: any, i: number) => i < 4));
    }

    //to start
    const startTask = () => {
        setPractice(arrayShuffle(words).filter((_: any, i: number) => i < 4));
    }

    let num = Math.floor(Math.random() * 4);

    const [status, setStatus] = useState(false)
    const validation = (evt: any) => {
        const { value } = evt.target;
        if (value === practice[num]) {
            setStatus(true)
        }
        if (value !== practice[num]) {
            setStatus(false)
            const toggler = practice.map((word) => {
                console.log('value', word)
                return {
                    // ...word,
                    // status: word.definition === value ? 'error' : word.status,
                }
            })
            // setPractice(toggler);
        }
    }

    return (
        <div className='match-the-word'>Word-matching

        </div>
    )
}