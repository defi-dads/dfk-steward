import React from 'react'
import cx from 'classnames'
import { Hero } from 'utils/dfkTypes'
import { useSelector } from 'state/hooks'
import HeroProfile from 'components/_DeFiKingdoms/Heroes/components/HeroProfile'
import RewardBlock from './RewardBlock'
import { Reward } from 'state/quests'
import styles from './HeroRewards.module.scss'

interface HeroRewardsProps {
  heroId: string
  rewardsMap: { [index: string]: Reward } | undefined
  skillUp: { [index: string]: number } | undefined
  xpEarned: number | undefined
}

const HeroRewards = ({ heroId, rewardsMap, skillUp, xpEarned }: HeroRewardsProps) => {
  const { userHeroes } = useSelector(state => state.heroes)
  const { rewardedHeroCount } = useSelector(state => state.quests)
  const hero = userHeroes.filter((hero: Hero) => Number(hero.id) === Number(heroId))

  return (
    <div
      title={hero[0].name.replace(/(^\w{1})|(\s{1}\w{1})/g, (s: string) => s.toUpperCase())}
      className={cx(styles.heroRewards, { [styles.singleHero]: rewardedHeroCount <= 1 })}
    >
      <HeroProfile hero={hero[0]} />
      <div className={styles.centerRewards}>
        <div className={styles.rewardsRow}>
          {typeof rewardsMap !== 'undefined' &&
            Object.entries(rewardsMap).map(([key, reward]: [string, Reward]) => (
              <RewardBlock key={key} reward={reward} />
            ))}
        </div>
        <h4 className={styles.xp}>+{xpEarned} XP</h4>
        {typeof skillUp !== 'undefined' &&
          Object.entries(skillUp).map(([profession, points]) => {
            const professionCopy = profession[0].toUpperCase() + profession.slice(1)

            return (
              <h5 key={profession} className={styles.skill}>
                {professionCopy} skill increased by {points.toFixed(1)}
              </h5>
            )
          })}
      </div>
    </div>
  )
}

export default HeroRewards
