import {
  getAssistingAuctions,
  getSaleAuctions,
  getHeroCatalog,
  getUserHeroes,
  getHeroSaleHistory,
  getHeroLineage
} from 'utils/heroesApi'
import {
  setHirableHeroes,
  setForSaleHeroes,
  setHeroCatalog,
  setUserHeroes,
  setHeroesLoading,
  setHeroSaleHistory,
  setHeroLineage
} from 'state/heroes'

export const fetchHeroCatalog = async (
  dispatch: any,
  chainId: any,
  account: any,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: any
) => {
  if (chainId && account) {
    try {
      dispatch(setHeroesLoading(true))
      const heroCatalog = await getHeroCatalog(
        chainId,
        account,
        allFilters,
        cardsPerPage,
        currentPage,
        sortBy,
        sortDirection
      )
      dispatch(setHeroCatalog(heroCatalog))
      dispatch(setHeroesLoading(false))
    } catch (error) {
      dispatch(setHeroesLoading(false))
      throw error
    }
  }
}

export const fetchUserHeroes = async (
  dispatch: any,
  chainId: any,
  account: any,
  allFilters: any,
  sortBy: string,
  sortDirection: any
) => {
  if (chainId && account) {
    try {
      dispatch(setHeroesLoading(true))
      const userHeroes = await getUserHeroes(chainId, account, allFilters, sortBy, sortDirection)
      dispatch(setUserHeroes(userHeroes))
      dispatch(setHeroesLoading(false))
    } catch (error) {
      dispatch(setHeroesLoading(false))
      throw error
    }
  }
}

export const fetchForSaleHeroes = async (
  dispatch: any,
  chainId: any,
  account: any,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: string
) => {
  if (chainId && account) {
    try {
      dispatch(setHeroesLoading(true))
      const saleAuctions = await getSaleAuctions(
        chainId,
        account,
        allFilters,
        cardsPerPage,
        currentPage,
        sortBy,
        sortDirection
      )
      dispatch(setForSaleHeroes(saleAuctions))
      dispatch(setHeroesLoading(false))
    } catch (error) {
      dispatch(setHeroesLoading(false))
      throw error
    }
  }
}

export const fetchHirableHeroes = async (
  dispatch: any,
  chainId: any,
  account: any,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: string
) => {
  if (chainId && account) {
    try {
      dispatch(setHeroesLoading(true))
      const auctionHeroes = await getAssistingAuctions(
        chainId,
        account,
        allFilters,
        cardsPerPage,
        currentPage,
        sortBy,
        sortDirection
      )
      dispatch(setHirableHeroes(auctionHeroes))
      dispatch(setHeroesLoading(false))
    } catch (error) {
      dispatch(setHeroesLoading(false))
      throw error
    }
  }
}

export const fetchHeroSaleHistory = async (dispatch: any, chainId: any, tokenId: string, account: any) => {
  if (chainId && account) {
    try {
      const saleHistory = await getHeroSaleHistory(chainId, tokenId, account)
      dispatch(setHeroSaleHistory(saleHistory))
    } catch (error) {
      throw error
    }
  }
}

export const fetchHeroLineage = async (dispatch: any, chainId: any, id: string, account: any) => {
  if (chainId && account) {
    try {
      const lineage = await getHeroLineage(chainId, id, account)
      dispatch(setHeroLineage(lineage))
    } catch (error) {
      throw error
    }
  }
}
