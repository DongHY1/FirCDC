import React, { useState } from 'react'
import '../styles/BoardCell.css'
import { IRowCol, UpdateBoardArray, BoardArray } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'

type BoardCellProps = IRowCol & UpdateBoardArray;
export default function BoardCell({ row, col, updateBoardArray }: BoardCellProps) {
    const [showCircle, setShowCircle] = useState(false);
    const handleCircleClick = ({ row, col }: IRowCol) => {
        updateBoardArray((arr) => {
            const newArr = [...arr];
            // 拷贝原数组中的一维数组到新数组中
            newArr[row] = [...arr[row]];
            newArr[row][col] = 1;
            return newArr;
        });
        setShowCircle(!showCircle);
    };

    return <div key={`${row}-${col}`} className='board-cell' onClick={() => handleCircleClick({ row, col })}>
        <BoardLine row={row} col={col} />
        <BoardCircle showCircle={showCircle} color='black' />
    </div >
}

