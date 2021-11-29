import { JSBI, TokenAmount } from '@defikingdoms/sdk'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useMasterGardenerContract } from './useContract'
import useGovernanceToken from './useGovernanceToken'

export default function useBaseStakingRewardsEmission(): TokenAmount | undefined {
  const govToken = useGovernanceToken()
  const masterGardenerContract = useMasterGardenerContract()

  const result = useSingleCallResult(masterGardenerContract, 'getNewRewardPerBlock', [0])
  const baseRewardsPerBlock =
    govToken && result && !result.loading && result.result
      ? new TokenAmount(govToken, JSBI.BigInt(result.result))
      : undefined

  return baseRewardsPerBlock
}
