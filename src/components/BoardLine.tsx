import React from 'react'
import { BOARD_SIZE, POSITIONS } from '../constants/config'
import { IRowCol } from '../types';
import '../styles/BoardLine.css'
export default function BoardLine({ row, col }: IRowCol) {
    const position = POSITIONS[`${row}-${col}` as any]
    const boardClassName = position || (
        row === 0 ? 'top-middle' :
            row === BOARD_SIZE - 1 ? 'bottom-middle' :
                col === 0 ? 'left-middle' :
                    col === BOARD_SIZE - 1 ? 'right-middle' :
                        ''
    );
    return (
        <>
            <div className={`vertical-line ${boardClassName}`} ></div>
            <div className={`horizontal-line ${boardClassName}`}></div>
        </>
    )
}
