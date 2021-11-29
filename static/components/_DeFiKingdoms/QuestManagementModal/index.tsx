import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'state/hooks'
import { useTranslation } from 'react-i18next'
import { calculateRemainingStamina } from 'components/_DeFiKingdoms/Heroes/utils/staminaCalculations'
import { setShowQuestHeroSelector, setShowQuestManagementModal, setQuestManagementTabIndex } from 'state/quests'
import { DKModal } from 'components/_DeFiKingdoms/DKModal'
import HeroHub, { ActiveModalType, ListType } from 'components/_DeFiKingdoms/HeroHub'
import { ChainId } from '@defikingdoms/sdk'
import { useActiveWeb3React } from 'hooks'
import ClickAwayListener from 'react-click-away-listener'
import ActiveQuestPanel from './components/ActiveQuestPanel'
import BeginQuestPanel from './components/BeginQuestPanel'
import levelPlaque from 'assets/images/professions/questscroll-box-display-level.png'
import questBanner from 'assets/images/professions/questscroll-ribbon.png'
import sceneFrame from 'assets/images/professions/questscroll-box-image.png'
import styles from './index.module.scss'
import FancyBlock from '../FancyBlock'

interface QuestManagementModalProps {
  setShowRewardsModal?: Function
}

const QuestManagementModal = ({ setShowRewardsModal }: QuestManagementModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { chainId } = useActiveWeb3React()
  const {
    activeQuests,
    selectedHeroes,
    showQuestHeroSelector,
    showQuestManagementModal,
    questManagementTabIndex,
    questData: {
      npc,
      prompts,
      tooltipText,
      minHeroes,
      maxHeroes,
      hmnAddress,
      htnAddress,
      level,
      title,
      baseStaminaCost,
      proficientStaminaCost,
      proficiencyType,
      duration
    }
  } = useSelector(s => s.quests)

  const address = chainId === ChainId.HARMONY_MAINNET ? hmnAddress : htnAddress
  const activeQuestsFiltered = activeQuests.filter(quest => quest.questAddress === address.toLowerCase())
  const [showTooltip, setShowTooltip] = useState(false)
  const [questAttempts, setQuestAttempts] = useState(1)
  const [maxQuestAttempts, setMaxQuestAttempts] = useState(1)
  const [randomDescription, setRandomDescription] = useState(prompts[0])

  const hasRequiredHeroesQuantity = selectedHeroes.length >= minHeroes
  const questAttemptMarks = [...Array(maxQuestAttempts || 0).keys()].map(k => ({ value: k + 1, label: `${k + 1}` }))

  const handleChange = (value: number) => {
    dispatch(setQuestManagementTabIndex(value))
  }

  const handleToggleTooltip = () => {
    setShowTooltip(!showTooltip)
  }

  const handleCloseTooltip = () => {
    setShowTooltip(false)
  }

  const handleModalClose = () => {
    dispatch(setShowQuestManagementModal(false))
    dispatch(setQuestManagementTabIndex(0))
    handleCloseTooltip()
  }

  const handleMaxQuestAttempts = () => {
    if (hasRequiredHeroesQuantity) {
      let maxAttempts = 10
      selectedHeroes.forEach((hero: any, index: number) => {
        const staminaRemaining = calculateRemainingStamina(hero)
        const staminaCost = hero.statGenes.profession === proficiencyType ? proficientStaminaCost : baseStaminaCost
        const totalAttempts = Math.floor(staminaRemaining / staminaCost)

        if (totalAttempts < maxAttempts || index === 0) {
          maxAttempts = totalAttempts
        }
      })

      setMaxQuestAttempts(maxAttempts)
      setQuestAttempts(maxAttempts)
    } else {
      setMaxQuestAttempts(1)
    }
  }

  const randomizeQuestDescription = (textOptions: string[]) => {
    const numOptions = textOptions.length
    const randomSplit = 1 / numOptions
    const randomNumber = Math.random()
    const randomIndex = Math.floor(randomNumber / randomSplit)

    return textOptions[randomIndex]
  }

  function escapeFunction(ev: any) {
    if (ev.key === 'Escape') {
      handleModalClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeFunction, false)

    return () => {
      document.removeEventListener('keydown', escapeFunction, false)
    }
  }, [])

  useEffect(() => {
    if (showQuestManagementModal) {
      setRandomDescription(randomizeQuestDescription(prompts))
    }
  }, [showQuestManagementModal])

  useEffect(() => {
    handleMaxQuestAttempts()
  }, [selectedHeroes])

  const handleQuestAttemptsChange = (_: any, value: any) => {
    setQuestAttempts(value)
  }

  const handleSelectHeroesClose = () => {
    dispatch(setShowQuestHeroSelector(false))
  }

  return typeof document !== 'undefined' && showQuestManagementModal
    ? createPortal(
        <>
          <div className={styles.questModal}>
            <div className={styles.questScroll}>
              <div className={styles.parchment}>
                <div className={styles.questBanner}>
                  <ClickAwayListener onClickAway={handleCloseTooltip}>
                    <div className={styles.tooltipContainer}>
                      <button
                        className={`${styles.transparentButton} ${styles.tooltipButton}`}
                        onClick={handleToggleTooltip}
                      />
                      {showTooltip && (
                        <FancyBlock className={styles.tooltip}>
                          <p dangerouslySetInnerHTML={{ __html: tooltipText }} />
                        </FancyBlock>
                      )}
                    </div>
                  </ClickAwayListener>
                  <img src={questBanner} />
                  <h2>{title}</h2>
                  <button className={`${styles.transparentButton} ${styles.closeButton}`} onClick={handleModalClose} />
                </div>
                <div className={styles.levelPlaque}>
                  <img src={levelPlaque} />
                  <h3>Level {level}</h3>
                </div>
                {npc.sceneImage && (
                  <div className={styles.animatedImage}>
                    <img src={sceneFrame} />
                    <img className={styles.animatedScene} src={npc.sceneImage} />
                  </div>
                )}
                <div className={styles.variableWrapper}>
                  <div className={styles.descriptionPlaque}>
                    <div className={styles.questCopy}>
                      <h4>Description</h4>
                      <p>{randomDescription}</p>
                      <div className={styles.requiredStats}>
                        <p>
                          <strong>Base duration:</strong>
                          <br /> {duration} seconds
                        </p>
                        <p>
                          <strong>Stamina per attempt:</strong>
                          <br />{' '}
                          {baseStaminaCost > proficientStaminaCost ? (
                            <span>
                              {baseStaminaCost} stamina ({proficientStaminaCost} for Heroes with{' '}
                              <strong>{proficiencyType}</strong>)
                            </span>
                          ) : (
                            `${baseStaminaCost} stamina`
                          )}
                        </p>
                        <p>
                          <strong>Required Hero Range:</strong>
                          <br /> Between {minHeroes} and {maxHeroes} heroes
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottomSection}>
                    <div className={styles.tabs}>
                      <button
                        className={cx(styles.tab, { [styles.active]: questManagementTabIndex === 0 })}
                        onClick={() => handleChange(0)}
                      >
                        <p>{t('Start Quest')}</p>
                      </button>
                      <button
                        className={cx(styles.tab, { [styles.active]: questManagementTabIndex === 1 })}
                        onClick={() => handleChange(1)}
                        disabled={activeQuestsFiltered.length < 1}
                      >
                        <p>
                          {t('Active Quests')} ({activeQuestsFiltered.length})
                        </p>
                      </button>
                    </div>

                    {questManagementTabIndex === 0 && (
                      <BeginQuestPanel
                        activeQuestsFiltered={activeQuestsFiltered}
                        handleQuestAttemptsChange={handleQuestAttemptsChange}
                        hasRequiredHeroesQuantity={hasRequiredHeroesQuantity}
                        maxQuestAttempts={maxQuestAttempts}
                        questAttempts={questAttempts}
                        questAttemptMarks={questAttemptMarks}
                      />
                    )}
                    {questManagementTabIndex === 1 && <ActiveQuestPanel activeQuestsFiltered={activeQuestsFiltered} />}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.questModalOverlay} onClick={handleModalClose} />
          </div>
          <DKModal
            title={t('Select Questing Hero')}
            showModal={showQuestHeroSelector}
            setShowModal={handleSelectHeroesClose}
            maxWidth={2000}
          >
            <HeroHub
              activeModalType={ActiveModalType.quest}
              listType={ListType.owned}
              handleSelectHeroesClose={handleSelectHeroesClose}
            />
          </DKModal>
        </>,
        document.body
      )
    : null
}

export default QuestManagementModal
