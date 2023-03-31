import React from 'react'
import '../styles/BoardInfo.css'
import { BLACK_LABEL_INDEX } from '../constants/config';
interface BoardInfoProps {
    counter: number;
    winner: number
}
export default function BoardInfo({ counter, winner }: BoardInfoProps) {
    // 判断是否有赢家
    const hasWinner = winner !== 0;

    return (
        <div className="BoardInfo">
            <div className="counter">
                回合数：{counter}
            </div>
            {hasWinner && (
                // 如果有赢家，则显示赢家的信息
                <div className="winner">
                    {winner === BLACK_LABEL_INDEX ? '黑色赢了' : '白色赢了'}
                </div>
            )}
        </div>
    );
}
