import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from '@defikingdoms/sdk'
import { useTokenContract, useGovTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import useGovernanceToken from '../hooks/useGovernanceToken'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export function useGovTokenSupply(method = 'totalSupply'): TokenAmount | undefined {
  const contract = useGovTokenContract()
  const value: BigNumber = useSingleCallResult(contract, method)?.result?.[0]
  const token = useGovernanceToken()
  return token && value ? new TokenAmount(token, value.toString()) : undefined
}
