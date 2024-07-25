export interface IHole {
  expanded?: boolean
  par: number
  name?: string
  distance?: string
}

export interface IState {
  holes: IHole[]
}

export enum CourseType {
  PAR_THREE,
  PAR_FOUR,
  VARIABLE_PAR
}
