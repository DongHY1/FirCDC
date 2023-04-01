import { useState, useEffect, useRef } from "react";
import { LINE_WIDTH, LINE_COLOR, BLACK_LABEL_INDEX, WHITE_LABEL_INDEX, CANVAS_SIZE, CELL_SIZE, BOARD_SIZE } from "../../constants/config";
import { BoardArray, Update } from "../../types";
interface CanvasBoardProps {
    boardArray: BoardArray;
    currentPerson: number;
    updateCurrentPerson: () => void
    history: Array<BoardArray>
    winner: number
    canRetract: boolean
    canCancelRetract: boolean
    setHistory: any
    setCanRetract: any
    setCanCancelRetract: any
    isRestart: boolean
    setIsRestart: any
    addCounter: () => void
}
export default function CanvasBoard({ boardArray, currentPerson, updateCurrentPerson, updateBoardArray, winner, addCounter, setCanRetract, setCanCancelRetract, setHistory, history, canRetract, canCancelRetract, isRestart, setIsRestart }: CanvasBoardProps & Update) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawTable, setIsDrawTable] = useState(false)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        if (!isDrawTable) {
            // 线的属性
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.strokeStyle = LINE_COLOR;
            context.lineWidth = LINE_WIDTH;
            // 绘制棋盘
            context.beginPath();
            for (let i = 0; i < CANVAS_SIZE; i++) {
                context.moveTo(CELL_SIZE / 2 + i * CELL_SIZE, CELL_SIZE / 2);
                context.lineTo(CELL_SIZE / 2 + i * CELL_SIZE, CANVAS_SIZE - CELL_SIZE / 2);
                context.moveTo(CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
                context.lineTo(CANVAS_SIZE - CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
            }
            context.stroke();
            context.closePath();
            setIsDrawTable(true)
        }

        // 根据boardArray 绘制
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (boardArray[row][col] !== 0) {
                    context.beginPath();
                    context.arc(
                        col * CELL_SIZE + CELL_SIZE / 2,
                        row * CELL_SIZE + CELL_SIZE / 2,
                        CELL_SIZE / 2 - 3,
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = boardArray[row][col] === BLACK_LABEL_INDEX ? '#3d3d3d' : '#efefef';
                    context.fill();
                }
            }
        }

    }, [boardArray]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        // 线的属性
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.strokeStyle = LINE_COLOR;
        context.lineWidth = LINE_WIDTH;

        // 绘制棋盘
        context.beginPath();
        for (let i = 0; i < CANVAS_SIZE; i++) {
            context.moveTo(CELL_SIZE / 2 + i * CELL_SIZE, CELL_SIZE / 2);
            context.lineTo(CELL_SIZE / 2 + i * CELL_SIZE, CANVAS_SIZE - CELL_SIZE / 2);
            context.moveTo(CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
            context.lineTo(CANVAS_SIZE - CELL_SIZE / 2, CELL_SIZE / 2 + i * CELL_SIZE);
        }
        context.stroke();
        context.closePath();



        // 根据boardArray 绘制
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (boardArray[row][col] !== 0) {
                    context.beginPath();
                    context.arc(
                        col * CELL_SIZE + CELL_SIZE / 2,
                        row * CELL_SIZE + CELL_SIZE / 2,
                        CELL_SIZE / 2 - 3,
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = boardArray[row][col] === BLACK_LABEL_INDEX ? '#3d3d3d' : '#efefef';
                    context.fill();
                }
            }
        }
    }, [canRetract, canCancelRetract, isRestart])
    // 点击后，悔棋和取消悔棋有问题
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const row = Math.floor(y / CELL_SIZE) - 1;
        const col = Math.floor(x / CELL_SIZE) - 1;

        // 绘图逻辑
        if (boardArray[row][col] === 0 && winner === 0) {
            context.beginPath();
            context.arc(
                col * CELL_SIZE + CELL_SIZE / 2,
                row * CELL_SIZE + CELL_SIZE / 2,
                CELL_SIZE / 2 - 3,
                0,
                2 * Math.PI
            );
            context.fillStyle = currentPerson === BLACK_LABEL_INDEX ? '#3d3d3d' : '#efefef';
            context.fill();
            context.closePath();
            updateCurrentPerson()
            addCounter();
            setCanRetract(true)  // click之后是可以悔棋的
            setCanCancelRetract(false) //click之后不可以直接取消悔棋
            setHistory([...history, boardArray])
            setIsRestart(false)
            updateBoardArray((arr) => {
                const newArr = [...arr];
                newArr[row] = [...arr[row]];
                newArr[row][col] = currentPerson === BLACK_LABEL_INDEX ? BLACK_LABEL_INDEX : WHITE_LABEL_INDEX;
                return newArr;
            });

        }

    };
    return (
        <canvas
            ref={canvasRef}
            style={{ padding: '1rem' }}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onClick={handleCanvasClick}
        >
            您的浏览器不支持Canvas
        </canvas>
    );
}
