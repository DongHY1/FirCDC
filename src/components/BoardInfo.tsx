import React, { useEffect } from 'react'
import '../styles/BoardInfo.css'
import { BLACK_LABEL_INDEX } from '../constants/config';
import confetti from 'canvas-confetti'
interface BoardInfoProps {
    counter: number;
    winner: number
}
export default function BoardInfo({ counter, winner }: BoardInfoProps) {
    // 判断是否有赢家
    function congrats() {
        const defaults = {
            colors: [
                '#5D8C7B',
                '#F2D091',
                '#F2A679',
                '#D9695F',
                '#8C4646',
            ],
            shapes: ['square'],
            ticks: 500,
        } as confetti.Options
        confetti({
            ...defaults,
            particleCount: 80,
            spread: 100,
            origin: { y: 0 },
        })
        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 50,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
            })
        }, 250)
        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 50,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
            })
        }, 400)
    }
    useEffect(() => {
        let id: number | undefined = undefined
        if (winner !== 0) {
            id = setTimeout(congrats, 300)
        }
        return () => clearTimeout(id)

    }), [winner]
    return (
        <div className="BoardInfo">
            {/* <div className="counter">
                回合数：{counter}
            </div> */}
            {winner !== 0 && (
                // 如果有赢家，则显示赢家的信息
                <div className="winner">
                    {winner === BLACK_LABEL_INDEX ? '黑色赢了' : '白色赢了'}
                </div>
            )}
        </div>
    );
}
