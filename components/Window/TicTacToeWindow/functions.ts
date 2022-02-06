/**
 * Check all winning conditions
 * @param board Array with all the markings
 * @returns If the board is in the winning condition
 */
export const checkWinningCondition = (board: string[]) => {
  if (checkHorizontalWinningCondition(board)) return true;
  if (checkVerticalWinningCondition(board)) return true;
  if (checkDiagonalWinningCondition(board)) return true;
  return false;
};

/**
 * Check all the horizontal winning conditions
 * (012, 345, 678)[]
 * @param board Array with all the markings
 * @returns If the board is in the winning condition
 */
const checkHorizontalWinningCondition = (board: string[]): boolean => {
  if (new Set([board[0], board[1], board[2]]).size === 1 && board[0]) return true;
  if (new Set([board[3], board[4], board[5]]).size === 1 && board[3]) return true;
  if (new Set([board[6], board[7], board[8]]).size === 1 && board[6]) return true;
  return false;
};

/**
 * Check all the vertical winning conditions
 * (036, 147, 258)[]
 * @param board Array with all the markings
 * @returns If the board is in the winning condition
 */
const checkVerticalWinningCondition = (board: string[]): boolean => {
  if (new Set([board[0], board[3], board[6]]).size === 1 && board[0]) return true;
  if (new Set([board[1], board[4], board[7]]).size === 1 && board[1]) return true;
  if (new Set([board[2], board[5], board[8]]).size === 1 && board[2]) return true;
  return false;
};

/**
 * Check all the vertical winning conditions
 * (048, 246)[]
 * @param board Array with all the markings
 * @returns If the board is in the winning condition
 */
const checkDiagonalWinningCondition = (board: string[]): boolean => {
  if (new Set([board[0], board[4], board[8]]).size === 1 && board[0]) return true;
  if (new Set([board[2], board[4], board[6]]).size === 1 && board[2]) return true;
  return false;
};

// AI
export const ExecuteAITurn = (board: string[], difficulty: string): number => {
  switch (difficulty) {
    case "easy":
      return ExecuteAITurnEasy(board);
    case "medium":
      return ExecuteAITurnMedium(board);
    default:
      return ExecuteAITurnHard(board);
  }
};

// Easy AI
// just mark cells randomly
const ExecuteAITurnEasy = (board: string[]): number => {
  const MAX_TENTATIVES = 1000; // prevent infinite loop
  let tentatives = 1;

  while (true && tentatives < MAX_TENTATIVES) {
    const randomCellIndex = Math.floor(Math.random() * board.length);
    if (!board[randomCellIndex]) return randomCellIndex;

    tentatives++;
  }

  return -1;
};

// Medium AI
// Only tries to win
// to be done
const ExecuteAITurnMedium = (board: string[]): number => {
  const MAX_TENTATIVES = 1000; // prevent infinite loop
  let tentatives = 1;

  while (true && tentatives < MAX_TENTATIVES) {
    const randomCellIndex = Math.floor(Math.random() * board.length);
    if (!board[randomCellIndex]) return randomCellIndex;

    tentatives++;
  }

  return -1;
};

// Hard AI
// Tries to block de player
// to be done
const ExecuteAITurnHard = (board: string[]): number => {
  const MAX_TENTATIVES = 1000; // prevent infinite loop
  let tentatives = 1;

  while (true && tentatives < MAX_TENTATIVES) {
    const randomCellIndex = Math.floor(Math.random() * board.length);
    if (!board[randomCellIndex]) return randomCellIndex;

    tentatives++;
  }

  return -1;
};
