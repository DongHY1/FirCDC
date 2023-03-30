import React, { useState } from 'react'
import '../styles/BoardCell.css'
import { IRowCol } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'
export default function BoardCell({ row, col }: IRowCol) {
    const [showCircle, setShowCircle] = useState(false);
    const handleCircleClick = () => {
        setShowCircle(!showCircle);
    };

    return <div key={`${row}-${col}`} className='board-cell' onClick={handleCircleClick}>
        <BoardLine row={row} col={col} />
        <BoardCircle showCircle={showCircle} />
    </div >
}

