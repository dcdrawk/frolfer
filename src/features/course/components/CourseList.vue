<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { ICourse } from '../types'
const { courses, delete: deleteCourse } = useCoursesStore()
const router = useRouter()

const selectedCourse = ref<ICourse | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      if (!selectedCourse.value) return

      deleteCourse(selectedCourse.value.id)
    },
  },
])

const handleCourseClick = (course: ICourse) => {
  router.push(`/course/${course.id}`)
}

const handleCourseRightClick = (event: Event, course: ICourse) => {
  menu.value.show(event)
  selectedCourse.value = course
}
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">
    Courses
  </h1>

  <section v-if="courses">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CourseInfoCard
        v-for="course in courses"
        :key="course.id"
        v-ripple
        :course="course"
        clickable
        @click="handleCourseClick(course)"
        @right-click="(event, course) => handleCourseRightClick(event, course)"
      />

      <ContextMenu
        ref="menu"
        :model="items"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
