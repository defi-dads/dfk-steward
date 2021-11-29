import { useMemo } from 'react'
import { Fraction } from '@defikingdoms/sdk'

import { utils } from 'ethers'
import useBankToken from './useBankToken'
import { useTokenBalance } from '../state/wallet/hooks'
import useGovernanceToken from 'hooks/useGovernanceToken'
import { useTotalSupply } from '../data/TotalSupply'

export default function useBankRatio(): Fraction | undefined {
  const govToken = useGovernanceToken()
  const bank = useBankToken()
  const bankTotalSupply = useTotalSupply(bank)
  const bankGovTokenBalance = useTokenBalance(bank?.address, govToken)
  const multiplier = utils.parseEther('1').toString()

  return useMemo(() => {
    return bankGovTokenBalance && bankTotalSupply
      ? bankGovTokenBalance?.divide(bankTotalSupply?.raw.toString()).multiply(multiplier)
      : undefined
  }, [govToken, bank, bankTotalSupply, bankGovTokenBalance])
}
