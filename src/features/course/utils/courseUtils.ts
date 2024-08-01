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

export const holeTemplate = {
  par: 3,
}

export const parBgColorMap: { [key: number]: string } = {
  2: '!bg-red-300',
  3: '!bg-orange-300',
  4: '!bg-yellow-200',
  5: '!bg-green-300',
  6: '!bg-indigo-300',
}
