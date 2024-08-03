<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import { CourseType, IHole } from '../types'

const { holes, courseType } = defineProps<{
  holes: IHole[],
  courseType: CourseType
}>()

const emit = defineEmits<{
  'input-distance': [event: Event, hole: number],
  'input-name': [event: Event, hole: number],
  'input-par': [event: InputNumberInputEvent, hole: number],
}>()

const accordionState = ref([])

</script>

<template>
  <Accordion
    :value="accordionState"
    multiple
    class="my-8"
  >
    <CourseHoleAccordionPanel
      v-for="i in holes.length"
      :key="i"
      :hole="i - 1"
      :par="holes[i - 1].par"
      :course-type="courseType"
      :distance="holes[i - 1].distance"
      :name="holes[i - 1].name"
      @input-distance="(event, hole) => emit('input-distance', event, hole)"
      @input-name="(event, hole) => emit('input-name', event, hole)"
      @input-par="(event, hole) => emit('input-par', event, hole)"
    />
  </Accordion>
</template>
