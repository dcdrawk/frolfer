import { CourseType } from '../types'

export const courseTypeOptions = [{
  text: 'Par 3',
  value: CourseType.PAR_THREE,
}, {
  text: 'Par 4',
  value: CourseType.PAR_FOUR,
}, {
  text: 'Variable Par',
  value: CourseType.VARIABLE_PAR,
}]

export const courseTypeMap = {
  [CourseType.PAR_THREE]: 'Par 3',
  [CourseType.PAR_FOUR]: 'Par 4',
  [CourseType.VARIABLE_PAR]: 'Variable Par',
}

export const holeTemplate = {
  par: 3,
}

export const courseTypeBgColorMap = {
  [CourseType.PAR_THREE]: '!bg-orange-300',
  [CourseType.PAR_FOUR]: '!bg-yellow-200',
  [CourseType.VARIABLE_PAR]: '!bg-indigo-300',
}

export const parBgColorMap: { [key: number]: string } = {
  2: '!bg-red-300',
  3: '!bg-orange-300',
  4: '!bg-yellow-200',
  5: '!bg-green-300',
  6: '!bg-indigo-300',
}
