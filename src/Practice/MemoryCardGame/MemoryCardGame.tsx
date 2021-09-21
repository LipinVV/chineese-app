import React, {useEffect, useState} from "react";
import "./memoryCardGame.scss";
import {arrayShuffler} from "../../Services/arrayShuffler";
import {wordCard} from "../../interfaces/interfaces";
import {wordInterface} from "../../AdminSection/WordCreator/WordCreatorFireBase";
import {server} from "../../App";
import {userInterface} from "../../Services/dataGetter";
import {Link} from "react-router-dom";


export const MemoryCardGame = ({user, words, onGameFinished}: any) => {
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

    const [collectedPoints, setCollectedPoints] = useState(0);
    const updateUserPoints = async () => {
        try {
            // FIX IT
            let {data: users}: any = await server
                .from('users')
            const chosenUser = users.find((person: userInterface) => person.nickname === user);
            const {data} = await server
                .from('users')
                .update([
                    {
                        globalPoints: chosenUser.globalPoints + collectedPoints,
                    }
                ])
                .match({nickname: user})
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (openedCard.length < 2) return;
        const firstMatched: wordInterface = pairsOfWords[openedCard[0]];
        const secondMatched: wordInterface = pairsOfWords[openedCard[1]];
        if (firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id]);
            setCollectedPoints(collectedPoints + 1);
        }
        if (firstMatched.id !== secondMatched.id) {
            setCollectedPoints(collectedPoints);
        }
        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
    }, [openedCard]);

    const collectedPointsHandler = async () => {
        onGameFinished()
        await updateUserPoints()
    }

    const repeatHandler = async () => {
        setCollectedPoints(0)
        onGameFinished()
        setMatched([])
        await updateUserPoints()
    }

    console.log(collectedPoints)
    return (
        <div className='memory-cards'>
            {pairsOfWords.map((word: wordInterface, index: number) => {
                let isFlipped = false;
                if (openedCard.includes(index) || matched.includes(word.id)) {
                    isFlipped = true;
                }
                return (
                    <div
                        className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                        key={index}
                        onClick={() => flipCard(index)}
                    >
                        <div className='memory-card memory-card__inner'>
                            <div className='memory-card memory-card__front'>{index % 2 === 0 ? <span className='memory-card__word'>{word.word}</span> : <span>{word.definition}</span>}
                            </div>
                            <div className='memory-card memory-card__back'> </div>
                        </div>
                    </div>
                );
            })}
            {collectedPoints === 9 &&
            <div className='board-game__winner-zone'>
                <Link
                    to='/practice'
                    className='board-game__exit'
                    onClick={collectedPointsHandler}
                >
                    To practice page
                </Link>
                <button
                    type='button'
                    className='board-game__restart'
                    onClick={repeatHandler}
                >
                    Repeat
                </button>
            </div>}
        </div>
    );
}
