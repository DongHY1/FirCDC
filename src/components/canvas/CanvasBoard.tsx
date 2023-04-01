import { useState, useEffect, useRef } from "react";
import { LINE_WIDTH, LINE_COLOR, PLAYER1_COLOR, PLAYER2_COLOR, BLACK_LABEL_INDEX, WHITE_LABEL_INDEX, CANVAS_SIZE, CELL_SIZE, BOARD_SIZE } from "../../constants/config";
import { BoardArray, ChessColor, Update } from "../../types";
interface CanvasBoardProps {
    boardArray: BoardArray;
    currentPerson: number;
    updateCurrentPerson: () => void
}
interface DrawCircleProps {
    context: any
    col: number
    row: number
}
export default function CanvasBoard({ boardArray, currentPerson, updateCurrentPerson, updateBoardArray }: CanvasBoardProps & Update) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // 线的属性
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

        // 根据boardArray 绘制
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (boardArray[row][col] !== 0) {
                    context.beginPath();
                    context.arc(
                        col * CELL_SIZE + CELL_SIZE / 2,
                        row * CELL_SIZE + CELL_SIZE / 2,
                        CELL_SIZE / 2 - 2,
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = boardArray[row][col] === BLACK_LABEL_INDEX ? ChessColor.BLACK : ChessColor.WHITE;
                    context.fill();
                }
            }
        }

    }, [boardArray]);

    const drawCircle = (context: any, col: number, row: number) => {
        // context.beginPath();
        // context.arc(
        //     col * CELL_SIZE + CELL_SIZE / 2,
        //     row * CELL_SIZE + CELL_SIZE / 2,
        //     CELL_SIZE / 2 - 2,
        //     0,
        //     2 * Math.PI
        // );
        // context.fillStyle = currentPerson === BLACK_LABEL_INDEX ? ChessColor.BLACK : ChessColor.WHITE;
        // context.fill();
        console.log('draw done!')
    }
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
        console.log(row, col, currentPerson)

        // 绘图逻辑
        if (boardArray[row][col] === 0) {
            context.beginPath();
            context.arc(
                col * CELL_SIZE + CELL_SIZE / 2,
                row * CELL_SIZE + CELL_SIZE / 2,
                CELL_SIZE / 2 - 2,
                0,
                2 * Math.PI
            );
            context.fillStyle = currentPerson === BLACK_LABEL_INDEX ? ChessColor.BLACK : ChessColor.WHITE;
            context.fill();

            updateCurrentPerson()
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
            style={{ padding: '2.5rem' }}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onClick={handleCanvasClick}
        >
            您的浏览器不支持Canvas
        </canvas>
    );
}
