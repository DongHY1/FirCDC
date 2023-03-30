import React from "react";
import { BOARD_SIZE } from "../constants/config";
import '../styles/Board.css'
import BoardCell from "./BoardCell";
export default function Board() {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            board.push(<BoardCell key={`${i}-${j}`} row={i} col={j} />);
        }
    }
    return <div className="board">{board}</div>;
}


