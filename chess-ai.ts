import type { ChessPiece, PieceColor, Position } from "./chess-types"
import { isValidMove } from "./chess-rules"

/**
 * Finds a random legal move for the AI on the given board.
 * This is a very basic AI that simply picks a random valid move.
 *
 * @param board The current state of the chess board.
 * @param aiColor The color of the AI player.
 * @returns An object containing the 'from' and 'to' positions of the chosen move, or null if no legal moves are found.
 */
export function getAIMove(
  board: (ChessPiece | null)[][],
  aiColor: PieceColor,
): { from: Position; to: Position } | null {
  const legalMoves: { from: Position; to: Position }[] = []

  // Iterate through all squares to find AI's pieces
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol]

      // If it's an AI's piece
      if (piece && piece.color === aiColor) {
        // Iterate through all possible target squares
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            const fromPosition = { row: fromRow, col: fromCol }
            const toPosition = { row: toRow, col: toCol }

            // Check if the move is legal
            if (isValidMove(board, fromPosition, toPosition, aiColor)) {
              legalMoves.push({ from: fromPosition, to: toPosition })
            }
          }
        }
      }
    }
  }

  // If there are legal moves, pick one randomly
  if (legalMoves.length > 0) {
    const randomIndex = Math.floor(Math.random() * legalMoves.length)
    return legalMoves[randomIndex]
  }

  return null // No legal moves found (e.g., stalemate or checkmate)
}
