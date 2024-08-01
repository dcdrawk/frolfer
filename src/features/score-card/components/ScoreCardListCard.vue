<script setup lang="ts">
import { CourseType, ICourse } from '../../course/types'
import { IScoreCard } from '../types'

interface IProps {
  scoreCard: IScoreCard
  courses: ICourse []
  onRightClick: (event: Event, scoreCard: IScoreCard, index: number) => void
}

const { scoreCard, courses, onRightClick } = defineProps<IProps>()

const emit = defineEmits(['click'])

const course = computed(() => {
  return courses.find((course => course.id === scoreCard.courseId))
})

const playerNames = computed(() => {
  return scoreCard.scores.filter((score) => score.name).map(score => score.name)
})

const courseTypeMap = {
  [CourseType.PAR_THREE]: 'Par 3',
  [CourseType.PAR_FOUR]: 'Par 4',
  [CourseType.VARIABLE_PAR]: 'Variable Par',
}

</script>

<template>
  <Card
    v-ripple
    class="cursor-pointer focus:ring-2"
    tabindex="0"
    @contextmenu="onRightClick"
    @click="emit('click')"
  >
    <template #title>
      <div class="flex justify-between">
        <span class="overflow-hidden text-ellipsis">
          {{ course?.name }}
        </span>
        <span class="ml-2 text-muted-color font-normal">
          {{ scoreCard.date }}
        </span>
      </div>
    </template>
    <template
      v-if="course"
      #subtitle
    >
      <div class="flex items-center">
        <Tag
          class="mr-2"
          :value="courseTypeMap[course.courseType]"
          severity="info"
        />
        <span>
          {{ course.numberOfHoles }} Holes
        </span>
      </div>
    </template>
    <template #content>
      <div
        v-if="playerNames.length"
        class="flex flex-wrap gap-2"
      >
        <Chip
          v-for="(name, index) in playerNames"
          :key="index"
          class=""
          :label="name"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
