// import { IHole } from '../course/types'

export interface IScore {
  name: string;
  total: number | null;
  [key: string]: string | number | null
}

export interface IScoreCard {
  id: string
  courseId: string
  // name: string
  // holes: IHole[],
  // numberOfHoles: number
  players: string[]
  scores: IScore[]
  date: string
}
