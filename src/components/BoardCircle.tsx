import React from 'react'
import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config'
import { ChessColor } from '../types'
import '../styles/BoardCircle.css'
interface BoardCircleProps {
    player: number
}
export default function BoardCircle({ player }: BoardCircleProps) {
    const showCircle = player === BLACK_LABEL_INDEX || player === WHITE_LABEL_INDEX
    let color = ''
    if (player === BLACK_LABEL_INDEX) {
        color = ChessColor.BLACK
    } else if (player === WHITE_LABEL_INDEX) {
        color = ChessColor.WHITE
    }
    return (
        showCircle ? <div className={`circle ${color}`}></div> : <></>
    )
}
