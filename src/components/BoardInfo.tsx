import { useEffect } from 'react'
import { BLACK_LABEL_INDEX, WHITE_LABEL_INDEX } from '../constants/config';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import confetti from 'canvas-confetti'
import '../styles/BoardInfo.css'
interface BoardInfoProps {
    counter: number
    winner: number
    handleRestart: () => void
}
export default function BoardInfo({ counter, winner, handleRestart }: BoardInfoProps) {
    const handleAgain = () => {
        handleRestart()
    }
    // 判断是否有赢家
    function congrats() {
        const defaults = {
            colors: [
                '#5D8C7B',
                '#F2D091',
                '#F2A679',
                '#D9695F',
                '#8C4646',
            ],
            shapes: ['square'],
            ticks: 500,
        } as confetti.Options
        confetti({
            ...defaults,
            particleCount: 80,
            spread: 100,
            origin: { y: 0 },
        })
        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 50,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
            })
        }, 250)
        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 50,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
            })
        }, 400)
    }
    useEffect(() => {
        let id: number | undefined = undefined
        if (winner !== 0) {
            id = setTimeout(congrats, 300)
        }
        return () => clearTimeout(id)

    }), [winner]
    return (
        <div className="BoardInfo">
            <h2>五子棋</h2>
            <Dialog
                open={winner !== 0}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {winner === BLACK_LABEL_INDEX ? '🎉黑子赢了' : winner === WHITE_LABEL_INDEX ? '🎉白子赢了' : null}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleAgain}>
                        再来一局
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
