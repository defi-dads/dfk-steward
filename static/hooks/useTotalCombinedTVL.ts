import { useMemo } from 'react'
import { StakingInfo } from '../state/stake/hooks'
import useTotalTVL from './useTotalTVL'
import useBankTVL from './useBankTVL'

export default function useTotalCombinedTVL(stakingInfos: StakingInfo[]): Record<string, any> {
  const totalStakingPoolTVL = useTotalTVL(stakingInfos)
  const totalBankTVL = useBankTVL()

  return useMemo(() => {
    return {
      stakingPoolTVL: totalStakingPoolTVL ? totalStakingPoolTVL : undefined,
      totalBankTVL: totalBankTVL ? totalBankTVL : undefined,
      totalCombinedTVL: totalStakingPoolTVL && totalBankTVL ? totalStakingPoolTVL.add(totalBankTVL) : undefined
    }
  }, [stakingInfos, totalStakingPoolTVL, totalBankTVL])
}
