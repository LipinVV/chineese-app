import React from "react";

export const Word =({word, tone} : any) => {

    const tones: any = {
        0: 'grey',
        1: 'white',
        2: 'green',
        3: 'yellow',
        4: 'blue'
    }


    return (
        <>
            {word.split('').map((letter: any , index: any ) => <span style={{color : tones[tone.toString().split('')[index]]}}>{letter}</span>)}
        </>
    )
}