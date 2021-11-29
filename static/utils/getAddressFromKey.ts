import { ChainId } from '@defikingdoms/sdk'
import { ZERO_ONE_ADDRESS } from 'constants/index'

interface GenericAddressFunction {
  <T, K extends keyof T>(map: T, key: K, chainId: ChainId | undefined): string
}

export const getAddressFromKey: GenericAddressFunction = (map, key, chainId) => {
  const object = map[key] as any
  switch (chainId) {
    case ChainId.HARMONY_MAINNET:
      return object.hmnAddress
    case ChainId.HARMONY_TESTNET:
      return object.htnAddress
    default:
      return ZERO_ONE_ADDRESS
  }
}
