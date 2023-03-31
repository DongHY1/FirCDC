import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config';
import { IRowCol, Update, BoardArray } from '../types'
import BoardCircle from './BoardCircle';
import BoardLine from './BoardLine'
import '../styles/BoardCell.css'
interface BoardCell {
    boardArray: BoardArray
    history: Array<BoardArray>
    currentPerson: number
    winner: number
    setHistory: any
    setCanRetract: any
    setCanCancelRetract: any
    addCounter: () => void
    updateCurrentPerson: () => void
}
type BoardCellProps = IRowCol & Update & BoardCell;
export default function BoardCell({ row, col, winner, setCanCancelRetract, setCanRetract, currentPerson, updateCurrentPerson, history, setHistory, boardArray, updateBoardArray, addCounter }: BoardCellProps) {
    const player = boardArray[row][col]
    const handleCircleClick = () => {
        // 只有当Player = 0的时候才能点击
        if (player === 0 && winner === 0) {
            updateCurrentPerson();
            addCounter();
            setCanRetract(true)  // click之后是可以悔棋的
            setCanCancelRetract(false) //click之后不可以直接取消悔棋
            setHistory([...history, boardArray])
            updateBoardArray((arr) => {
                const newArr = [...arr];
                newArr[row] = [...arr[row]];
                newArr[row][col] = currentPerson === BLACK_LABEL_INDEX ? BLACK_LABEL_INDEX : WHITE_LABEL_INDEX;
                return newArr;
            });
        }
    };

    return <div key={`${row}-${col}`} className='board-cell' onClick={handleCircleClick}>
        <BoardLine row={row} col={col} />
        <BoardCircle player={player} />
    </div >
}

