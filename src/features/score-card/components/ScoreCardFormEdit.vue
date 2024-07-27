<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'

const { courses } = useCoursesStore()

const selectedCourseId = ref<string | null>(null)

const selectedCourse = computed(() => (
  selectedCourseId.value &&
  selectedCourseId.value !== 'new' &&
  courses.find((course) => course.id === selectedCourseId.value)
))

const courseSelectOptions = computed(() => {
  const options = courses.map((course) => ({
    text: course.name,
    value: course.id,
  }))

  return [{
    text: 'New Course',
    value: 'new',
  }].concat(options)
})

const isNewCourse = computed(() => selectedCourseId.value === 'new')
</script>

<template>
  <h2 class="text-4xl font-semibold mb-8">
    Score Card
  </h2>

  <Message
    v-if="!courses.length"
    severity="info"
  >
    Your Course List is empty. Start by adding a New Course.
  </Message>

  <div class="flex flex-col max-w-[420px]">
    <div>
      <label class="block mb-2">
        Select a Course
      </label>
      <Select
        v-model="selectedCourseId"
        :options="courseSelectOptions"
        option-label="text"
        option-value="value"
        class="mb-8 w-full"
      />
    </div>

    <CourseInfoCard
      v-if="selectedCourse"
      :course="selectedCourse"
    >
      <Button
        v-if="!isNewCourse"
        label="Start Scoring!"
      />
    </courseinfocard>
  </div>

  <CourseForm v-if="isNewCourse" />
</template>
