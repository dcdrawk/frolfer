import { CourseType, IHole } from '../course/types'

export interface IScore {
  name: string;
  total: number | null;
  [key: string]: string | number | null
}

export interface IScoreCard {
  id: string
  name: string
  holes: IHole[]
  courseType: CourseType
  players: string[]
  scores: IScore[]
  date: string
}
