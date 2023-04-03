import { useState, useEffect, useRef } from "react";
import { LINE_WIDTH, LINE_COLOR, BLACK_LABEL_INDEX, CANVAS_SIZE, CELL_SIZE, BOARD_SIZE, CANVAS_PHONE_SIZE, CELL_PHONE_SIZE } from "../../constants/config";
import { BoardArray } from "../../types";
import { useMediaQuery } from "../../hooks";
import '../../styles/DivBoard.css'
interface CanvasBoardProps {
    boardArray: BoardArray;
    canRetract: boolean
    canCancelRetract: boolean
    isRestart: boolean
    handleCellClick: (row: number, col: number) => void
}
export default function CanvasBoard({ boardArray, handleCellClick, canRetract, canCancelRetract, isRestart }: CanvasBoardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawTable, setIsDrawTable] = useState(false)
    const isMobile = useMediaQuery('(max-width: 767px)')
    const _CANVAS_SIZE = isMobile ? CANVAS_PHONE_SIZE : CANVAS_SIZE
    const _CELL_SIZE = isMobile ? CELL_PHONE_SIZE : CELL_SIZE
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        // 初始化逻辑
        if (!isDrawTable) {
            drawBoard(canvas, context)
            setIsDrawTable(true)
        }
        drawCircle(canvas, context)

        // 反悔等逻辑
        if (canRetract || canCancelRetract || isRestart) {
            drawBoard(canvas, context)
            drawCircle(canvas, context)
        }
    }, [boardArray, canRetract, canCancelRetract, isRestart, isDrawTable, isMobile]);

    const drawBoard = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        // 线的属性
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.strokeStyle = LINE_COLOR;
        context.lineWidth = LINE_WIDTH;
        // 绘制棋盘
        context.beginPath();
        for (let i = 0; i < CANVAS_SIZE; i++) {
            context.moveTo(_CELL_SIZE / 2 + i * _CELL_SIZE, _CELL_SIZE / 2);
            context.lineTo(_CELL_SIZE / 2 + i * _CELL_SIZE, _CANVAS_SIZE - _CELL_SIZE / 2);
            context.moveTo(_CELL_SIZE / 2, _CELL_SIZE / 2 + i * _CELL_SIZE);
            context.lineTo(_CANVAS_SIZE - _CELL_SIZE / 2, _CELL_SIZE / 2 + i * _CELL_SIZE);
        }
        context.stroke();
        context.closePath();
    }
    const drawCircle = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        // 根据boardArray 绘制
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (boardArray[row][col] !== 0) {
                    context.beginPath();
                    context.arc(
                        col * _CELL_SIZE + _CELL_SIZE / 2,
                        row * _CELL_SIZE + _CELL_SIZE / 2,
                        _CELL_SIZE / 2 - 3,
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = boardArray[row][col] === BLACK_LABEL_INDEX ? '#3d3d3d' : '#efefef';
                    context.fill();
                }
            }
        }
    }
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const row = Math.floor(y / _CELL_SIZE);
        const col = Math.floor(x / _CELL_SIZE);
        // 绘图逻辑
        handleCellClick(row, col)
    };
    return (
        <div className="board">
            <canvas
                ref={canvasRef}
                width={_CANVAS_SIZE}
                height={_CANVAS_SIZE}
                onClick={handleCanvasClick}
            >
                您的浏览器不支持Canvas
            </canvas>
        </div>
    );
}
