import React, {useEffect, useState} from "react";
import {wordCard} from "../../types/types";
import {store} from "../../App";

export const WordMatching = () => {
    const wordsFromStore: any = Object.values(store.getState().wordsGetter);
    const arrayShuffle = (arr: wordCard[]) => {
        let newPos, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1))
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    }
    const [practice, setPractice] = useState<wordCard[]>([]);
    const renderQuiz = () => {
        setStatus(false)
        setPractice(arrayShuffle(wordsFromStore).filter((_: any, i: number) => i < 4));
    }
    const startTask = () => {
        setPractice(arrayShuffle(wordsFromStore).filter((_: any, i: number) => i < 4));
    }

    let num = Math.floor(Math.random() * 4);
    const [status, setStatus] = useState(false);
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
                    ...word,
                    status: word.definition === value ? 'error' : status,
                }
            })
            setPractice(toggler);
        }
    }
    useEffect(() => {
        renderQuiz()
    }, [])
    console.log('practice', practice)
    return (
        <div className='match-the-word'>Word-matching

        </div>
    )
}