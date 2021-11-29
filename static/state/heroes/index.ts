import { createSlice } from '@reduxjs/toolkit'
import { defaultHeroFilters } from '../../constants/heroFilters'

const initialState: any = {
  heroCatalog: [],
  userHeroes: [],
  forSaleHeroes: [],
  loading: false,
  totalHeroCatalog: 0,
  totalUserHeroes: 0,
  totalForSaleHeroes: 0,
  totalHirableHeroes: 0,
  heroSaleHistory: [],
  heroLineage: null,
  heroFilters: { ...defaultHeroFilters },
  resetEventTriggered: false,
  cooldowns: {}
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroCatalog(state, action) {
      state.heroCatalog = action.payload
    },
    setTotalHeroCatalog(state, action) {
      state.totalHeroCatalog = action.payload
    },
    setUserHeroes(state, action) {
      state.userHeroes = action.payload
    },
    setTotalUserHeroes(state, action) {
      state.totalUserHeroes = action.payload
    },
    updateHero(state, action) {
      const updatedHero = action.payload
      const newHeroes = state.userHeroes.concat([])
      const updatedIndex = newHeroes.findIndex((obj: any) => obj.id === updatedHero.id)
      newHeroes[updatedIndex] = updatedHero
      state.userHeroes = newHeroes
    },
    setForSaleHeroes(state, action) {
      state.forSaleHeroes = action.payload
    },
    setTotalForSaleHeroes(state, action) {
      state.totalForSaleHeroes = action.payload
    },
    setHeroesLoading(state, action) {
      state.loading = action.payload
    },
    setHirableHeroes(state, action) {
      state.hirableHeroes = action.payload
    },
    setTotalHirableHeroes(state, action) {
      state.totalHirableHeroes = action.payload
    },
    addUserHero(state, action) {
      const heroId = action.payload.id
      const heroIndex = state.userHeroes.findIndex((obj: any) => obj.id === heroId)

      if (heroIndex === -1) {
        state.userHeroes.push(action.payload)
      }
    },
    removeUserHero(state, action) {
      const heroId = action.payload
      const updatedHeroes = state.userHeroes.filter((hero: any) => hero.id !== heroId)
      state.userHeroes = updatedHeroes
    },
    removeForSaleHero(state, action) {
      const heroId = action.payload
      const updatedHeroes = state.forSaleHeroes.filter((hero: any) => hero.id !== heroId)
      state.forSaleHeroes = updatedHeroes
    },
    setHeroSaleHistory(state, action) {
      state.heroSaleHistory = action.payload
    },
    setHeroLineage(state, action) {
      state.heroLineage = action.payload
    },
    setHeroFilters(state, action) {
      if (action.payload.filterType === 'stats') {
        state.heroFilters = {
          ...state.heroFilters,
          stats: {
            ...state.heroFilters.stats,
            stats: {
              ...state.heroFilters.stats.stats,
              [action.payload.filterSubType]: [
                ...action.payload.filterObject // an array in this case
              ]
            }
          }
        }
      } else {
        state.heroFilters = {
          ...state.heroFilters,
          [action.payload.filterType]: {
            ...state.heroFilters[action.payload.filterType],
            // sometimes this is any array (sliders specifically)
            [action.payload.filterSubType]: Array.isArray(action.payload.filterObject)
              ? [...action.payload.filterObject]
              : {
                  ...state.heroFilters[action.payload.filterType][action.payload.filterSubType],
                  ...action.payload.filterObject
                }
          }
        }
      }
    },
    resetHeroFilters(state) {
      state.heroFilters = { ...defaultHeroFilters }
    },
    setResetEventTriggered(state) {
      state.resetEventTriggered = !state.resetEventTriggered
    },
    setCooldown(state, action) {
      const { transactionHash } = action.payload
      const addResponseTimestamp: { responseTime?: number } = {}
      if (!transactionHash) {
        return
      }
      // this is what we are basing the timer off of. When the transaction has come back
      if (transactionHash && !state.cooldowns[transactionHash]) {
        addResponseTimestamp.responseTime = Math.floor(Date.now() / 1000)
      }
      state.cooldowns = {
        ...state.cooldowns,
        [transactionHash]: {
          ...(state.cooldowns[transactionHash] || {}),
          ...action.payload,
          ...addResponseTimestamp
        }
      }
    },
    removeCooldown(state, action) {
      const { transactionHash } = action.payload
      const newCooldowns = { ...state.cooldowns }
      delete newCooldowns[transactionHash]
      state.cooldowns = newCooldowns
    }
  }
})

const { actions, reducer } = heroesSlice
export const {
  addUserHero,
  removeUserHero,
  removeForSaleHero,
  setHirableHeroes,
  setTotalHirableHeroes,
  setForSaleHeroes,
  setTotalForSaleHeroes,
  setHeroCatalog,
  setTotalHeroCatalog,
  setUserHeroes,
  setTotalUserHeroes,
  updateHero,
  setHeroesLoading,
  setHeroSaleHistory,
  setHeroLineage,
  setHeroFilters,
  resetHeroFilters,
  setResetEventTriggered,
  setCooldown,
  removeCooldown
} = actions
export default reducer
