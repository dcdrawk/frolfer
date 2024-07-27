export interface IScore {
  [key: string]: number[]
}

export interface IScoreCard {
  id: string
  courseId: string
  players: string[]
  scores: IScore
  date: string
}
