import React, { useState } from 'react'
import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config';
import '../styles/BoardCell.css'
import { IRowCol, Update, ChessColor, BoardArray } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'
interface BoardCell {
    boardArray: BoardArray
    counter: number
    history: Array<BoardArray>
    currentPerson: number
    winner: number
    addCounter: () => void
    decreaseCounter: () => void
    updateCurrentPerson: () => void
    setHistory: any
    setCanRetract: any
}
type BoardCellProps = IRowCol & Update & BoardCell;
export default function BoardCell({ row, col, winner, setCanRetract, currentPerson, updateCurrentPerson, history, setHistory, counter, boardArray, updateBoardArray, addCounter, decreaseCounter }: BoardCellProps) {
    const player = boardArray[row][col]
    const handleCircleClick = () => {
        // 只有当Player = 0的时候才能点击
        if (player === 0 && winner === 0) {
            updateCurrentPerson();
            addCounter();
            setCanRetract(true)
            setHistory([...history, boardArray])
            updateBoardArray((arr) => {
                const newArr = [...arr];
                newArr[row] = [...arr[row]];
                newArr[row][col] = currentPerson === BLACK_LABEL_INDEX ? BLACK_LABEL_INDEX : WHITE_LABEL_INDEX;
                return newArr;
            });
        }
    };

    return <div key={`${row}-${col}`} className='board-cell' onClick={handleCircleClick}>
        <BoardLine row={row} col={col} />
        <BoardCircle player={player} />
    </div >
}

