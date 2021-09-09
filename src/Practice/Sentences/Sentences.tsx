import React, {useEffect, useState} from 'react';
import './sentences.scss';


export const Sentences = ({user, onGameFinished} : any) => {


    return (
        <div>
            Create a database with sentences. Sentence should be as array
            <br/>
            Shuffle and render the array
            <br/>
            Put all parts separated
            <br/>
            Above this - same number of the free space, to put a part of the sentence
            <br/>
            Parts should be draggable and clickable to set in such free spaces
            <br/>
            If matched the WHOLE sentence - player won
            <br/>
            <br/>
            []    []    []
            <br/>
            很 好 吃
        </div>
    )
}

