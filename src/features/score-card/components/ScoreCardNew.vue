<script setup lang="ts">
import Button from 'primevue/button'
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { CourseType, ICourse } from '../../course/types'
import { courseTypeBgColorMap, courseTypeMap } from '../../course/utils/courseUtils'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScore } from '../types'

const router = useRouter()
const { courses, create: createCourse } = useCoursesStore()
const { create: createScoreCard } = useScoreCardStore()

const selectedCourse = ref<ICourse | null>(null)
const courseSelectOptions = computed(() => {
  return [{
    name: 'New Course',
  }].concat(courses)
})

const isNewCourse = computed(() => selectedCourse.value?.name === 'New Course' || courses.length === 0)

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
  if (course && !course.id) {
    createCourse(course)
  }

  const { id } = createScoreCard({
    id: '',
    name: course.name,
    holes: course.holes,
    courseType: course.courseType,
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
    class="mb-8"
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
        v-model="selectedCourse"
        :options="courseSelectOptions"
        class="mb-8 w-full"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex items-center justify-between h-7"
          >
            <div>
              {{ slotProps.value.name }}
            </div>

            <div v-if="slotProps.value.name !== 'New Course'">
              <span class="mr-2 text-muted-color">
                {{ slotProps.value.numberOfHoles }} Holes
              </span>
              <Tag
                :value="courseTypeMap[slotProps.value.courseType as CourseType]"
                :class="courseTypeBgColorMap[slotProps.value.courseType as CourseType]"
              />
            </div>
          </div>
          <span
            v-else
            class="block h-7"
          />
        </template>
        <template #option="slotProps">
          <div class="flex items-center justify-between w-full overflow-hidden">
            <div class="truncate max-w-[225px]">
              {{ slotProps.option.name }}
            </div>

            <div
              v-if="slotProps.option.name !== 'New Course'"
              class="w-[130px] flex justify-end"
            >
              <span class="mr-2 text-muted-color">
                {{ slotProps.option.numberOfHoles }} Holes
              </span>
              <Tag
                :value="courseTypeMap[slotProps.option.courseType as CourseType]"
                :class="courseTypeBgColorMap[slotProps.option.courseType as CourseType]"
              />
            </div>
          </div>
        </template>
      </Select>
    </div>

    <div v-if="selectedCourse?.id">
      <Button
        label="Start Score Card"
        @click="() => handleCreateScoreCard(selectedCourse as ICourse)"
      />
    </div>
  </div>

  <CourseFormEdit
    v-if="isNewCourse"
    submit-label="Start Score Card"
    @submit="handleCreateScoreCard"
  />
</template>
../../course/utils
