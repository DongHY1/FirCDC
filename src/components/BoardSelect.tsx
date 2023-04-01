import React, { Dispatch, SetStateAction } from "react";
import { DIV, CANVAS } from "../constants/config";
import '../styles/BoardSelect.css'
interface BoardSelectProps {
    selectedOption: string
    setSelectedOption: Dispatch<SetStateAction<string>>
}
export default function BoardSelect({ selectedOption, setSelectedOption }: BoardSelectProps) {

    return (
        <div className="BoardSelect">
            <button onClick={() => setSelectedOption(DIV)}>div模式</button>
            <button onClick={() => setSelectedOption(CANVAS)}>canvas模式</button>
        </div >
    );
}


