<script setup lang="ts">
import router from '../../../router'
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScoreCard } from '../types'
import ScoreCardListCard from './ScoreCardListCard.vue'

const { scoreCards, delete: deleteScoreCard } = useScoreCardStore()
const { courses } = useCoursesStore()

const selectedCard = ref<IScoreCard | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      if (!selectedCard.value) return

      deleteScoreCard(selectedCard.value.id)
    },
  },
])

const onScoreCardRightClick = (event: Event, scoreCard: IScoreCard) => {
  menu.value.show(event)
  selectedCard.value = scoreCard
}
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">
    Score Cards
  </h1>

  <section
    v-if="scoreCards"
    class="relative"
  >
    <Button
      label="New Score Card"
      as="router-link"
      class="w-full sm:w-auto mb-4"
      to="/score-card/new"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-if="!scoreCards.length">
        <Message class="mb-4">
          You don't have any Score Cards yet, try creating one!
        </Message>
      </div>

      <ScoreCardListCard
        v-for="scoreCard in scoreCards"
        :key="scoreCard.id"
        :score-card="scoreCard"
        :courses="courses"
        :on-right-click="(event) => onScoreCardRightClick(event, scoreCard)"
        @click="router.push(`/score-card/${scoreCard.id}`)"
      />

      <ContextMenu
        ref="menu"
        :model="items"
      />
    </div>
  </section>
</template>
