import React from 'react'
import '../styles/BoardCircle.css'
interface BoardCircleProps {
    showCircle: boolean,
    color: string
}
export default function BoardCircle({ showCircle, color }: BoardCircleProps) {
    return (
        showCircle ? <div className={`circle ${color}`}></div> : <></>
    )
}
