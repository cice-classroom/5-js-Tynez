export type PlayerToken = null | 'x' | 'o'

export interface Slot {
  position: number
}

export interface ScoreBoard {
  firstPlayer: number
  secondPlayer: number
  draw: number
}
