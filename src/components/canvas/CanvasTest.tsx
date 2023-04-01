import React, { useRef, useEffect } from "react";

const BOARD_SIZE = 450; // 棋盘大小
const CELL_SIZE = BOARD_SIZE / 15; // 格子大小

function CanvasTest() {
    const canvasRef = useRef(null);



    function handleCanvasClick(e) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const row = Math.floor(y / CELL_SIZE);
        const col = Math.floor(x / CELL_SIZE);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(
            col * CELL_SIZE + CELL_SIZE / 2,
            row * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "black";
        ctx.fill();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // 绘制棋盘
        ctx.beginPath();
        for (let i = 0; i < 15; i++) {
            ctx.moveTo(CELL_SIZE / 2 + i * CELL_SIZE, CELL_SIZE / 2);
            ctx.lineTo(CELL_SIZE / 2 + i * CELL_SIZE, BOARD_SIZE - CELL_SIZE / 2);
        }
        for (let j = 0; j < 15; j++) {
            ctx.moveTo(CELL_SIZE / 2, CELL_SIZE / 2 + j * CELL_SIZE);
            ctx.lineTo(BOARD_SIZE - CELL_SIZE / 2, CELL_SIZE / 2 + j * CELL_SIZE);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
            0 + CELL_SIZE / 2,
            0 + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "black";
        ctx.fill();

        // 监听 Canvas 点击事件
        canvas.addEventListener("click", handleCanvasClick);

        // 组件销毁时，移除事件监听器
        return () => {
            canvas.removeEventListener("click", handleCanvasClick);
        };
    }, []);

    return <canvas ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} />;
}

export default CanvasTest;
