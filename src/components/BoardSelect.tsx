import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { DIV, CANVAS } from "../constants/config";
interface BoardSelectProps {
    selectedOption: string
    setSelectedOption: Dispatch<SetStateAction<string>>
}
export default function BoardSelect({ selectedOption, setSelectedOption }: BoardSelectProps) {
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <label htmlFor="select-option">请选择：</label>
            <select id="select-option" value={selectedOption} onChange={handleSelect}>
                <option value="div">{DIV}</option>
                <option value="canvas">{CANVAS}</option>
            </select>
        </div>
    );
}


