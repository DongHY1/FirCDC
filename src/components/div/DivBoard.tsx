import { BOARD_SIZE } from '../../constants/config';
import { BoardArray } from '../../types';
import BoardCell from '../BoardCell';
import '../../styles/DivBoard.css'
interface DivBoardProps {
    boardArray: BoardArray
    handleCellClick: (row: number, col: number) => void
}
export default function DivBoard({ boardArray, handleCellClick }: DivBoardProps) {
    const boardCells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            boardCells.push(
                <BoardCell key={`${i}-${j}`} row={i} col={j} boardArray={boardArray} handleCellClick={handleCellClick} />
            );
        }
    }
    return (
        <div className="board">
            {boardCells}
        </div>
    );
}
