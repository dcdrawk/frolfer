import { ICourse } from '../types'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: useStorage<ICourse[]>('courses', []),
  }),
  actions: {
    create (course: ICourse) {
      this.courses.push({
        ...course,
        id: crypto.randomUUID(),
      })
    },
  },
})
