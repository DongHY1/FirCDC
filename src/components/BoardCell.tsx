import React, { useState } from 'react'
import '../styles/BoardCell.css'
interface BoardCell {
    row: number,
    col: number
}

export default function BoardCell({ row, col }: BoardCell) {
    const [showTopLeft, setShowTopLeft] = useState(false)
    const handleTopLeftClick = () => {
        setShowTopLeft((prevState) => {
            return !prevState
        })
    };
    return (
        <div key={`${row}-${col}`} className="board-cell" onClick={() => handleTopLeftClick()}>
            <div className='top-left' style={{ display: showTopLeft ? "block" : "none" }} ></div>
        </div>
    )
}
