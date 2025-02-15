import { ChainId, Token } from '@defikingdoms/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export interface StakingRewardsInfo {
  pid: number
  tokens: [Token, Token]
  active: boolean
}

export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: StakingRewardsInfo[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/WONE'),
      active: true
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/BUSD'),
      active: true
    },
    {
      pid: 2,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/bscBNB'),
      active: true
    },
    {
      pid: 3,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/1ETH'),
      active: true
    },
    {
      pid: 4,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/BUSD'),
      active: true
    },
    {
      pid: 5,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/XYA'),
      active: true
    },
    {
      pid: 6,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/1USDC'),
      active: true
    },
    {
      pid: 7,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/1WBTC'),
      active: true
    },
    {
      pid: 8,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/UST'),
      active: true
    },
    {
      pid: 9,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1ETH'),
      active: true
    },
    {
      pid: 10,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC'),
      active: true
    },
    {
      pid: 11,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WBTC/1ETH'),
      active: true
    },
    {
      pid: 12,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/1SUPERBID'),
      active: true
    },
    {
      pid: 13,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1SUPERBID'),
      active: true
    },
    {
      pid: 14,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/MIS'),
      active: true
    },
    {
      pid: 15,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/AVAX'),
      active: true
    },
    {
      pid: 16,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/FTM'),
      active: true
    },
    {
      pid: 17,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/LUNA'),
      active: true
    },
    {
      pid: 18,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/WMATIC'),
      active: true
    }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'JEWEL/WONE'),
      active: true
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'JEWEL/1BUSD'),
      active: true
    }
  ],
  [ChainId.BSC_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'JEWEL/WONE'),
      active: true
    }
  ],
  [ChainId.HARDHAT]: []
}
