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

const emit = defineEmits(['startCourse'])
</script>

<template>
  <Card>
    <template #title>
      {{ course.name }}
    </template>
    <template #subtitle>
      {{ courseTypeText }}
    </template>
    <!-- <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
    </template> -->
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button
          label="Start Scoring!"
          class="w-full"
          @click="emit('startCourse')"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
