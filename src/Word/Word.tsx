import React from "react";

export const Word =({word, tone} : any) => {
    const tones: any = {
        0: 'grey',
        1: 'red',
        2: 'orange',
        3: 'orange',
        4: 'blue'
    }

    return (
        <>
            {word.split('').map((letter: string , index: number ) => <span key={word.word} style={{color : tones[tone.toString().split('')[index]]}}>{letter}</span>)}
        </>
    )
}