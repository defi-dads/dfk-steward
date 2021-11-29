import React from 'react'
import cx from 'classnames'
import FancyBlock from 'components/_DeFiKingdoms/FancyBlock'
import styles from './NPCDialog.module.scss'

interface NPCDialogProps {
  npc: string
  npcImage?: string
  description: string
}

const NPCDialog = ({ npc, npcImage, description }: NPCDialogProps) => {
  return (
    <FancyBlock className={cx(styles.npcDialog, { [styles.noImage]: !npcImage })}>
      <div className={styles.profileContainer}>
        {npcImage && (
          <img
            src={npcImage}
            style={{ bottom: npc.replace(/\s+/g, '').toLowerCase() === 'quarrysmithgren' ? -61 : 0 }}
            className={styles.profileImage}
          />
        )}
      </div>
      <div className={styles.npcText}>
        <h4 className={styles.npcName}>{npc}</h4>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </FancyBlock>
  )
}

export default NPCDialog
