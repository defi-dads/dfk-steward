import React, { useState } from 'react'
import RewardTooltip from './RewardTooltip'
import FancyBlock from 'components/_DeFiKingdoms/FancyBlock'
import { Item } from 'constants/items'
import styles from './RewardBlock.module.scss'

interface RewardBlockProps {
  reward: Item
}

const RewardBlock = ({ reward }: RewardBlockProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <FancyBlock
      onClick={() => (reward ? setShowTooltip(!showTooltip) : null)}
      hoverEffect
      className={styles.rewardBlock}
      focusable
    >
      {reward && <img src={reward.image} alt={reward.name} />}
      {reward?.quantity && <p className={styles.quantity}>{reward.quantity}</p>}
      {showTooltip && <RewardTooltip reward={reward} setShowTooltip={setShowTooltip} />}
    </FancyBlock>
  )
}

export default RewardBlock
