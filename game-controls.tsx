"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface GameControlsProps {
  onReset: () => void
  gameStatus: string
  gameMode: "human-vs-human" | "human-vs-computer"
  setGameMode: (mode: "human-vs-human" | "human-vs-computer") => void
  isAITurn: boolean
}

export default function GameControls({ onReset, gameStatus, gameMode, setGameMode, isAITurn }: GameControlsProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <RadioGroup
        defaultValue={gameMode}
        onValueChange={(value: "human-vs-human" | "human-vs-computer") => setGameMode(value)}
        className="flex gap-4"
        disabled={gameStatus !== "ongoing" || isAITurn} // Disable mode change during game or AI turn
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="human-vs-human" id="human-vs-human" />
          <Label htmlFor="human-vs-human">Human vs Human</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="human-vs-computer" id="human-vs-computer" />
          <Label htmlFor="human-vs-computer">Human vs Computer</Label>
        </div>
      </RadioGroup>

      {isAITurn && <div className="text-lg font-semibold text-gray-700">Computer is thinking...</div>}

      <Button onClick={onReset} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        New Game
      </Button>

      {gameStatus.includes("checkmate") && (
        <div className="text-xl font-bold text-red-600">Checkmate! {gameStatus.split("-")[1]} wins!</div>
      )}

      {gameStatus === "stalemate" && (
        <div className="text-xl font-bold text-amber-600">Stalemate! The game is a draw.</div>
      )}

      {gameStatus.includes("check") && <div className="text-lg font-semibold text-orange-600">Check!</div>}
    </div>
  )
}
