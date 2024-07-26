export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: useStorage('courses', []),
  }),
})
