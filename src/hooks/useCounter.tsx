import React, { useState } from 'react'

export default function useCounter(value: number) {
    const [counter, setCounter] = useState(value)
    const addCounter = () => {
        setCounter((counter) => (counter + 1))
    }
    const decreaseCounter = () => {
        setCounter((counter) => (counter - 1))
    }
    const restartCounter = () => {
        setCounter(0)
    }
    return {
        counter,
        addCounter,
        decreaseCounter,
        restartCounter
    }
}
