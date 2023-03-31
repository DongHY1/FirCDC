import React, { useState } from 'react'
import { useCounter } from '../hooks'
import '../styles/BoardButton.css'
import { BoardArray, Update } from '../types'
interface BoardButtonProps {
    boardArray: BoardArray
    addCounter: () => void
    decreaseCounter: () => void
    history: any
    counter: number
    setBoardArray: any
}

export default function BoardButton({ boardArray, history, counter, addCounter, decreaseCounter, setBoardArray }: BoardButtonProps) {
    const [prevState, setPrevState] = useState<any>(null)
    const handleRetract = () => {
        if (counter > 0) {
            setPrevState(boardArray)
            setBoardArray(history[counter - 1])
            decreaseCounter()
        }

    }
    const handleCancelRetract = () => {
        setBoardArray(prevState)
        addCounter()
    }
    return (
        <div className="button">
            <button onClick={handleRetract}>悔棋</button>
            <button onClick={handleCancelRetract}>撤销</button>
        </div>
    )
}
