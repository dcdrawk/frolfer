<script setup lang="ts">
import { ICourse } from '../../course/types'
import { courseTypeMap } from '../../course/utils/courseUtils'
import { IScoreCard } from '../types'

interface IProps {
  scoreCard: IScoreCard
  courses: ICourse []
  onRightClick: (event: Event, scoreCard: IScoreCard) => void
}

const { scoreCard, onRightClick } = defineProps<IProps>()

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
          :value="courseTypeMap[scoreCard.courseType]"
          severity="info"
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
