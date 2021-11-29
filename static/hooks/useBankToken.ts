import { Token } from '@defikingdoms/sdk'
import { BANK } from '../constants'
import { useActiveWeb3React } from './index'

export default function useBankToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? BANK[chainId] : undefined
}
