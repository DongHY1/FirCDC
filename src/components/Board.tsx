import React, { useState, useEffect } from "react";
import { BOARD_SIZE } from "../constants/config";
import BoardCell from "./BoardCell";
import { BoardArray } from '../types'
import BoardButton from "./BoardButton";
import { useCounter } from "../hooks";
import '../styles/Board.css'
export default function Board() {
    const [boardArray, setBoardArray] = useState<BoardArray>(() =>
        Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
    );
    const [history, setHistory] = useState<any>([]);
    const { counter, addCounter, decreaseCounter } = useCounter(0)
    const updateBoardArray = (updateFn: (prevBoardArray: BoardArray) => BoardArray) => {
        setBoardArray((prevBoardArray) => updateFn(prevBoardArray))
    };
    const updateHistory = () => {
        setHistory((history: any) => [...history, boardArray])
    }
    const test = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
    console.log('test', test)
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            board.push(<BoardCell key={`${i}-${j}`} row={i} col={j} counter={counter} player={boardArray[i][j]} updateBoardArray={updateBoardArray} updateHistory={updateHistory} addCounter={addCounter} decreaseCounter={decreaseCounter} />);
        }
    }
    useEffect(() => {
        // 当场上棋子小于9个时，肯定没有分出胜负
        if (counter > 9) {
            console.log('谁赢了？TODO')
        }
    }, [boardArray])
    return (
        <>
            {counter}
            <BoardButton history={history} counter={counter} setBoardArray={setBoardArray} addCounter={addCounter} decreaseCounter={decreaseCounter} />
            <div className="board">{board}</div>
        </>
    )
}


