import React, { useState } from 'react'
import { POSITIONS } from '../constants/config'
import '../styles/BoardCell.css'
interface BoardCell {
    row: number,
    col: number
}

export default function BoardCell({ row, col }: BoardCell) {
    const position = POSITIONS[`${row}-${col}` as '0-0' | '0-14' | '14-0' | '14-14']
    const className = position || (
        row === 0 ? 'top-middle' :
            row === 14 ? 'bottom-middle' :
                col === 0 ? 'left-middle' :
                    col === 14 ? 'right-middle' :
                        'middle'
    );

    return <div key={`${row}-${col}`} className={`board-cell ${className}`}></div>;
}

