import React, { Dispatch, SetStateAction } from "react";
import { DIV, CANVAS } from "../constants/config";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'
interface BoardSelectProps {
    selectedOption: string
    setSelectedOption: Dispatch<SetStateAction<string>>
}
export default function BoardSelect({ selectedOption, setSelectedOption }: BoardSelectProps) {

    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setSelectedOption(DIV)}>div模式</Button>
            <Button onClick={() => setSelectedOption(CANVAS)}>canvas模式</Button>
        </ButtonGroup>
    );
}


