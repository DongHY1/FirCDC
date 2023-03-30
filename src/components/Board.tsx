import React from "react";
import '../styles/Board.css'
const Board = () => {
    const size = 15; // 棋盘大小
    const board = [];
    const handleCellClick = (i: number, j: number) => {
        console.log(`点击了第${i}行第${j}个棋子！`)
    }
    // 生成棋盘交叉点的元素
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board.push(<div key={`${i}-${j}`} className="board-cell" onClick={() => handleCellClick(i, j)}></div>);
        }
    }

    // 渲染棋盘
    return <div className="board">{board}</div>;
};
export default Board

