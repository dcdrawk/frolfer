<script setup lang="ts">
import { useCoursesStore } from '../store/useCoursesStore'
import { ICourse } from '../types'

const route = useRoute()

const { id } = route.params

const coursesStore = useCoursesStore()
const { setActiveId: setActiveCourseId, updateCourse } = coursesStore
const { activeCourse } = storeToRefs(coursesStore)

if (id !== activeCourse.value?.id) {
  setActiveCourseId(id as string)
}

const handleSubmit = (course: ICourse) => {
  updateCourse(course)
}
</script>

<template>
  <div v-if="activeCourse">
    <CourseFormEdit
      :course="activeCourse"
      title="Edit Course"
      submit-label="Save Course"
      @submit="handleSubmit"
    />
  </div>
</template>
