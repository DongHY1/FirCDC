import React, { useState } from 'react'
import '../styles/BoardCell.css'
interface BoardCell {
    row: number,
    col: number
}

export default function BoardCell({ row, col }: BoardCell) {
    if (row === 0 && col === 0) {
        return (
            <div key={`${row}-${col}`} className="board-cell top-left"></div >
        )
    } else if (row === 0 && col === 14) {
        return (
            <div key={`${row}-${col}`} className="board-cell top-right"></div >
        )
    } else if (row === 14 && col === 0) {
        return (
            <div key={`${row}-${col}`} className="board-cell bottom-left"></div >
        )
    } else if (row === 14 && col === 14) {
        return (
            <div key={`${row}-${col}`} className="board-cell bottom-right"></div >
        )
    } else if (row === 0 && col !== 0 && col !== 14) {
        return (
            <div key={`${row}-${col}`} className="board-cell top-middle"></div >
        )
    } else if (row === 14 && col !== 0 && col !== 14) {
        return (
            <div key={`${row}-${col}`} className="board-cell bottom-middle"></div >
        )
    } else if (col === 0 && row !== 14 && row !== 0) {
        return (
            <div key={`${row}-${col}`} className="board-cell left-middle"></div >
        )
    } else if (col === 14 && row !== 14 && row !== 0) {
        return (
            <div key={`${row}-${col}`} className="board-cell right-middle"></div >
        )
    }
    else {
        return (
            <div key={`${row}-${col}`} className="board-cell middle"></div >
        )
    }
}
