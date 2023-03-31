import { useState, useEffect, useRef } from "react";
import { BOARD_SIZE, LINE_WIDTH, LINE_COLOR, STEP_COLOR, PLAYER1_COLOR, PLAYER2_COLOR, BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from "../../constants/config";
import { BoardArray } from "../../types";
interface CanvasBoardProps {
    boardArray: BoardArray;
    currentPerson: number;
}

export default function CanvasBoard({ boardArray, currentPerson }: CanvasBoardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const boardWidth = canvas.width - LINE_WIDTH;
        const boardHeight = canvas.height - LINE_WIDTH;
        const lineGap = boardWidth / (BOARD_SIZE - 1);

        // 绘制棋盘
        context.strokeStyle = LINE_COLOR;
        context.lineWidth = LINE_WIDTH;
        for (let i = 0; i < BOARD_SIZE; i++) {
            const x = lineGap * i + LINE_WIDTH / 2;
            context.beginPath();
            context.moveTo(x, LINE_WIDTH / 2);
            context.lineTo(x, boardHeight);
            context.stroke();
            const y = lineGap * i + LINE_WIDTH / 2;
            context.beginPath();
            context.moveTo(LINE_WIDTH / 2, y);
            context.lineTo(boardWidth, y);
            context.stroke();
        }

        // 绘制棋子
        const radius = lineGap / 2 - 2;
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                const x = i * lineGap + LINE_WIDTH / 2;
                const y = j * lineGap + LINE_WIDTH / 2;

                if (boardArray[i][j] === BLACK_LABEL_INDEX) {
                    context.fillStyle = PLAYER1_COLOR;
                    context.beginPath();
                    context.arc(x, y, radius, 0, 2 * Math.PI);
                    context.fill();
                } else if (boardArray[i][j] === WHITE_LABEL_INDEX) {
                    context.fillStyle = PLAYER2_COLOR;
                    context.beginPath();
                    context.arc(x, y, radius, 0, 2 * Math.PI);
                    context.fill();
                }
            }
        }
    }, [boardArray]);

    const handleCanvasClick = () => {
        console.log("click!");
    };

    return (
        <canvas
            ref={canvasRef}
            width={450}
            height={450}
            onClick={handleCanvasClick}
        >
            您的浏览器不支持Canvas
        </canvas>
    );
}
