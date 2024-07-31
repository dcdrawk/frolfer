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
      <div class="flex justify-between items-center">
        <!-- <span>
          {{ courseTypeMap[course.courseType] }}
        </span> -->
        <Tag
          :value="courseTypeMap[course.courseType]"
          severity="info"
        />
        <span>
          {{ course.numberOfHoles }} Holes
        </span>
      </div>
    </template>
    <template #content>
      <div v-if="playerNames.length">
        <span
          v-for="(name, index) in playerNames"
          :key="index"
        >
          {{ name }}{{ index < (playerNames.length - 1) ? ', ' : '' }}
        </span>
      </div>
      <!-- {{ courseTypeText }} -->
    </template>
    <!-- <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
    </template> -->
    <!-- <template #footer>
      <div class="flex gap-4 mt-1">
        <Button
          label="View Score Card"
          class="w-full"
          severity="secondary"
          @click="emit('startCourse')"
        />
        <Button
          icon="pi pi-trash"
          class="!w-[50px]"
          outlined
          severity="danger"
          @click="emit('startCourse')"
        />
      </div>
    </template> -->
  </Card>
</template>

<style scoped>

</style>
