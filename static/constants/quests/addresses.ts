import { ChainId } from '@defikingdoms/sdk'
import { ZERO_ONE_ADDRESS } from '../index'

export const QUESTCORE_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: ZERO_ONE_ADDRESS,
  [ChainId.ROPSTEN]: ZERO_ONE_ADDRESS,
  [ChainId.RINKEBY]: ZERO_ONE_ADDRESS,
  [ChainId.GÖRLI]: ZERO_ONE_ADDRESS,
  [ChainId.KOVAN]: ZERO_ONE_ADDRESS,
  [ChainId.BSC_MAINNET]: ZERO_ONE_ADDRESS,
  [ChainId.BSC_TESTNET]: ZERO_ONE_ADDRESS,
  [ChainId.HARMONY_MAINNET]: '0x5100Bd31b822371108A0f63DCFb6594b9919Eaf4',
  [ChainId.HARMONY_TESTNET]: '0x13e4818A1433A7B63f228266d9d5e5c42B015ba5',
  [ChainId.HARDHAT]: ZERO_ONE_ADDRESS
}
