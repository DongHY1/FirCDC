import { Dispatch, SetStateAction } from "react";
import { DIV, CANVAS } from "../constants/config";
import { Button, ButtonGroup } from '@mui/material'
interface BoardSelectProps {
    selectedOption: string
    setSelectedOption: Dispatch<SetStateAction<string>>
}

export default function BoardSelect({ setSelectedOption }: BoardSelectProps) {

    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setSelectedOption(DIV)}>div模式</Button>
            <Button onClick={() => setSelectedOption(CANVAS)}>canvas模式</Button>
        </ButtonGroup>
    );
}


