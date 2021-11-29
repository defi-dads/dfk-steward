import { ChainId } from '@defikingdoms/sdk'

export function getObjectFromAddress<T, R>(address: string, chainId: ChainId | undefined, map: T): R | null {
  for (const [key, object] of Object.entries(map)) {
    const newObject = { key, ...object }

    const isHarmonyMainNet =
      chainId === ChainId.HARMONY_MAINNET && address.toLowerCase() === object.hmnAddress.toLowerCase()
    const isHarmonyTestNet =
      chainId === ChainId.HARMONY_TESTNET && address.toLowerCase() === object.htnAddress.toLowerCase()

    if (isHarmonyMainNet) {
      return newObject
    } else if (isHarmonyTestNet) {
      return newObject
    }
  }
  return null
}
