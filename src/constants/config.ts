export const BOARD_SIZE = 15; // 棋盘大小
export const POSITIONS = {
    '0-0': 'top-left',
    [`0-${BOARD_SIZE - 1}`]: 'top-right',
    [`${BOARD_SIZE - 1}-0`]: 'bottom-left',
    [`${BOARD_SIZE - 1}-${BOARD_SIZE - 1}`]: 'bottom-right'
} as const;

