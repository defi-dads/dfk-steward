import { ChainId } from '@defikingdoms/sdk'

export const GRAPHQL_ENDPOINT: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.HARMONY_MAINNET]: 'https://graph2.defikingdoms.com/subgraphs/name/defikingdoms/apiv5',
  [ChainId.HARMONY_TESTNET]: 'https://graphtest.defikingdoms.com/subgraphs/name/defikingdoms/apiv5',
  [ChainId.HARDHAT]: ''
}
