import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import HeroProfile from 'components/_DeFiKingdoms/Heroes/components/HeroProfile'
import { Plus } from 'react-feather'
import FancyButton from 'components/_DeFiKingdoms/FancyButton'
import { QuestType } from 'constants/quests'
import { Hero } from 'utils/dfkTypes'
import { ChainId } from '@defikingdoms/sdk'
import questPlus from 'assets/images/professions/quesstscroll-box-heroselect.png'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'state/hooks'
import { ActiveQuest, removeSelectedHero, setShowQuestHeroSelector } from 'state/quests'
import { white } from 'utils/colors'
import { useQuestCoreContract } from 'hooks/useContract'
import { calculateQuestCompleteTime, handleQuestBegin } from '../utils'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import styles from '../index.module.scss'

const useStyles = makeStyles(theme => ({
  slider: {
    marginLeft: '.5rem',
    marginRight: '.5rem',
    maxWidth: 'calc(100% - 1rem)',
    '& .MuiSlider-markLabel': {
      fontSize: '16px',
      color: '#3e1f05'
    },
    '&.MuiSlider-root': {
      color: '#3e1f05'
    }
  }
}))

interface BeginQuestPanelProps {
  activeQuestsFiltered: ActiveQuest[]
  handleQuestAttemptsChange: any
  hasRequiredHeroesQuantity: boolean
  maxQuestAttempts: number
  questAttempts: number
  questAttemptMarks: { value: number; label: string }[]
}

const BeginQuestPanel = ({
  activeQuestsFiltered,
  handleQuestAttemptsChange,
  hasRequiredHeroesQuantity,
  maxQuestAttempts,
  questAttempts,
  questAttemptMarks
}: BeginQuestPanelProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const { chainId } = useActiveWeb3React()
  const questCoreContract = useQuestCoreContract(true)
  const [transactionProcessing, setTransactionProcessing] = useState()

  const {
    selectedHeroes,
    questData: { duration, hmnAddress, htnAddress, minHeroes, maxHeroes, type, baseOnly }
  } = useSelector(s => s.quests)
  const address = chainId === ChainId.HARMONY_MAINNET ? hmnAddress : htnAddress

  const handleSelectHeroesClick = () => {
    dispatch(setShowQuestHeroSelector(true))
  }

  const handleHeroRemove = (hero: Hero) => {
    dispatch(removeSelectedHero(hero))
  }

  const handleQuestBeginLocal = () => {
    handleQuestBegin(
      selectedHeroes,
      questAttempts,
      questCoreContract,
      addTransaction,
      address,
      chainId,
      setTransactionProcessing
    )
  }

  return (
    <div className={styles.beginQuestPanel}>
      <p>
        {minHeroes === maxHeroes
          ? t(`Select ${minHeroes} Hero${minHeroes <= 1 ? '' : 'es'}`)
          : t(`Select ${minHeroes} to ${maxHeroes} Heroes`)}
      </p>
      <div className={styles.buttonWrapper}>
        {selectedHeroes.map(hero => {
          return (
            <div className={styles.buttonSpacer} key={hero.id}>
              <div className={styles.plusImage} onClick={() => handleHeroRemove(hero)}>
                <HeroProfile hero={hero} placeholderComponent={<Plus color={white} />} />
              </div>
            </div>
          )
        })}
        {minHeroes >= selectedHeroes.length &&
          [...Array(minHeroes - selectedHeroes.length)].map((e, i) => (
            <div className={styles.buttonSpacer} key={i}>
              <div className={styles.plusImage}>
                <button className={styles.transparentButton} onClick={handleSelectHeroesClick}>
                  <img src={questPlus} />
                </button>
              </div>
            </div>
          ))}
        {selectedHeroes.length >= minHeroes && selectedHeroes.length < maxHeroes && (
          <div className={styles.buttonSpacer}>
            <div className={styles.plusImage}>
              <button className={styles.transparentButton} onClick={handleSelectHeroesClick}>
                <img src={questPlus} />
              </button>
            </div>
          </div>
        )}
      </div>
      {hasRequiredHeroesQuantity && !selectedHeroes[0]?.isQuesting && type === QuestType.AttemptBased && (
        <>
          <p>{t('Quest attempts')}</p>
          {maxQuestAttempts > 1 ? (
            <SliderWrapper>
              <Slider
                className={classes.slider}
                value={hasRequiredHeroesQuantity ? questAttempts : 0}
                onChange={handleQuestAttemptsChange}
                valueLabelDisplay="off"
                aria-labelledby="quest-attempts-slider"
                defaultValue={hasRequiredHeroesQuantity ? 1 : 0}
                marks={questAttemptMarks}
                max={maxQuestAttempts}
                min={hasRequiredHeroesQuantity ? 1 : 0}
                disabled={!hasRequiredHeroesQuantity}
              />
            </SliderWrapper>
          ) : (
            <p className={styles.oneAttemptText}>1 attempt</p>
          )}
          <p className={styles.totalDuration}>
            Total Duration:{' '}
            {baseOnly ? `${duration} seconds` : calculateQuestCompleteTime(selectedHeroes.length, questAttempts)}
          </p>
        </>
      )}
      <ButtonContainer>
        <FancyButton
          onClick={handleQuestBeginLocal}
          loading={!selectedHeroes[0]?.isQuesting && transactionProcessing}
          disabled={!hasRequiredHeroesQuantity || transactionProcessing}
        >
          {activeQuestsFiltered.length > 0 ? t('Queue Quest') : t('Begin Quest')}
        </FancyButton>
      </ButtonContainer>
    </div>
  )
}

export default BeginQuestPanel

const SliderWrapper = styled.div.attrs(props => ({
  className: 'slider-container'
}))`
  width: 100%;
  max-width: 270px;
  margin: 0 auto 1em;
`

const ButtonContainer = styled.div.attrs(props => ({
  className: 'button-container'
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: -50px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 10px;
  }
`
