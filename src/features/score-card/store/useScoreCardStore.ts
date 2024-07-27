import { IScoreCard } from '../types'

export const useScoreCardStore = defineStore('scoreCard', {
  state: () => ({
    scoreCards: useStorage<IScoreCard[]>('scoreCards', []),
  }),
  actions: {
    create (scoreCard: IScoreCard) {
      this.scoreCards.push({
        ...scoreCard,
        id: crypto.randomUUID(),
      })
    },
  },
})
