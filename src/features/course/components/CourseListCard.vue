<script setup lang="ts">
import { CourseType, ICourse } from '../types'
import { courseTypeBgColorMap } from '../utils/courseUtils'

interface IProps {
  clickable?: boolean
  course: ICourse
  onRightClick?: (event: Event, course: ICourse) => void
}

const { course, clickable } = defineProps<IProps>()

const courseTypeMap = {
  [CourseType.PAR_THREE]: 'Par 3',
  [CourseType.PAR_FOUR]: 'Par 4',
  [CourseType.VARIABLE_PAR]: 'Variable Par',
}

const courseTypeText = computed(() => courseTypeMap[course.courseType])

const emit = defineEmits<{
  click: [],
  'right-click': [Event, ICourse]
}>()
</script>

<template>
  <Card
    :class="{'cursor-pointer': clickable}"
    @contextmenu="emit('right-click', $event, course)"
    @click="emit('click')"
  >
    <template #title>
      {{ course.name }}
    </template>
    <template #content>
      <div class="flex items-center">
        <Tag
          :class="`mr-2 ${courseTypeBgColorMap[course.courseType]}`"
          :value="courseTypeText"
        />
        <span class="text-muted-color">
          {{ course.numberOfHoles }} Holes
        </span>
      </div>
    </template>
  </Card>
</template>
