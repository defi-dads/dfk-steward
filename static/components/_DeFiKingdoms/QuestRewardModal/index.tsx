import React from 'react'
import ribbon from 'assets/images/professions/RIBBON2.png'
import { useDispatch, useSelector } from 'state/hooks'
import { setShowQuestRewardModal } from 'state/quests'
import { generateContextualRewardDialogue } from 'utils/quests/handleSuccessfulQuest'
import styles from './index.module.scss'
import HeroRewards from './components/HeroRewards'
import FancyModal from 'components/_DeFiKingdoms/FancyModal'
import NPCDialog from './components/NPCDialog'
import { QuestKeys, questMap } from 'constants/quests'

const QuestRewardModal = () => {
  const { heroRewardsMap, questData, showQuestRewardModal } = useSelector(s => s.quests)
  const dispatch = useDispatch()
  const closeRewardsModal = () => {
    dispatch(setShowQuestRewardModal(false))
  }

  const totalXP = Object.entries(heroRewardsMap).reduce((a, b) => {
    const earned = b[1].xpEarned || 0
    return a + earned
  }, 0)
  const zeroXP = totalXP <= 0
  const rewardQuest = questData || questMap[QuestKeys.WISHING_WELL_0]

  return (
    <FancyModal
      closeModal={closeRewardsModal}
      showModal={showQuestRewardModal}
      wrapperClassName={styles.questRewardModal}
      appendComponent={
        rewardQuest.rewardsDialogueMap && (
          <div className={styles.npcContainer}>
            <NPCDialog
              npc={rewardQuest.npc.name}
              npcImage={rewardQuest.npc.npcImage}
              description={generateContextualRewardDialogue(heroRewardsMap, rewardQuest.rewardsDialogueMap, zeroXP)}
            />
          </div>
        )
      }
    >
      <div className={styles.questBanner}>
        <img src={ribbon} />
        <h2>{zeroXP ? 'Quest Failed' : 'Quest Complete!'}</h2>
      </div>
      {zeroXP && <p className={styles.questFailed}>Quest failed. Please try again.</p>}
      <div className={`${styles.rewardsContainer} dk-modal--npc-text align-center`}>
        {Object.entries(heroRewardsMap).map(([key, hero]) => (
          <HeroRewards
            key={key}
            heroId={key}
            rewardsMap={hero.rewards}
            xpEarned={hero.xpEarned}
            skillUp={hero.skillUp}
          />
        ))}
      </div>
    </FancyModal>
  )
}

export default QuestRewardModal
