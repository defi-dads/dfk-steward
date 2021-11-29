import React, { useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { ActiveQuest } from 'state/quests'
import { useSelector } from 'state/hooks'
import { Hero } from 'utils/dfkTypes'
import CooldownTimer from 'components/_DeFiKingdoms/CooldownTimer'
import FancyButton from 'components/_DeFiKingdoms/FancyButton'
import HeroProfile from 'components/_DeFiKingdoms/Heroes/components/HeroProfile'
import { handleQuestComplete } from '../utils'
import { useQuestCoreContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import styles from './ActiveQuestBlock.module.scss'

interface ActiveQuestProps {
  quest: ActiveQuest
}

const ActiveQuestBlock = ({ quest }: ActiveQuestProps) => {
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const { chainId } = useActiveWeb3React()
  const [transactionProcessing, setTransactionProcessing] = useState()
  const { questData } = useSelector(s => s.quests)
  const { userHeroes } = useSelector(state => state.heroes)
  const heroes = userHeroes.filter((hero: Hero) => quest.heroes.includes(hero.id))
  const questCoreContract = useQuestCoreContract(true)

  const countDownTime = moment
    .utc(quest.completeAtTime.ts)
    .utcOffset('-08:00')
    .toDate()

  function handleQuestCompleteLocal() {
    handleQuestComplete(heroes[0].id, questData, questCoreContract, addTransaction, chainId, setTransactionProcessing)
  }

  return (
    <div className={styles.activeQuest} key={quest.id}>
      <div className={styles.buttonWrapper}>
        {heroes.map((hero: Hero) => (
          <div title={hero.id} className={styles.buttonSpacer} key={hero.id}>
            <HeroProfile hero={hero} />
          </div>
        ))}
      </div>
      <CooldownTimer countDownTime={countDownTime}>
        <FancyButton
          onClick={handleQuestCompleteLocal}
          loading={transactionProcessing}
          disabled={transactionProcessing}
        >
          {t('Complete Quest')}
        </FancyButton>
      </CooldownTimer>
    </div>
  )
}

export default ActiveQuestBlock
