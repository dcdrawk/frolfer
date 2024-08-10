<script setup lang="ts">
import { CourseSortOption } from '../features/course/types'
import { ScoreCardSortOption } from '../features/score-card/types'

const { modelValue, options, icon } = defineProps<{
  modelValue: ScoreCardSortOption | CourseSortOption
  options: { text: string, value: string | number }[]
  icon: string
}>()

const emit = defineEmits(['toggle-sort-direction', 'update:modelValue'])

console.log(modelValue)
</script>

<template>
  <div class="flex items-end w-full sm:w-auto mb-4">
    <span
      class="mt-4 w-full sm:w-auto sm:-mt-4 sm:flex sm:justify-end sm:items-center"
    >
      <label class="block text-muted-color text-xs sm:text-base sm:mr-2 mb-2 sm:mb-0">
        Sort By
      </label>
      <Select
        :model-value="modelValue"
        :options="options"
        option-label="text"
        option-value="value"
        class="!rounded-r-none sm:w-[205px]"
        fluid
        @update:model-value="emit('update:modelValue', $event)"
      />
    </span>
    <Button
      :icon="icon"
      class="w-full !rounded-l-none"
      severity="secondary"
      @click="emit('toggle-sort-direction')"
    />
  </div>
</template>

<style scoped>

</style>
