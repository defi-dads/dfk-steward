import { Blockchain } from '@defikingdoms/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'DefiKingdoms'
    case Blockchain.HARMONY:
      return 'DefiKingdoms'
    case Blockchain.ETHEREUM:
      return 'DefiKingdoms'
    default:
      return 'DefiKingdoms'
  }
}
