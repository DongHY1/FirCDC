import React, { useState } from "react";
import { BOARD_SIZE } from "../constants/config";
import '../styles/Board.css'
import BoardCell from "./BoardCell";
import { BoardArray } from '../types'
export default function Board() {
    const [boardArray, setBoardArray] = useState<BoardArray>(() =>
        Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
    );
    const updateBoardArray = (updateFn: (prevBoardArray: BoardArray) => BoardArray) => {
        setBoardArray((prevBoardArray) => updateFn(prevBoardArray))
    };
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            board.push(<BoardCell key={`${i}-${j}`} row={i} col={j} updateBoardArray={updateBoardArray} />);
        }
    }
    return <div className="board">{board}</div>;
}


