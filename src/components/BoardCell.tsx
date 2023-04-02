import { BoardArray } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'
import '../styles/BoardCell.css'
interface BoardCellProps {
    row: number
    col: number
    boardArray: BoardArray
    handleCellClick: (row: number, col: number) => void
}
export default function BoardCell({ row, col, boardArray, handleCellClick }: BoardCellProps) {
    const player = boardArray[row][col]
    return <div key={`${row}-${col}`} className='board-cell' onClick={() => handleCellClick(row, col)}>
        <BoardLine row={row} col={col} />
        <BoardCircle player={player} />
    </div >
}

