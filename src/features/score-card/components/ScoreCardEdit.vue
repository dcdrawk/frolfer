<script setup lang="ts">
import { useScoreCardStore } from '../store/useScoreCardStore'

const route = useRoute()
const routeId = route.params.id as string
const scoreCardStore = useScoreCardStore()
const { activeId: activeScoreCardId, setActiveId: setActiveScoreCardId } = scoreCardStore
const { activeScoreCard } = storeToRefs(scoreCardStore)

if (activeScoreCardId !== routeId) {
  setActiveScoreCardId(routeId)
}
</script>

<template>
  <h2 class="text-3xl font-semibold mb-4">
    Score Card
  </h2>

  <h3
    v-if="activeScoreCard"
    class="text-2xl mb-4 flex justify-between"
  >
    <span class="font-semibold">
      {{ activeScoreCard.name }}
    </span>
    <span class="ml-2 opacity-60">
      {{ activeScoreCard.date }}
    </span>
  </h3>

  <ScoreCardTable />
</template>
