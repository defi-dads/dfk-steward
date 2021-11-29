import { useMemo } from 'react'
import { TokenAmount, Fraction } from '@defikingdoms/sdk'
import { useTokenBalance } from '../state/wallet/hooks'
import useBUSDPrice from './useBUSDPrice'
import useBankToken from './useBankToken'
import { GOVERNANCE_TOKEN_INTERFACE } from '../constants/abis/governanceToken'
import useGovernanceToken from 'hooks/useGovernanceToken'

export default function useBankTVL(): Fraction | undefined {
  const govToken = useGovernanceToken()
  const govTokenBusdPrice = useBUSDPrice(govToken)
  const bank = useBankToken()
  const bankGovTokenBalance: TokenAmount | undefined = useTokenBalance(
    bank && bank.address,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  return useMemo(() => {
    return govTokenBusdPrice ? bankGovTokenBalance?.multiply(govTokenBusdPrice?.raw) : undefined
  }, [govToken, govTokenBusdPrice, bank, bankGovTokenBalance])
}
