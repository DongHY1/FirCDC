import { BOARD_SIZE } from "../constants/config";
import { BoardArray } from "../types";


export default function checkWin(boardArray: BoardArray): number {
    // 遍历每个格子
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (boardArray[i][j] !== 0) {
                // 当前格子不为空，则检查该格子的四个方向是否有五连珠
                if (checkLine(boardArray, i, j, 1, 0) ||
                    checkLine(boardArray, i, j, 0, 1) ||
                    checkLine(boardArray, i, j, 1, 1) ||
                    checkLine(boardArray, i, j, 1, -1)) {
                    // 存在五连珠，则返回当前颜色
                    return boardArray[i][j];
                }
            }
        }
    }
    // 不存在五连珠，则返回0
    return 0;
}

// 检查某个方向上是否存在五连珠
function checkLine(boardArray: BoardArray, x: number, y: number, dx: number, dy: number): boolean {
    const color = boardArray[x][y];
    for (let i = 1; i < 5; i++) {
        const tx = x + dx * i;
        const ty = y + dy * i;
        if (tx < 0 || tx >= BOARD_SIZE || ty < 0 || ty >= BOARD_SIZE || boardArray[tx][ty] !== color) {
            return false;
        }
    }
    return true;
}
