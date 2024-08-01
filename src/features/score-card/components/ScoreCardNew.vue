<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { ICourse } from '../../course/types'
// import { ICourse } from '../../course/types'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScore } from '../types'

const router = useRouter()
const { courses, create: createCourse } = useCoursesStore()
const { create: createScoreCard } = useScoreCardStore()

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

const isNewCourse = computed(() => selectedCourseId.value === 'new' || courses.length === 0)

// const defaultScores = computed(() => {
//   const scoreObject: IScore = {
//     name: '',
//     total: null,
//   }

//   if (!selectedCourse.value) return [scoreObject]

//   for (let i = 1; i < selectedCourse.value.numberOfHoles + 1; i++) {
//     scoreObject[i] = null
//   }
//   return [scoreObject]
// })

const getDefaultScores = (course: ICourse) => {
  const scoreObject: IScore = {
    name: '',
    total: null,
  }

  if (!course) return [scoreObject]

  for (let i = 1; i < course.numberOfHoles + 1; i++) {
    scoreObject[i] = null
  }
  return [scoreObject]
}

const handleCreateScoreCard = (course: ICourse) => {
  // console.log('handle create', course)
  let courseId = course.id

  if (course && !course.id) {
    const { id } = createCourse(course)
    courseId = id
  }

  const { id } = createScoreCard({
    id: '',
    courseId: course.id || courseId,
    players: [],
    scores: getDefaultScores(course),
    date: new Date().toLocaleDateString(),
  })

  router.push(id)
}
</script>

<template>
  <h2 class="text-3xl font-semibold mb-8">
    New Score Card
  </h2>

  <Message
    v-if="!courses.length"
    severity="info"
  >
    Your Course List is empty. Start by adding a New Course.
  </Message>

  <div
    v-if="courses.length"
    class="flex flex-col max-w-[420px]"
  >
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

    <div v-if="selectedCourse">
      <CourseInfoCard
        :course="selectedCourse"
      />

      <Button
        class="mt-8"
        label="Start Score Card"
        @click="() => handleCreateScoreCard"
      />
    </div>
  </div>

  <!-- <CourseForm v-if="isNewCourse" /> -->
  <CourseFormEdit
    v-if="isNewCourse"
    submit-label="Start Score Card"
    @submit="handleCreateScoreCard"
  />
</template>
