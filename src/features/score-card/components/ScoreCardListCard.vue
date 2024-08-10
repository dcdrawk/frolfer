<script setup lang="ts">
import { ICourse } from '../../course/types'
import { courseTypeBgColorMap, courseTypeMap } from '../../course/utils'
import { IScoreCard } from '../types'

const { scoreCard, onRightClick } = defineProps<{
  scoreCard: IScoreCard
  courses: ICourse []
  onRightClick: (event: Event, scoreCard: IScoreCard) => void
}>()

const emit = defineEmits(['click'])

const playerNames = computed(() => {
  return scoreCard.scores.filter((score) => score.name).map(score => score.name)
})
</script>

<template>
  <Card
    v-ripple
    class="cursor-pointer"
    tabindex="0"
    @contextmenu="onRightClick"
    @click="emit('click')"
  >
    <template #title>
      <div class="flex justify-between">
        <span class="overflow-hidden text-ellipsis">
          {{ scoreCard.name }}
        </span>
        <span class="ml-2 text-muted-color font-normal">
          {{ scoreCard.date }}
        </span>
      </div>
    </template>
    <template
      #subtitle
    >
      <div class="flex items-center">
        <Tag
          class="mr-2"
          :class="courseTypeBgColorMap[scoreCard.courseType]"
          :value="courseTypeMap[scoreCard.courseType]"
        />
        <span>
          {{ scoreCard.holes.length }} Holes
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
../../course/utils
