import React from 'react'
import { useCounter } from '../hooks'
import '../styles/BoardButton.css'
interface BoardButtonProps {
    addCounter: () => void
    decreaseCounter: () => void
}

export default function BoardButton({ addCounter, decreaseCounter }: BoardButtonProps) {

    const handleRetract = () => {
        console.log('悔棋了')
        decreaseCounter()
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
