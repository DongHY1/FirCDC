import React, { useState } from 'react'
import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config';
import '../styles/BoardCell.css'
import { IRowCol, Update, ChessColor } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'
interface BoardCell {
    player: number
    counter: number
    addCounter: () => void
    decreaseCounter: () => void

}
type BoardCellProps = IRowCol & Update & BoardCell;
export default function BoardCell({ row, col, counter, player, updateBoardArray, updateHistory, addCounter, decreaseCounter }: BoardCellProps) {

    const handleCircleClick = ({ row, col }: IRowCol) => {
        const isBlack = counter % 2 === 0
        const canClick = player === 0
        if (canClick) {
            addCounter();
            updateHistory();
        }
        // 增加一个标记
        updateBoardArray((arr) => {
            const newArr = [...arr];
            newArr[row] = [...arr[row]];
            if (newArr[row][col] === 0) {
                newArr[row][col] = isBlack ? BLACK_LABEL_INDEX : WHITE_LABEL_INDEX;
            }
            return newArr;
        });

    };

    return <div key={`${row}-${col}`} className='board-cell' onClick={() => handleCircleClick({ row, col })}>
        <BoardLine row={row} col={col} />
        <BoardCircle player={player} />
    </div >
}

