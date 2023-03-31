export interface IRowCol {
    row: number,
    col: number
}
export type BoardArray = number[][];
export interface Update {
    updateBoardArray: (updateFn: (prevBoardArray: BoardArray) => BoardArray) => void;
}
export enum ChessColor {
    BLACK = 'black',
    WHITE = 'white',
}

