import { dispatch } from 'state'
import { ChainId } from '@defikingdoms/sdk'
import { Contract } from '@ethersproject/contracts'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { calculateGasMargin } from 'utils'
import { updateHero } from 'state/heroes'
import {
  clearSelectedHeroes,
  setQuestManagementTabIndex,
  setShowQuestManagementModal,
  setShowQuestRewardModal
} from 'state/quests'
import { handleSuccessfulQuest } from 'utils/quests/handleSuccessfulQuest'
import errorHandler from 'utils/errorHandler'
import { fetchActiveQuests } from 'utils/quests'
import { Hero } from 'utils/dfkTypes'
import { Quest, QuestEventTypes } from 'constants/quests'
import store from 'state'

interface TransactionReceiptWithEvents extends TransactionReceipt {
  events: any
}

export const handleQuestBegin = async (
  selectedHeroes: Array<Hero>,
  questAttempts: number,
  questCoreContract: Contract | null,
  addTransaction: Function,
  address: string | number | undefined,
  chainId: ChainId | undefined,
  setTransactionProcessing: Function
) => {
  if (chainId && questCoreContract && selectedHeroes) {
    try {
      setTransactionProcessing(true)
      const selectedHeroIds = selectedHeroes.map(s => s.id)
      const estimatedGas = await questCoreContract.estimateGas.startQuest(selectedHeroIds, address, questAttempts)
      const response: TransactionResponse = await questCoreContract.startQuest(
        selectedHeroIds,
        address,
        questAttempts,
        {
          gasLimit: calculateGasMargin(estimatedGas)
        }
      )

      addTransaction(response, {
        summary: `Start Quest`
      })

      await response.wait(1).then(receipt => {
        const startedEvent = (receipt as TransactionReceiptWithEvents).events.filter(
          (e: any) => e.event === QuestEventTypes.STARTED
        )[0]

        const modalOpen = store.getState().quests.showQuestManagementModal
        const storeQuest = store.getState().quests.questData
        const storeAddress = chainId === ChainId.HARMONY_MAINNET ? storeQuest.hmnAddress : storeQuest.htnAddress

        const updatedHeroes = selectedHeroes.map(h => ({
          ...h,
          isQuesting: true
        }))
        updatedHeroes.forEach(h => {
          dispatch(updateHero(h))
        })

        if (modalOpen && storeAddress === startedEvent.args.quest.quest) {
          dispatch(setQuestManagementTabIndex(1))
          dispatch(clearSelectedHeroes())
          setTransactionProcessing(false)
        }
      })
    } catch (e) {
      setTransactionProcessing(false)
      errorHandler(e)
    }
  }
}

export const handleQuestComplete = async (
  heroId: number,
  questData: Quest,
  questCoreContract: Contract | null,
  addTransaction: Function,
  chainId: ChainId | undefined,
  setTransactionProcessing: Function
) => {
  if (chainId && questCoreContract) {
    try {
      setTransactionProcessing(true)
      const estimatedGas = await questCoreContract.estimateGas.completeQuest(heroId)
      const response: TransactionResponse = await questCoreContract.completeQuest(heroId, {
        gasLimit: calculateGasMargin(estimatedGas)
      })

      addTransaction(response, {
        summary: 'Complete Quest'
      })

      await response.wait(1).then(receipt => {
        const modalOpen = store.getState().quests.showQuestManagementModal
        handleSuccessfulQuest(receipt, chainId, questData)
        dispatch(setShowQuestRewardModal(true))
        dispatch(setShowQuestManagementModal(false))
        dispatch(setQuestManagementTabIndex(0))

        if (modalOpen) {
          setTransactionProcessing(false)
        }
      })
    } catch (e) {
      setTransactionProcessing(false)
      errorHandler(e)
    }
  }
}

export const handleCancelQuest = async (
  hero: Hero,
  questCoreContract: Contract | null,
  account: string | null | undefined,
  addTransaction: Function,
  setTransactionProcessing: Function
) => {
  setTransactionProcessing(true)
  try {
    const response: TransactionResponse = await questCoreContract?.cancelQuest(hero.id)
    addTransaction(response, {
      summary: `Cancel Quest`
    })

    await response.wait(1).then(receipt => {
      const canceledEvents = (receipt as TransactionReceiptWithEvents).events.filter(
        (e: any) => e.event === QuestEventTypes.CANCELED
      )

      canceledEvents.forEach((cancelEvent: any) => {
        const heroId = Number(cancelEvent.args.heroId)
        const heroFiltered = store.getState().heroes.userHeroes.filter((hero: Hero) => {
          return Number(hero.id) === Number(heroId)
        })[0]

        const newData = { ...heroFiltered, isQuesting: false }
        dispatch(updateHero(newData))
      })
      fetchActiveQuests(account, questCoreContract)
      setTransactionProcessing(false)
    })
  } catch (error) {
    const stuckQuestMessage = 'execution reverted: no quest'
    errorHandler(error, undefined, stuckQuestMessage, async () => {
      try {
        const response: TransactionResponse = await questCoreContract?.completeQuest(hero.id)
        addTransaction(response, {
          summary: `Cancel Quest`
        })

        await response.wait(1).then(receipt => {
          const newData = { ...hero, isQuesting: false }
          dispatch(updateHero(newData))
        })
      } catch (error) {
        errorHandler(error)
      }
      setTransactionProcessing(false)
    })

    if (error.data?.message !== stuckQuestMessage) {
      setTransactionProcessing(false)
    }
  }
}

export const calculateQuestCompleteTime = (numberOfHeroes: number, questAttempts: number) => {
  const baseTime = 20
  const increasePerHero = 10
  const increasePerAttempt = 10
  const totalSeconds =
    numberOfHeroes * questAttempts * baseTime +
    increasePerHero * (questAttempts - 1) * numberOfHeroes +
    increasePerAttempt * (numberOfHeroes - 1) * questAttempts

  return totalSeconds <= 3600
    ? new Date(totalSeconds * 1000).toISOString().substr(14, 5)
    : new Date(totalSeconds * 1000).toISOString().substr(11, 8)
}
