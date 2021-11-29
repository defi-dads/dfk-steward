import { Blockchain } from '@defikingdoms/sdk'
import { BLOCKCHAIN } from '../connectors'
import defiKingdomsTokenLogo from '../assets/images/JEWEL.png'

export default function getTokenLogo(): string {
  switch (BLOCKCHAIN) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return defiKingdomsTokenLogo
    case Blockchain.HARMONY:
      return defiKingdomsTokenLogo
    default:
      return defiKingdomsTokenLogo
  }
}
