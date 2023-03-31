import React, { useState, useEffect } from "react";
import { BLACK_LABEL_INDEX, BOARD_SIZE, WHITE_LABEL_INDEX } from "../constants/config";
import BoardCell from "./BoardCell";
import { BoardArray } from '../types'
// import BoardButton from "./BoardButton";
import { useCounter } from "../hooks";
import '../styles/Board.css'
export default function Board() {
    // 棋盘状态
    const [boardArray, setBoardArray] = useState<BoardArray>(() =>
        Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
    );
    const updateBoardArray = (updateFn: (prevBoardArray: BoardArray) => BoardArray) => {
        setBoardArray((prevBoardArray) => updateFn(prevBoardArray))
    };
    // 记录操作步数
    const { counter, addCounter, decreaseCounter } = useCounter(0)
    // 存放棋盘的历史记录
    const [history, setHistory] = useState<BoardArray[]>([]);
    // 存放悔棋的唯一记录
    const [retract, setRetract] = useState<BoardArray>([]);
    // 记录当前下棋的选手是黑子还是白子，1代表黑，2代表白
    const [currentPerson, setCurrentPerson] = useState(BLACK_LABEL_INDEX)
    // 记录是否悔棋了,f
    const [canRetract, setCanRetract] = useState(true)
    const updateCurrentPerson = () => {
        currentPerson === BLACK_LABEL_INDEX ? setCurrentPerson(WHITE_LABEL_INDEX) : setCurrentPerson(BLACK_LABEL_INDEX)
    }

    useEffect(() => {
        // 当场上棋子小于9个时，肯定没有分出胜负
        if (counter > 9) {
            console.log('谁赢了？TODO')
        }
    }, [boardArray])

    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            board.push(<BoardCell key={`${i}-${j}`} setCanRetract={setCanRetract} currentPerson={currentPerson} updateCurrentPerson={updateCurrentPerson} row={i} col={j} history={history} setHistory={setHistory} counter={counter} boardArray={boardArray} updateBoardArray={updateBoardArray} addCounter={addCounter} decreaseCounter={decreaseCounter} />);
        }
    }
    const handleRetract = () => {
        // 悔棋仅在有操作数，且有历史纪录的情况下进行
        if (counter > 0 && history.length > 0 && canRetract) {
            const lastBoardArray = history[history.length - 1]; // 取出历史纪录
            setRetract(boardArray)
            updateCurrentPerson();
            setHistory(history.slice(0, -1)); // 删除最后一个历史记录
            setBoardArray(lastBoardArray);    // 将 boardArray 恢复到上一步
            decreaseCounter()
            setCanRetract(false)
        }

    }
    const handleCancelRetract = () => {
        if (retract.length > 0) {
            setBoardArray(retract)
            setRetract([])
            setCanRetract(true)
            addCounter()
            updateCurrentPerson()
            setHistory([...history, boardArray])
        }
    }
    return (
        <>
            {counter}
            <div className="buttom">
                <button onClick={handleRetract}>悔棋</button>
                <button onClick={handleCancelRetract}>取消悔棋</button>
            </div>
            <div className="board">{board}</div>
        </>
    )
}


