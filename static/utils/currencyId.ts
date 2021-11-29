import { DEFAULT_CURRENCIES } from '@defikingdoms/sdk'
import { BASE_CURRENCY } from '../connectors'

export function currencyId(currency: any): string {
  if (currency && DEFAULT_CURRENCIES.includes(currency)) {
    return BASE_CURRENCY && BASE_CURRENCY.symbol ? BASE_CURRENCY.symbol : 'ETH'
  }
  if (currency && currency.address) return currency.address
  throw new Error('invalid currency')
}
