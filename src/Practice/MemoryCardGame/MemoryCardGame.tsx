import React, {useEffect, useState} from "react";
import "./memoryCardGame.scss";
import {arrayShuffler} from "../../Services/arrayShuffler";
import {wordCard} from "../../interfaces/interfaces";
import {wordInterface} from "../../AdminSection/WordCreator/WordCreatorFireBase";


export const MemoryCardGame = ({user, words}: any) => {
    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [wordsForTheTask, setWordsForTheTask] = useState<wordCard[]>([]);

    useEffect(() => {
        if (words.length > 0) {
            setWordsForTheTask(arrayShuffler(words).slice(0, 9));
        }
    }, [words])

    const pairsOfWords: wordCard[] = [...wordsForTheTask, ...wordsForTheTask];

    function flipCard(cardIndex: number) {
        setOpenedCard((openedCard: number[]) => [...openedCard, cardIndex]);
    }

    useEffect(() => {
        if (openedCard.length < 2) return;
        const firstMatched: wordInterface = pairsOfWords[openedCard[0]];
        const secondMatched: wordInterface = pairsOfWords[openedCard[1]];
        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id]);
        }
        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
    }, [openedCard]);


    return (
        <div className="word-cards">
            {pairsOfWords.map((word: wordInterface, index: number) => {
                let isFlipped = false;
                if (openedCard.includes(index)) {
                    isFlipped = true;
                }
                if (matched.includes(word.id)) {
                    isFlipped = true;
                }
                return (
                    <div
                        className={`word-card ${isFlipped ? "flipped" : ""} `}
                        key={index}
                        onClick={() => flipCard(index)}
                    >
                        <div className="inner">
                            <div className="front">{index % 2 === 0 ? word.word : word.definition}
                            </div>
                            <div className="back"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
