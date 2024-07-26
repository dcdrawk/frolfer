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

export interface ICourse {
  id: string
  name: string
  numberOfHoles: number
  courseType: CourseType
  holes: IHole[]
}
