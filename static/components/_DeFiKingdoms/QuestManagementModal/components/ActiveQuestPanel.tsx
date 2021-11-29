import React from 'react'
import { ActiveQuest } from 'state/quests'
import ActiveQuestBlock from './ActiveQuestBlock'
import styles from '../index.module.scss'

interface ActiveQuestPanelProps {
  activeQuestsFiltered: ActiveQuest[]
}

const ActiveQuestPanel = ({ activeQuestsFiltered }: ActiveQuestPanelProps) => {
  return (
    <div className={styles.activeQuestPanel}>
      {activeQuestsFiltered.map(quest => (
        <ActiveQuestBlock key={quest.id} quest={quest} />
      ))}
    </div>
  )
}

export default ActiveQuestPanel
