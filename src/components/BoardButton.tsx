import { Button, ButtonGroup } from '@mui/material'
import '../styles/BoardButton.css'
interface BoardButtonProps {
    handleRetract: () => void
    handleCancelRetract: () => void
    handleRestart: () => void
}
export default function BoardButton({ handleRetract, handleCancelRetract, handleRestart }: BoardButtonProps) {
    return (
        <div className="buttomWrap">
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={handleRetract}>悔棋</Button>
                <Button onClick={handleCancelRetract}>取消悔棋</Button>
                <Button onClick={handleRestart}>重新开始</Button>
            </ButtonGroup>
        </div>
    )
}
