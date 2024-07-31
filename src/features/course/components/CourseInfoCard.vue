<script setup lang="ts">
import { CourseType, ICourse } from '../types'

interface IProps {
  course: ICourse
}

const { course } = defineProps<IProps>()

const courseTypeMap = {
  [CourseType.PAR_THREE]: 'Par 3',
  [CourseType.PAR_FOUR]: 'Par 4',
  [CourseType.VARIABLE_PAR]: 'Variable Par',
}

const courseTypeText = computed(() => courseTypeMap[course.courseType])

// const emit = defineEmits(['startCourse'])
</script>

<template>
  <Card>
    <template #title>
      {{ course.name }}
    </template>
    <template #content>
      <!-- {{ courseTypeText }} -->
      <div class="flex items-center">
        <Tag
          class="mr-2"
          :value="courseTypeText"
          severity="info"
        />
        <span class="text-muted-color">
          {{ course.numberOfHoles }} Holes
        </span>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
