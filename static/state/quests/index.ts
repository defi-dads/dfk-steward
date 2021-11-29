import { createSlice } from '@reduxjs/toolkit'
import { Hero } from 'utils/dfkTypes'
import { Item } from 'constants/items'
import { QuestKeys, QuestType, questMap, Quest } from 'constants/quests'

export interface Reward extends Item {
  key: string
  quantity: number
}

export type HeroRewardsMap = {
  [index: string]: {
    rewards?: { [index: string]: Reward }
    xpEarned?: number
    skillUp?: { [index: string]: number }
  }
}

export type ActiveQuest = {
  id: number
  questAddress: string
  heroes: Array<string | number>
  attempts: number
  completeAtTime: any
  startTime: any
}

interface SkillUp {
  profession: string
  points: number
}

interface QuestSliceState {
  heroQuantityRequired: number
  questType: QuestType
  heroRewardsMap: HeroRewardsMap
  rewardedHeroCount: number
  selectedHeroes: Hero[]
  xpQuantity: number
  skillUp: SkillUp | null
  showQuestHeroSelector: boolean
  showQuestManagementModal: boolean
  showQuestProviderModal: boolean
  activeQuests: ActiveQuest[]
  questData: Quest
  questManagementTabIndex: number
  showQuestRewardModal: boolean
}

const initialState: QuestSliceState = {
  heroQuantityRequired: 1,
  questType: QuestType.AttemptBased,
  heroRewardsMap: {},
  rewardedHeroCount: 0,
  selectedHeroes: [],
  skillUp: null,
  xpQuantity: 0,
  showQuestHeroSelector: false,
  showQuestManagementModal: false,
  showQuestProviderModal: false,
  activeQuests: [],
  questData: questMap[QuestKeys.FISHING_0],
  questManagementTabIndex: 0,
  showQuestRewardModal: false
}

const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    addSelectedHeroes(state, action: { payload: { hero: Hero[]; maxHeroes: number } }) {
      if (state.selectedHeroes.length < action.payload.maxHeroes) {
        state.selectedHeroes.push(...action.payload.hero)
      } else {
        console.error('Error: Too many heroes')
      }
    },
    setHeroQuantityRequired(state, action: { payload: number }) {
      state.heroQuantityRequired = action.payload
    },
    removeSelectedHero(state, action: { payload: Hero }) {
      const newSelectedHeroes = state.selectedHeroes.filter(h => h.id !== action.payload.id)
      state.selectedHeroes = newSelectedHeroes
    },
    clearSelectedHeroes(state) {
      state.selectedHeroes = []
    },
    setHeroRewardsMap(state, action: { payload: {} }) {
      const rewardedHeroCount = Object.entries(action.payload).length
      state.rewardedHeroCount = rewardedHeroCount
      state.heroRewardsMap = action.payload
    },
    setHeroRewardsMapDefault(state) {
      state.heroRewardsMap = initialState.heroRewardsMap
    },
    setShowQuestHeroSelector(state, action: { payload: boolean }) {
      state.showQuestHeroSelector = action.payload
    },
    setShowQuestManagementModal(state, action: { payload: boolean }) {
      state.showQuestManagementModal = action.payload
    },
    addActiveQuest(state, action: { payload: ActiveQuest }) {
      const questId = action.payload.id
      const questIndex = state.activeQuests.findIndex((obj: any) => obj.id === questId)

      if (questIndex === -1) {
        state.activeQuests.push(action.payload)
      }
    },
    setActiveQuests(state, action: { payload: ActiveQuest[] }) {
      state.activeQuests = action.payload
    },
    removeActiveQuest(state, action: { payload: string | number }) {
      const newActiveQuests = state.activeQuests.filter(q => q.id !== action.payload)
      state.activeQuests = newActiveQuests
    },
    setQuestData(state, action: { payload: Quest }) {
      state.questData = action.payload
    },
    setShowQuestRewardModal(state, action: { payload: boolean }) {
      state.showQuestRewardModal = action.payload
    },
    setShowQuestProviderModal(state, action: { payload: boolean }) {
      state.showQuestProviderModal = action.payload
    },
    setQuestManagementTabIndex(state, action: { payload: number }) {
      state.questManagementTabIndex = action.payload
    },
    setQuestDefaults() {
      return initialState
    }
  }
})

export const {
  addSelectedHeroes,
  setHeroQuantityRequired,
  removeSelectedHero,
  clearSelectedHeroes,
  setHeroRewardsMap,
  setHeroRewardsMapDefault,
  setShowQuestHeroSelector,
  setShowQuestManagementModal,
  setShowQuestProviderModal,
  addActiveQuest,
  setActiveQuests,
  removeActiveQuest,
  setQuestData,
  setShowQuestRewardModal,
  setQuestManagementTabIndex,
  setQuestDefaults
} = questsSlice.actions
export default questsSlice.reducer
