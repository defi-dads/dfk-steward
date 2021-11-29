import React from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { Item } from 'constants/items'
import styles from './RewardTooltip.module.scss'

interface RewardTooltipProps {
  setShowTooltip: Function
  reward?: Item
}

const RewardTooltip = ({ reward, setShowTooltip }: RewardTooltipProps) => {
  return (
    <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
      <div className={styles.rewardTooltip}>
        <h4>{reward?.name}</h4>
        <p>{reward?.description}</p>
      </div>
    </ClickAwayListener>
  )
}

export default RewardTooltip
