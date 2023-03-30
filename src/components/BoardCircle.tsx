import React from 'react'
import '../styles/BoardCircle.css'
interface BoardCircleProps {
    showCircle: boolean,
}
export default function BoardCircle({ showCircle }: BoardCircleProps) {
    return (
        showCircle ? <div className="circle"></div> : <></>
    )
}
