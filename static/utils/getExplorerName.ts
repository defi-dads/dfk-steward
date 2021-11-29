import { Blockchain } from '@defikingdoms/sdk'

export default function getExplorerName(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'BSCScan'
    case Blockchain.HARMONY:
      return 'Harmony Explorer'
    default:
      return 'Etherscan'
  }
}
