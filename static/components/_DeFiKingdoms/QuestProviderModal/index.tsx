import React from 'react'
import { ChainId } from '@defikingdoms/sdk'
import Modal from 'components/Modal'
import { CloseIcon } from 'theme/components'
import NPCDialog from 'components/_DeFiKingdoms/QuestRewardModal/components/NPCDialog'
import FancyBlock from 'components/_DeFiKingdoms/FancyBlock'
import { useSelector } from 'state/hooks'
import { useActiveWeb3React } from 'hooks'
import { dispatch } from 'state'
import { setQuestManagementTabIndex, setShowQuestManagementModal, setShowQuestProviderModal } from 'state/quests'
import styles from './index.module.scss'

const QuestProviderModal = () => {
  const { chainId } = useActiveWeb3React()
  const {
    activeQuests,
    questData: {
      hmnAddress,
      htnAddress,
      disabled,
      disabledDescription,
      npc: { description, name, npcImage, title }
    },
    showQuestProviderModal
  } = useSelector(s => s.quests)
  const address = chainId === ChainId.HARMONY_MAINNET ? hmnAddress : htnAddress
  const activeQuestsFiltered = activeQuests.filter(quest => quest.questAddress === address.toLowerCase())
  const dismissModal = () => {
    dispatch(setShowQuestProviderModal(false))
  }
  const handleOpenQuest = () => {
    dispatch(setShowQuestManagementModal(true))
    dismissModal()
  }

  const handleOpenActive = () => {
    dispatch(setShowQuestManagementModal(true))
    dispatch(setQuestManagementTabIndex(1))
    dismissModal()
  }

  return (
    <Modal
      isOpen={showQuestProviderModal}
      onDismiss={dismissModal}
      maxWidth={1164}
      className={`${styles.questProviderModal} dk-modal`}
    >
      <div className={`${styles.header} dk-modal--header`}>
        <h4 className={styles.title}>{title}</h4>
        <CloseIcon onClick={dismissModal} />
      </div>
      <div className={`${styles.profileGrid} dk-modal--body dialog-flex`}>
        <NPCDialog
          npc={name}
          npcImage={npcImage}
          description={disabled && disabledDescription ? disabledDescription : description}
        />
        <FancyBlock className={styles.actionBox}>
          <ul style={{ marginBottom: '0rem' }} className="dialog-menu">
            <li>
              {disabled ? (
                <p>Coming Soon</p>
              ) : (
                <a className={styles.largeLink} onClick={handleOpenQuest}>
                  Start Quest
                </a>
              )}
            </li>
            {activeQuestsFiltered.length > 0 && (
              <li>
                <a className={styles.largeLink} onClick={handleOpenActive}>
                  Active Quests ({activeQuestsFiltered.length})
                </a>
              </li>
            )}
          </ul>
        </FancyBlock>
      </div>
    </Modal>
  )
}

export default QuestProviderModal
