import { useState, useEffect } from "react";
import { BLACK_LABEL_INDEX, BOARD_SIZE, DIV, WHITE_LABEL_INDEX } from "../constants/config";
import BoardCell from "./BoardCell";
import { BoardArray } from '../types'
import { useCounter } from "../hooks";
import { checkWin } from "../helper";
import BoardInfo from "./BoardInfo";
import BoardSelect from "./BoardSelect";
import CanvasBoard from "./canvas/CanvasBoard";
import Footer from "./Footer";
import BoardButton from "./BoardButton";
import { useLocalStorage } from 'usehooks-ts'
import '../styles/Board.css'
export default function Board() {
    // DIV OR CANVAS?
    const [selectedOption, setSelectedOption] = useLocalStorage("selectedOption", DIV);
    // 棋盘状态
    const [boardArray, setBoardArray] = useState<BoardArray>(() =>
        Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
    );
    const updateBoardArray = (updateFn: (prevBoardArray: BoardArray) => BoardArray) => {
        setBoardArray((prevBoardArray) => updateFn(prevBoardArray))
    };
    // 记录操作步数
    const { counter, addCounter, decreaseCounter, restartCounter } = useCounter(0)
    // 存放棋盘的历史记录
    const [history, setHistory] = useState<BoardArray[]>([]);
    // 存放悔棋的唯一记录
    const [retract, setRetract] = useState<BoardArray>([]);
    // 记录当前下棋的选手是黑子还是白子，1代表黑，2代表白
    const [currentPerson, setCurrentPerson] = useState(BLACK_LABEL_INDEX)
    // 记录是否可以点击悔棋，默认可以
    const [canRetract, setCanRetract] = useState(true)
    // 记录是否可以点击取消悔棋，默认不可以
    const [canCancelRetract, setCanCancelRetract] = useState(false)
    const updateCurrentPerson = () => {
        currentPerson === BLACK_LABEL_INDEX ? setCurrentPerson(WHITE_LABEL_INDEX) : setCurrentPerson(BLACK_LABEL_INDEX)
    }
    // 
    const [isRestart, setIsRestart] = useState(false)

    // 记录最终赢家
    const [winner, setWinner] = useState(0)
    useEffect(() => {
        setWinner(checkWin(boardArray))
    }, [boardArray])

    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            board.push(<BoardCell key={`${i}-${j}`} winner={winner} setCanRetract={setCanRetract} setCanCancelRetract={setCanCancelRetract} currentPerson={currentPerson} updateCurrentPerson={updateCurrentPerson} row={i} col={j} history={history} setHistory={setHistory} boardArray={boardArray} updateBoardArray={updateBoardArray} addCounter={addCounter} setIsRestart={setIsRestart} />);
        }
    }
    const handleRetract = () => {
        // 悔棋仅在有操作数，winner还没出，且有历史纪录的情况下进行
        if (counter > 0 && history.length > 0 && canRetract && winner === 0) {
            const lastBoardArray = history[history.length - 1]; // 取出历史纪录
            setRetract(boardArray)
            updateCurrentPerson();
            setHistory(history.slice(0, -1)); // 删除最后一个历史记录
            setBoardArray(lastBoardArray);    // 将 boardArray 恢复到上一步
            decreaseCounter()
            setCanRetract(false)
            setCanCancelRetract(true) //只有在点击悔棋后，才能触发取消悔棋的逻辑
        }

    }
    const handleCancelRetract = () => {
        // 取消悔棋应该只能在 悔棋操作后发生
        if (retract.length > 0 && canCancelRetract && winner === 0) {
            setBoardArray(retract)
            setRetract([])
            setCanRetract(true) // 取消悔棋后就不可以悔棋了,等待click后
            addCounter()
            updateCurrentPerson()
            setHistory([...history, boardArray])
        }
    }
    const handleRestart = () => {
        setBoardArray(() =>
            Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
        );
        setHistory([]);
        setRetract([]);
        setCurrentPerson(BLACK_LABEL_INDEX);
        setCanRetract(true);
        setIsRestart(true)
        setWinner(0);
        restartCounter()
    };

    return (
        <>

            <BoardInfo counter={counter} winner={winner} handleRestart={handleRestart} />
            <BoardSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <div className="board">{
                selectedOption === DIV ?
                    board :
                    <CanvasBoard boardArray={boardArray} currentPerson={currentPerson} updateCurrentPerson={updateCurrentPerson} updateBoardArray={updateBoardArray} winner={winner} history={history} setHistory={setHistory} setCanRetract={setCanRetract} setCanCancelRetract={setCanCancelRetract} addCounter={addCounter} canRetract={canRetract} canCancelRetract={canCancelRetract} isRestart={isRestart} setIsRestart={setIsRestart} />
            }</div>
            <BoardButton handleCancelRetract={handleCancelRetract} handleRestart={handleRestart} handleRetract={handleRetract} />
            <Footer />
        </>
    )
}


