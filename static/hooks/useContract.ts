import { Contract } from '@ethersproject/contracts'
import { abi as GOVERNANCE_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
import { abi as UNI_ABI } from '@uniswap/governance/build/Uni.json'
import GOVERNANCE_TOKEN_ABI from '../constants/abis/JewelToken.json'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import MASTER_GARDENER_ABI from '../constants/abis/MasterGardener.json'
import BANK_ABI from '../constants/abis/Bank.json'
import BANKER_ABI from '../../src/constants/abis/Banker.json'
import PROFILES_ABI from '../../src/constants/abis/Profiles.json'
import AIRDROP_ABI from '../../src/constants/abis/AirdropClaim.json'
import HEROCORE_ABI from '../../src/constants/abis/heroes/HeroCore.json'
import HEROSALE_ABI from '../../src/constants/abis/heroes/HeroSale.json'
import HEROSUMMONING_ABI from '../../src/constants/abis/heroes/HeroSummoning.json'
import SALEAUCTION_ABI from '../../src/constants/abis/heroes/SaleAuction.json'
import GEN0AIRDROP_ABI from '../../src/constants/abis/heroes/Gen0Airdrop.json'
import QUESTCORE_ABI from '../../src/constants/abis/quests/QuestCore.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { ChainId, WETH } from '@defikingdoms/sdk'
import IUniswapV2PairABI from '../../src/constants/abis/IUniswapV2Pair.json'
import { useMemo } from 'react'
import {
  GOVERNANCE_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MASTER_GARDENER,
  BANK,
  BANKER,
  PROFILES_ADDRESSES,
  AIRDROP_ADDRESSES,
  HEROCORE_ADDRESSES,
  HEROSALE_ADDRESSES,
  HEROSUMMONING_ADDRESSES,
  GEN0AIRDROP_ADDRESSES,
  SALEAUCTION_ADDRESSES
} from '../constants'
import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
} from '../constants/abis/argent-wallet-detector'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from '../constants/abis/migrator'
import UNISOCKS_ABI from '../constants/abis/unisocks.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from '../constants/v1'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import useGovernanceToken from './useGovernanceToken'
import { QUESTCORE_ADDRESSES } from '../constants/quests/addresses'
import itemMap, { getItemAddress, ItemKeys } from 'constants/items'

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useV1FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && V1_FACTORY_ADDRESSES[chainId], V1_FACTORY_ABI, false)
}

export function useV2MigratorContract(): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true)
}

export function useV1ExchangeContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, V1_EXCHANGE_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  )
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.ROPSTEN:
      case ChainId.RINKEBY:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceContract(): Contract | null {
  return useContract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, true)
}

export function useUniContract(): Contract | null {
  return useContract(useGovernanceToken()?.address, UNI_ABI, true)
}

export function useGovTokenContract(): Contract | null {
  return useContract(useGovernanceToken()?.address, GOVERNANCE_TOKEN_ABI, true)
}

export function useBankContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? BANK[chainId].address : undefined, BANK_ABI, withSignerIfPossible)
}

export function useBankerContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? BANKER[chainId] : undefined, BANKER_ABI, withSignerIfPossible)
}

export function useProfilesContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? PROFILES_ADDRESSES[chainId] : undefined, PROFILES_ABI, withSignerIfPossible)
}

export function useAirdropContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? AIRDROP_ADDRESSES[chainId] : undefined, AIRDROP_ABI, withSignerIfPossible)
}

export function useHeroCoreContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? HEROCORE_ADDRESSES[chainId] : undefined, HEROCORE_ABI, withSignerIfPossible)
}

export function useItemContract(itemKey: ItemKeys, withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  const item = itemMap[itemKey as ItemKeys]
  const itemAddress = getItemAddress(itemKey, chainId)
  return useContract(itemAddress, item.abi, withSignerIfPossible)
}

export function useHeroSaleContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? HEROSALE_ADDRESSES[chainId] : undefined, HEROSALE_ABI, withSignerIfPossible)
}

export function useHeroSummoningContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? HEROSUMMONING_ADDRESSES[chainId] : undefined, HEROSUMMONING_ABI, withSignerIfPossible)
}

export function useSaleAuctionContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? SALEAUCTION_ADDRESSES[chainId] : undefined, SALEAUCTION_ABI, withSignerIfPossible)
}

export function useGen0AirdropContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? GEN0AIRDROP_ADDRESSES[chainId] : undefined, GEN0AIRDROP_ABI, withSignerIfPossible)
}

export function useQuestCoreContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? QUESTCORE_ADDRESSES[chainId] : undefined, QUESTCORE_ABI, withSignerIfPossible)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useMasterGardenerContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  const address = chainId && MASTER_GARDENER[chainId]
  return useContract(address, MASTER_GARDENER_ABI, withSignerIfPossible)
}

export function useSocksController(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? '0x65770b5283117639760beA3F867b69b3697a91dd' : undefined,
    UNISOCKS_ABI,
    false
  )
}
