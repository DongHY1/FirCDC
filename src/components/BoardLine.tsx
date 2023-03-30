import React from 'react'
import { POSITIONS } from '../constants/config'
import { IRowCol } from '../types';
import '../styles/BoardLine.css'
export default function BoardLine({ row, col }: IRowCol) {
    const position = POSITIONS[`${row}-${col}` as '0-0' | '0-14' | '14-0' | '14-14']
    const boardClassName = position || (
        row === 0 ? 'top-middle' :
            row === 14 ? 'bottom-middle' :
                col === 0 ? 'left-middle' :
                    col === 14 ? 'right-middle' :
                        ''
    );
    return (
        <>
            <div className={`vertical-line ${boardClassName}`} ></div>
            <div className={`horizontal-line ${boardClassName}`}></div>
        </>
    )
}
