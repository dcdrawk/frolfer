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
  },
  getters: {
    activeCourse (state) {
      return state.courses.find(course => course.id === state.activeId)
    },
  },
})
