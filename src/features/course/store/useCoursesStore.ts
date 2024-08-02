import { ICourse } from '../types'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    activeId: useStorage<string>('activeCourseId', ''),
    courses: useStorage<ICourse[]>('courses', []),
  }),
  actions: {
    create (course: ICourse) {
      const newCourse = {
        ...course,
        id: crypto.randomUUID(),
      }

      this.courses.push(newCourse)

      return newCourse
    },

    delete (courseId: string) {
      const index = this.courses.findIndex((course => course.id === courseId))
      this.courses.splice(index, 1)
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
