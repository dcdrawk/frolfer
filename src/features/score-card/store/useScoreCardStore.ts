import { IScoreCard } from '../types'

export const useScoreCardStore = defineStore('scoreCard', {
  state: () => ({
    activeId: useStorage<string>('scoreCardActiveId', ''),
    scoreCards: useStorage<IScoreCard[]>('scoreCards', []),
  }),
  actions: {
    create (scoreCard: IScoreCard) {
      const newScoreCard: IScoreCard = {
        ...scoreCard,
        id: crypto.randomUUID(),
      }

      this.scoreCards.push(newScoreCard)

      return newScoreCard
    },
    setActiveId (id: string) {
      this.activeId = id
    },
  },
  getters: {
    activeScoreCard (state) {
      return state.scoreCards.find((scoreCard => scoreCard.id === state.activeId))
    },
  },
})
