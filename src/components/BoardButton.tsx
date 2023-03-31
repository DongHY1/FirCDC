import React from 'react'
import { useCounter } from '../hooks'
import '../styles/BoardButton.css'
import { Update } from '../types'
interface BoardButtonProps {
    addCounter: () => void
    decreaseCounter: () => void
    history: any
    counter: number
    setBoardArray: any
}

export default function BoardButton({ history, counter, addCounter, decreaseCounter, setBoardArray }: BoardButtonProps) {

    const handleRetract = () => {
        if (counter > 0) {
            setBoardArray(history[counter - 1])
            decreaseCounter()
        }

    }
    const handleCancelRetract = () => {
        console.log('撤销悔棋了')
        addCounter()
    }
    return (
        <div className="button">
            <button onClick={handleRetract}>悔棋</button>
            <button onClick={handleCancelRetract}>撤销</button>
        </div>
    )
}
