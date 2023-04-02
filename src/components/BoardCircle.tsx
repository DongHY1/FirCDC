import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config'
import { ChessColor } from '../types'
import '../styles/BoardCircle.css'
interface BoardCircleProps {
    player: number
}
export default function BoardCircle({ player }: BoardCircleProps) {
    const showCircle = player === BLACK_LABEL_INDEX || player === WHITE_LABEL_INDEX
    const color = player === BLACK_LABEL_INDEX ? ChessColor.BLACK :
        player === WHITE_LABEL_INDEX ? ChessColor.WHITE :
            '';
    return (
        showCircle ? <div className={`circle ${color}`}></div> : <></>
    )
}
