import { ChainId, Currency, ETHER, HARMONY, BINANCE_COIN } from '@defikingdoms/sdk'
import random from 'lodash.random'

/**
 * Blockchain is an enum representing different blockchains
 */
export enum Blockchain {
  ETHEREUM = 1,
  BINANCE_SMART_CHAIN = 2,
  HARMONY = 3
}

/**
 * BlockchainSettings represents settings for a specific blockchain
 */
export class BlockchainSettings {
  chainId: number
  blockchain?: Blockchain
  name?: string
  rpcURLs?: string[]
  rpcAPIKey?: string
  explorerURL?: string
  blockTime?: number
  currency?: Currency

  constructor(
    chainId: ChainId,
    blockchain?: Blockchain,
    name?: string,
    rpcURLs?: string[],
    rpcAPIKey?: string,
    explorerURL?: string,
    blockTime?: number
  ) {
    this.chainId = chainId
    this.rpcAPIKey = rpcAPIKey

    this.setBlockchain(blockchain)
    this.setName(name)
    this.setRpcURLs(rpcURLs)
    this.setExplorerURL(explorerURL)
    this.setCurrency()
    this.setBlocktime(blockTime)
  }

  setBlockchain(blockchain?: Blockchain) {
    if (blockchain) {
      this.blockchain = blockchain
    } else {
      switch (this.chainId) {
        case 56:
        case 97:
          this.blockchain = Blockchain.BINANCE_SMART_CHAIN
          break
        case 1666600000:
        case 1666700000:
        case 31337:
          this.blockchain = Blockchain.HARMONY
          break
        default:
          this.blockchain = Blockchain.ETHEREUM
      }
    }
  }

  setName(name?: string) {
    if (name) {
      this.name = name
    } else {
      switch (this.chainId) {
        case 1:
          this.name = 'Ethereum Mainnet'
          break
        case 3:
          this.name = 'Ethereum Ropsten'
          break
        case 4:
          this.name = 'Ethereum Rinkeby'
          break
        case 5:
          this.name = 'Ethereum Görli'
          break
        case 42:
          this.name = 'Ethereum Kovan'
          break
        case 56:
          this.name = 'Binance Smart Chain Mainnet'
          break
        case 97:
          this.name = 'Binance Smart Chain Testnet'
          break
        case 1666600000:
          this.name = 'Harmony Mainnet'
          break
        case 1666700000:
          this.name = 'Harmony Testnet'
          break
        case 31337:
          this.name = 'Hardhat Local'
          break
        default:
          this.name = 'Ethereum Mainnet'
      }
    }
  }

  setRpcURLs(rpcURLs?: string[]) {
    if (rpcURLs && rpcURLs.length > 0) {
      this.rpcURLs = rpcURLs
    } else {
      switch (this.chainId) {
        case 1:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://mainnet.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://mainnet.infura.io/v3/']
          break
        case 3:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://ropsten.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://ropsten.infura.io/v3/']
          break
        case 4:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://rinkeby.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://rinkeby.infura.io/v3/']
          break
        case 5:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://goerli.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://goerli.infura.io/v3/']
          break
        case 42:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://kovan.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://kovan.infura.io/v3/']
          break
        case 56:
          this.rpcURLs = [
            'https://bsc-dataseed.binance.org/',
            'https://bsc-dataseed1.defibit.io/',
            'https://bsc-dataseed1.ninicoin.io/'
          ]
          break
        case 97:
          this.rpcURLs = [
            'https://data-seed-prebsc-1-s1.binance.org:8545/',
            'https://data-seed-prebsc-2-s1.binance.org:8545/',
            'https://data-seed-prebsc-1-s2.binance.org:8545/'
          ]
          break
        case 1666600000:
          this.rpcURLs = ['https://api.harmony.one/', 'https://api.s0.t.hmny.io/', 'https://a.api.s0.t.hmny.io/']
          break
        case 1666700000:
          this.rpcURLs = ['https://api.s0.pops.one/']
          break
        case 31337:
          this.rpcURLs = ['http://localhost:8545/']
          break
        default:
          this.rpcURLs =
            this.rpcAPIKey && this.rpcAPIKey !== ''
              ? [`https://mainnet.infura.io/v3/${this.rpcAPIKey}`]
              : ['https://mainnet.infura.io/v3/']
      }
    }
  }

  setExplorerURL(explorerURL?: string) {
    if (explorerURL && explorerURL !== '') {
      this.explorerURL = explorerURL
    } else {
      switch (this.chainId) {
        case 1:
          this.explorerURL = 'https://etherscan.io/'
          break
        case 3:
          this.explorerURL = 'https://ropsten.etherscan.io/'
          break
        case 4:
          this.explorerURL = 'https://rinkeby.etherscan.io/'
          break
        case 5:
          this.explorerURL = 'https://goerli.etherscan.io/'
          break
        case 42:
          this.explorerURL = 'https://kovan.etherscan.io/'
          break
        case 56:
          this.explorerURL = 'https://bscscan.com/'
          break
        case 97:
          this.explorerURL = 'https://testnet.bscscan.com/'
          break
        case 1666600000:
          this.explorerURL = 'https://explorer.harmony.one/#/'
          break
        case 1666700000:
          this.explorerURL = 'https://explorer.testnet.harmony.one/#/'
          break
        default:
          this.explorerURL = 'https://etherscan.io/'
      }
    }
  }

  setCurrency() {
    switch (this.chainId) {
      case 56:
      case 97:
        this.currency = BINANCE_COIN
        break
      case 1666600000:
      case 1666700000:
      case 31337:
        this.currency = HARMONY
        break
      default:
        this.currency = ETHER
    }
  }

  setBlocktime(blockTime?: number) {
    if (blockTime) {
      this.blockTime = blockTime
    } else {
      switch (this.chainId) {
        case 56:
        case 97:
          this.blockTime = 3
          break
        case 1666600000:
        case 1666700000:
        case 31337:
          this.blockTime = 2
          break
        default:
          this.blockTime = 13
      }
    }
  }

  randomRpcURL(): string | undefined {
    if (this.rpcURLs === undefined || this.rpcURLs.length === 0) return undefined
    const randomIndex = random(0, this.rpcURLs.length - 1)
    return this.rpcURLs[randomIndex]
  }

  hexChainId(): string {
    return `0x${this.chainId?.toString(16)}`
  }
}

export const BLOCKCHAIN_SETTINGS: { [chainId in ChainId]: BlockchainSettings } = {
  [ChainId.MAINNET]: new BlockchainSettings(ChainId.MAINNET),
  [ChainId.ROPSTEN]: new BlockchainSettings(ChainId.ROPSTEN),
  [ChainId.RINKEBY]: new BlockchainSettings(ChainId.RINKEBY),
  [ChainId.GÖRLI]: new BlockchainSettings(ChainId.GÖRLI),
  [ChainId.KOVAN]: new BlockchainSettings(ChainId.KOVAN),
  [ChainId.BSC_MAINNET]: new BlockchainSettings(ChainId.BSC_MAINNET),
  [ChainId.BSC_TESTNET]: new BlockchainSettings(ChainId.BSC_TESTNET),
  [ChainId.HARMONY_MAINNET]: new BlockchainSettings(ChainId.HARMONY_MAINNET),
  [ChainId.HARMONY_TESTNET]: new BlockchainSettings(ChainId.HARMONY_TESTNET),
  [ChainId.HARDHAT]: new BlockchainSettings(ChainId.HARDHAT)
}
