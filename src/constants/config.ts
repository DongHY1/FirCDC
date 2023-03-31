export const BOARD_SIZE = 15; // 棋盘大小
export const POSITIONS = {
    '0-0': 'top-left',
    [`0-${BOARD_SIZE - 1}`]: 'top-right',
    [`${BOARD_SIZE - 1}-0`]: 'bottom-left',
    [`${BOARD_SIZE - 1}-${BOARD_SIZE - 1}`]: 'bottom-right'
} as const;

export const PLAYER1_LABEL = '玩家1';
export const PLAYER2_LABEL = '玩家2';
export const BLACK_LABEL = '黑';
export const WHITE_LABEL = '白';
export const BLACK_LABEL_INDEX = 1;
export const WHITE_LABEL_INDEX = 2;