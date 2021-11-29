import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { DateTime } from 'luxon'
import { addActiveQuest, removeActiveQuest, setActiveQuests } from 'state/quests'
import { dispatch } from 'state'
import { QuestEventTypes, QuestStatus } from 'constants/quests'

export const fetchActiveQuests = async (account: string | null | undefined, questCore: Contract | null) => {
  if (questCore && account) {
    try {
      const rawActiveQuests = await questCore.getActiveQuests(account)
      const activeQuests = rawActiveQuests.map((rawQuest: any) => {
        const { id, quest, heroes, attempts, completeAtTime, startTime } = rawQuest
        const convertedHeroes = heroes.map((hero: BigNumber) => Number(hero))
        const bigCompletedAt = BigNumber.from(completeAtTime)
        const completeAtTimeFinal = DateTime.fromSeconds(bigCompletedAt.toNumber())
        const bigStartTime = BigNumber.from(startTime)
        const startTimeFinal = DateTime.fromSeconds(bigStartTime.toNumber())

        return {
          id: Number(id),
          questAddress: quest.toLowerCase(),
          heroes: convertedHeroes,
          attempts,
          completeAtTime: completeAtTimeFinal,
          startTime: startTimeFinal
        }
      })

      dispatch(setActiveQuests(activeQuests))
    } catch (error) {
      throw error
    }
  }
}

export const initializeQuestListeners = (account: string | null | undefined, questCore: Contract | null) => {
  questCore?.on(QuestEventTypes.COMPLETE, async (questId, player, hero, event) => {
    if (player === account && event.status === QuestStatus.COMPLETED) {
      dispatch(removeActiveQuest(Number(questId)))
    }
  })

  questCore?.on(QuestEventTypes.STARTED, async (questId, player, hero, event) => {
    if (player === account) {
      const { id, quest, heroes, attempts, completeAtTime, startTime } = event
      const mappedHeroes = heroes.map((bigHero: BigNumber) => Number(bigHero))
      const bigCompletedAt = BigNumber.from(completeAtTime)
      const completeAtTimeFinal = DateTime.fromSeconds(bigCompletedAt.toNumber())
      const bigStartTime = BigNumber.from(startTime)
      const startTimeFinal = DateTime.fromSeconds(bigStartTime.toNumber())

      const activeQuest = {
        id: Number(id),
        questAddress: quest.toLowerCase(),
        heroes: mappedHeroes,
        attempts,
        completeAtTime: completeAtTimeFinal,
        startTime: startTimeFinal
      }
      dispatch(addActiveQuest(activeQuest))
    }
  })
}

export const mapProfessionIndex = (professionIndex: number) => {
  switch (professionIndex) {
    case 0:
      return 'mining'
    case 2:
      return 'gardening'
    case 4:
      return 'fishing'
    case 6:
      return 'foraging'
    default:
      return ''
  }
}
