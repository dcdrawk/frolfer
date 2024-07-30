export interface IScore {
  name: string;
  total: number | null;
  [key: string]: string | number | null
}

export interface IScoreCard {
  id: string
  courseId: string
  players: string[]
  scores: IScore[]
  date: string
}
