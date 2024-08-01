import { ICourse } from '../types'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    activeId: useStorage<string>('activeCourseId', ''),
    courses: useStorage<ICourse[]>('courses', []),
  }),
  actions: {
    create (course: ICourse) {
      this.courses.push({
        ...course,
        id: crypto.randomUUID(),
      })
    },
    setActiveId (courseId: string) {
      this.activeId = courseId
    },
    updateCourse (updatedCourse: ICourse) {
      this.courses = this.courses.map(course => course.id === updatedCourse.id ? updatedCourse : course)
    },
  },
  getters: {
    activeCourse (state) {
      return state.courses.find(course => course.id === state.activeId)
    },
  },
})
