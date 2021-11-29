import { buildGraphHero, buildLineageHero } from './heroes'
import { request, gql } from 'graphql-request/dist'
import { GRAPHQL_ENDPOINT } from '../constants/api'
import { ChainId } from '@defikingdoms/sdk'
import {
  generateKeyValueQuery,
  generateSliderQuery,
  generateStatBoostMappedQuery,
  generateStatsValue,
  generateBooleanQuery,
  orderByFilter,
  clientSideFilters
} from './heroFilters'
import _ from 'lodash'
import { ZERO_ADDRESS } from '../constants'
import { dispatch } from 'state'
import { setTotalForSaleHeroes, setTotalHirableHeroes, setTotalUserHeroes, setTotalHeroCatalog } from 'state/heroes'
import { utils } from 'ethers'

const HERO_ATTRIBUTES = gql`
  fragment heroAttributes on Hero {
    id
    owner {
      name
      id
      picId
    }
    shiny
    shinyStyle
    statGenes
    visualGenes
    rarity
    firstName
    lastName
    mainClass
    subClass
    generation
    gardening
    mining
    fishing
    foraging
    strength
    intelligence
    dexterity
    endurance
    wisdom
    agility
    luck
    vitality
    mp
    hp
    stamina
    sp
    status
    staminaFullAt
    level
    xp
    currentQuest
    hpFullAt
    mpFullAt
    strengthGrowthP
    intelligenceGrowthP
    dexterityGrowthP
    enduranceGrowthP
    wisdomGrowthP
    agilityGrowthP
    luckGrowthP
    vitalityGrowthP
    hpSmGrowth
    hpRgGrowth
    hpLgGrowth
    mpSmGrowth
    mpRgGrowth
    mpLgGrowth
    strengthGrowthS
    intelligenceGrowthS
    dexterityGrowthS
    enduranceGrowthS
    wisdomGrowthS
    agilityGrowthS
    luckGrowthS
    vitalityGrowthS
    summonedTime
    maxSummons
    summons
    nextSummonTime
    summonerId {
      id
    }
    assistantId {
      id
    }
  }
`

export async function getAssistingAuctions(
  chainId: ChainId,
  owner: String,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: string
) {
  // Generate query filters
  const mainClassFilter = generateKeyValueQuery(allFilters.basic.heroClasses, true)
  const subClassFilter = generateKeyValueQuery(allFilters.basic.heroSubClasses, true)
  const elementsFilter = generateKeyValueQuery(allFilters.basic.elements)
  const backgroundsFilter = generateKeyValueQuery(allFilters.basic.backgrounds)
  const rarityFilter = generateSliderQuery(allFilters.basic.rarity)
  const genderFilter = generateKeyValueQuery(allFilters.basic.gender)
  const shinyFilter = generateBooleanQuery(allFilters.basic.shiny)
  const priceFilter = generateStatsValue(
    allFilters.basic.price.map((p: number) =>
      BigInt(utils.parseEther(Number.parseFloat(String(p)).toFixed(1))._hex).toString()
    )
  )
  const generationFilter = generateSliderQuery(allFilters.basic.generation)
  const professionFilter = generateKeyValueQuery(allFilters.attributes.professions)
  const statboostFilter = generateStatBoostMappedQuery(allFilters.attributes.statBoost1)
  const hpFilter = generateStatsValue(allFilters.stats.stats.hp)
  const mpFilter = generateStatsValue(allFilters.stats.stats.mp)
  const staminaFilter = generateStatsValue(allFilters.stats.stats.stamina)
  const strengthFilter = generateStatsValue(allFilters.stats.stats.strength)
  const intelligenceFilter = generateStatsValue(allFilters.stats.stats.intelligence)
  const wisdomFilter = generateStatsValue(allFilters.stats.stats.wisdom)
  const luckFilter = generateStatsValue(allFilters.stats.stats.luck)
  const agilityFilter = generateStatsValue(allFilters.stats.stats.agility)
  const vitalityFilter = generateStatsValue(allFilters.stats.stats.vitality)
  const enduranceFilter = generateStatsValue(allFilters.stats.stats.endurance)
  const dexterityFilter = generateStatsValue(allFilters.stats.stats.dexterity)

  const query = gql`
    query getAssistingAuctions(
      $allowedAddresses: [String!]!
      $first: Int
      $skip: Int
      $mainClass: [String!]!
      $subClass: [String!]!
      $elements: [String!]!
      $backgrounds: [String!]!
      $rarity: [Int!]!
      $generation: [Int!]!
      $profession: [String!]!
      $statboost: [String!]!
      $gender: [String!]!
      $shiny: [Boolean!]!
      $priceGt: String!
      $priceLt: String!
      $hpGt: Int!
      $hpLt: Int!
      $mpGt: Int!
      $mpLt: Int!
      $staminaGt: Int!
      $staminaLt: Int!
      $strengthGt: Int!
      $strengthLt: Int!
      $intelligenceGt: Int!
      $intelligenceLt: Int!
      $wisdomGt: Int!
      $wisdomLt: Int!
      $luckGt: Int!
      $luckLt: Int!
      $agilityGt: Int!
      $agilityLt: Int!
      $vitalityGt: Int!
      $vitalityLt: Int!
      $enduranceGt: Int!
      $enduranceLt: Int!
      $dexterityGt: Int!
      $dexterityLt: Int!
      $orderBy: Hero_orderBy
      $orderDirection: OrderDirection
      $now: BigInt!
    ) {
      heros(
        skip: $skip
        first: $first
        where: {
          privateAuctionProfile_in: $allowedAddresses
          assistingAuction_not: null
          mainClass_in: $mainClass
          subClass_in: $subClass
          element_in: $elements
          background_in: $backgrounds
          rarity_in: $rarity
          gender_in: $gender
          shiny_in: $shiny
          assistingPrice_gte: $priceGt
          assistingPrice_lte: $priceLt
          generation_in: $generation
          profession_in: $profession
          statBoost1_in: $statboost
          hp_gte: $hpGt
          hp_lte: $hpLt
          mp_gte: $mpGt
          mp_lte: $mpLt
          stamina_gte: $staminaGt
          stamina_lte: $staminaLt
          strength_gte: $strengthGt
          strength_lte: $strengthLt
          intelligence_gte: $intelligenceGt
          intelligence_lte: $intelligenceLt
          wisdom_gte: $wisdomGt
          wisdom_lte: $wisdomLt
          luck_gte: $luckGt
          luck_lte: $luckLt
          agility_gte: $agilityGt
          agility_lte: $agilityLt
          vitality_gte: $vitalityGt
          vitality_lte: $vitalityLt
          endurance_gte: $enduranceGt
          endurance_lte: $enduranceLt
          dexterity_gte: $dexterityGt
          dexterity_lte: $dexterityLt
          nextSummonTime_lte: $now
        }
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        assistingAuction {
          id
          open
          startedAt
          startingPrice
          endingPrice
          seller {
            name
            id
            picId
          }
          tokenId {
            ...heroAttributes
          }
          winner {
            id
          }
        }
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, {
    allowedAddresses: [owner.toLowerCase(), ZERO_ADDRESS],
    first: cardsPerPage,
    skip:
      typeof currentPage === 'undefined' || typeof cardsPerPage === 'undefined' ? 0 : (currentPage - 1) * cardsPerPage,
    mainClass: mainClassFilter,
    subClass: subClassFilter,
    elements: elementsFilter,
    backgrounds: backgroundsFilter,
    rarity: rarityFilter,
    gender: genderFilter,
    shiny: shinyFilter,
    generation: generationFilter,
    profession: professionFilter,
    statboost: statboostFilter,
    priceGt: priceFilter[0],
    priceLt: priceFilter[1],
    hpGt: hpFilter[0],
    hpLt: hpFilter[1],
    mpGt: mpFilter[0],
    mpLt: mpFilter[1],
    staminaGt: staminaFilter[0],
    staminaLt: staminaFilter[1],
    strengthGt: strengthFilter[0],
    strengthLt: strengthFilter[1],
    intelligenceGt: intelligenceFilter[0],
    intelligenceLt: intelligenceFilter[1],
    wisdomGt: wisdomFilter[0],
    wisdomLt: wisdomFilter[1],
    luckGt: luckFilter[0],
    luckLt: luckFilter[1],
    agilityGt: agilityFilter[0],
    agilityLt: agilityFilter[1],
    vitalityGt: vitalityFilter[0],
    vitalityLt: vitalityFilter[1],
    enduranceGt: enduranceFilter[0],
    enduranceLt: enduranceFilter[1],
    dexterityGt: dexterityFilter[0],
    dexterityLt: dexterityFilter[1],
    orderBy: orderByFilter(sortBy, 'auctions'),
    orderDirection: sortDirection,
    now: Date.now().toString()
  })

  const auctionHeroes = []
  const totalAuctions = result.heros.length
  dispatch(setTotalHirableHeroes(totalAuctions))

  for (const i in result.heros) {
    const heroRaw = result.heros[i].assistingAuction
    heroRaw.tokenId.summoningPrice = heroRaw.startingPrice
    heroRaw.tokenId.winner = heroRaw.winner && heroRaw.winner.id

    const heroBuilt = buildGraphHero(heroRaw.tokenId, heroRaw.tokenId.owner)

    auctionHeroes.push(heroBuilt)
  }

  // Filter out heroes with no remaining summons
  const finalAuctionHeroes = auctionHeroes.filter(hero => hero.generation === 0 || hero.maxSummons - hero.summons > 0)
  return finalAuctionHeroes
}

export async function getSaleAuctions(
  chainId: ChainId,
  owner: String,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: string
) {
  // Generate query filters
  const mainClassFilter = generateKeyValueQuery(allFilters.basic.heroClasses, true)
  const subClassFilter = generateKeyValueQuery(allFilters.basic.heroSubClasses, true)
  const elementsFilter = generateKeyValueQuery(allFilters.basic.elements)
  const backgroundsFilter = generateKeyValueQuery(allFilters.basic.backgrounds)
  const rarityFilter = generateSliderQuery(allFilters.basic.rarity)
  const generationFilter = generateSliderQuery(allFilters.basic.generation)
  const professionFilter = generateKeyValueQuery(allFilters.attributes.professions)
  const statboostFilter = generateStatBoostMappedQuery(allFilters.attributes.statBoost1)
  const genderFilter = generateKeyValueQuery(allFilters.basic.gender)
  const shinyFilter = generateBooleanQuery(allFilters.basic.shiny)
  const priceFilter = generateStatsValue(
    allFilters.basic.price.map((p: number) =>
      BigInt(utils.parseEther(Number.parseFloat(String(p)).toFixed(1))._hex).toString()
    )
  )
  const hpFilter = generateStatsValue(allFilters.stats.stats.hp)
  const mpFilter = generateStatsValue(allFilters.stats.stats.mp)
  const staminaFilter = generateStatsValue(allFilters.stats.stats.stamina)
  const strengthFilter = generateStatsValue(allFilters.stats.stats.strength)
  const intelligenceFilter = generateStatsValue(allFilters.stats.stats.intelligence)
  const wisdomFilter = generateStatsValue(allFilters.stats.stats.wisdom)
  const luckFilter = generateStatsValue(allFilters.stats.stats.luck)
  const agilityFilter = generateStatsValue(allFilters.stats.stats.agility)
  const vitalityFilter = generateStatsValue(allFilters.stats.stats.vitality)
  const enduranceFilter = generateStatsValue(allFilters.stats.stats.endurance)
  const dexterityFilter = generateStatsValue(allFilters.stats.stats.dexterity)

  const query = gql`
    query getSaleAuctions(
      $allowedAddresses: [String!]!
      $first: Int
      $skip: Int
      $mainClass: [String!]!
      $subClass: [String!]!
      $elements: [String!]!
      $backgrounds: [String!]!
      $rarity: [Int!]!
      $gender: [String!]!
      $shiny: [Boolean!]!
      $generation: [Int!]!
      $profession: [String!]!
      $statboost: [String!]!
      $priceGt: String!
      $priceLt: String!
      $hpGt: Int!
      $hpLt: Int!
      $mpGt: Int!
      $mpLt: Int!
      $staminaGt: Int!
      $staminaLt: Int!
      $strengthGt: Int!
      $strengthLt: Int!
      $intelligenceGt: Int!
      $intelligenceLt: Int!
      $wisdomGt: Int!
      $wisdomLt: Int!
      $luckGt: Int!
      $luckLt: Int!
      $agilityGt: Int!
      $agilityLt: Int!
      $vitalityGt: Int!
      $vitalityLt: Int!
      $enduranceGt: Int!
      $enduranceLt: Int!
      $dexterityGt: Int!
      $dexterityLt: Int!
      $orderBy: Hero_orderBy
      $orderDirection: OrderDirection
      $now: BigInt!
    ) {
      heros(
        skip: $skip
        first: $first
        where: {
          saleAuction_not: null
          privateAuctionProfile_in: $allowedAddresses
          mainClass_in: $mainClass
          subClass_in: $subClass
          element_in: $elements
          background_in: $backgrounds
          rarity_in: $rarity
          gender_in: $gender
          shiny_in: $shiny
          generation_in: $generation
          profession_in: $profession
          statBoost1_in: $statboost
          salePrice_gte: $priceGt
          salePrice_lte: $priceLt
          hp_gte: $hpGt
          hp_lte: $hpLt
          mp_gte: $mpGt
          mp_lte: $mpLt
          stamina_gte: $staminaGt
          stamina_lte: $staminaLt
          strength_gte: $strengthGt
          strength_lte: $strengthLt
          intelligence_gte: $intelligenceGt
          intelligence_lte: $intelligenceLt
          wisdom_gte: $wisdomGt
          wisdom_lte: $wisdomLt
          luck_gte: $luckGt
          luck_lte: $luckLt
          agility_gte: $agilityGt
          agility_lte: $agilityLt
          vitality_gte: $vitalityGt
          vitality_lte: $vitalityLt
          endurance_gte: $enduranceGt
          endurance_lte: $enduranceLt
          dexterity_gte: $dexterityGt
          dexterity_lte: $dexterityLt
          nextSummonTime_lte: $now
        }
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        saleAuction {
          id
          open
          startedAt
          startingPrice
          endingPrice
          seller {
            name
            id
            picId
          }
          tokenId {
            ...heroAttributes
          }
          winner {
            id
          }
        }
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, {
    allowedAddresses: [owner.toLowerCase(), ZERO_ADDRESS],
    first: cardsPerPage,
    skip:
      typeof currentPage === 'undefined' || typeof cardsPerPage === 'undefined' ? 0 : (currentPage - 1) * cardsPerPage,
    mainClass: mainClassFilter,
    subClass: subClassFilter,
    elements: elementsFilter,
    backgrounds: backgroundsFilter,
    rarity: rarityFilter,
    generation: generationFilter,
    gender: genderFilter,
    shiny: shinyFilter,
    profession: professionFilter,
    statboost: statboostFilter,
    priceGt: priceFilter[0],
    priceLt: priceFilter[1],
    hpGt: hpFilter[0],
    hpLt: hpFilter[1],
    mpGt: mpFilter[0],
    mpLt: mpFilter[1],
    staminaGt: staminaFilter[0],
    staminaLt: staminaFilter[1],
    strengthGt: strengthFilter[0],
    strengthLt: strengthFilter[1],
    intelligenceGt: intelligenceFilter[0],
    intelligenceLt: intelligenceFilter[1],
    wisdomGt: wisdomFilter[0],
    wisdomLt: wisdomFilter[1],
    luckGt: luckFilter[0],
    luckLt: luckFilter[1],
    agilityGt: agilityFilter[0],
    agilityLt: agilityFilter[1],
    vitalityGt: vitalityFilter[0],
    vitalityLt: vitalityFilter[1],
    enduranceGt: enduranceFilter[0],
    enduranceLt: enduranceFilter[1],
    dexterityGt: dexterityFilter[0],
    dexterityLt: dexterityFilter[1],
    orderBy: orderByFilter(sortBy, 'sales'),
    orderDirection: sortDirection,
    now: Date.now().toString()
  })

  const auctionHeroes = []
  const totalAuctions = result.heros.length
  dispatch(setTotalForSaleHeroes(totalAuctions))

  for (const i in result.heros) {
    const heroRaw = result.heros[i].saleAuction
    heroRaw.tokenId.salePrice = heroRaw.startingPrice
    heroRaw.tokenId.winner = heroRaw.winner && heroRaw.winner.id

    const heroBuilt = buildGraphHero(heroRaw.tokenId, heroRaw.seller)

    auctionHeroes.push(heroBuilt)
  }

  return auctionHeroes
}

export async function getUserHeroes(
  chainId: ChainId,
  owner: String,
  allFilters: any,
  sortBy: string,
  sortDirection: any
) {
  // Generate query filters
  const filtersObject = {
    mainClass: generateKeyValueQuery(allFilters.basic.heroClasses, true),
    subClass: generateKeyValueQuery(allFilters.basic.heroSubClasses, true),
    elements: generateKeyValueQuery(allFilters.basic.elements),
    backgrounds: generateKeyValueQuery(allFilters.basic.backgrounds),
    rarity: generateSliderQuery(allFilters.basic.rarity),
    generation: generateSliderQuery(allFilters.basic.generation),
    gender: generateKeyValueQuery(allFilters.basic.gender),
    shiny: generateBooleanQuery(allFilters.basic.shiny),
    profession: generateKeyValueQuery(allFilters.attributes.professions),
    statboost: generateStatBoostMappedQuery(allFilters.attributes.statBoost1),
    hpGt: generateStatsValue(allFilters.stats.stats.hp)[0],
    hpLt: generateStatsValue(allFilters.stats.stats.hp)[1],
    mpGt: generateStatsValue(allFilters.stats.stats.mp)[0],
    mpLt: generateStatsValue(allFilters.stats.stats.mp)[1],
    staminaGt: generateStatsValue(allFilters.stats.stats.stamina)[0],
    staminaLt: generateStatsValue(allFilters.stats.stats.stamina)[1],
    strengthGt: generateStatsValue(allFilters.stats.stats.strength)[0],
    strengthLt: generateStatsValue(allFilters.stats.stats.strength)[1],
    intelligenceGt: generateStatsValue(allFilters.stats.stats.intelligence)[0],
    intelligenceLt: generateStatsValue(allFilters.stats.stats.intelligence)[1],
    wisdomGt: generateStatsValue(allFilters.stats.stats.wisdom)[0],
    wisdomLt: generateStatsValue(allFilters.stats.stats.wisdom)[1],
    luckGt: generateStatsValue(allFilters.stats.stats.luck)[0],
    luckLt: generateStatsValue(allFilters.stats.stats.luck)[1],
    agilityGt: generateStatsValue(allFilters.stats.stats.agility)[0],
    agilityLt: generateStatsValue(allFilters.stats.stats.agility)[1],
    vitalityGt: generateStatsValue(allFilters.stats.stats.vitality)[0],
    vitalityLt: generateStatsValue(allFilters.stats.stats.vitality)[1],
    enduranceGt: generateStatsValue(allFilters.stats.stats.endurance)[0],
    enduranceLt: generateStatsValue(allFilters.stats.stats.endurance)[1],
    dexterityGt: generateStatsValue(allFilters.stats.stats.dexterity)[0],
    dexterityLt: generateStatsValue(allFilters.stats.stats.dexterity)[1]
  }

  const userOptions = {
    owner: owner.toLowerCase(),
    ...filtersObject
  }

  const query = gql`
    query getUserHeroes(
      $owner: String!
      $mainClass: [String!]!
      $subClass: [String!]!
      $elements: [String!]!
      $backgrounds: [String!]!
      $rarity: [Int!]!
      $generation: [Int!]!
      $gender: [String!]!
      $shiny: [Boolean!]!
      $profession: [String!]!
      $statboost: [String!]!
      $hpGt: Int!
      $hpLt: Int!
      $mpGt: Int!
      $mpLt: Int!
      $staminaGt: Int!
      $staminaLt: Int!
      $strengthGt: Int!
      $strengthLt: Int!
      $intelligenceGt: Int!
      $intelligenceLt: Int!
      $wisdomGt: Int!
      $wisdomLt: Int!
      $luckGt: Int!
      $luckLt: Int!
      $agilityGt: Int!
      $agilityLt: Int!
      $vitalityGt: Int!
      $vitalityLt: Int!
      $enduranceGt: Int!
      $enduranceLt: Int!
      $dexterityGt: Int!
      $dexterityLt: Int!
    ) {
      heros(
        where: {
          owner: $owner
          mainClass_in: $mainClass
          subClass_in: $subClass
          element_in: $elements
          background_in: $backgrounds
          rarity_in: $rarity
          generation_in: $generation
          profession_in: $profession
          gender_in: $gender
          shiny_in: $shiny
          statBoost1_in: $statboost
          hp_gte: $hpGt
          hp_lte: $hpLt
          mp_gte: $mpGt
          mp_lte: $mpLt
          stamina_gte: $staminaGt
          stamina_lte: $staminaLt
          strength_gte: $strengthGt
          strength_lte: $strengthLt
          intelligence_gte: $intelligenceGt
          intelligence_lte: $intelligenceLt
          wisdom_gte: $wisdomGt
          wisdom_lte: $wisdomLt
          luck_gte: $luckGt
          luck_lte: $luckLt
          agility_gte: $agilityGt
          agility_lte: $agilityLt
          vitality_gte: $vitalityGt
          vitality_lte: $vitalityLt
          endurance_gte: $enduranceGt
          endurance_lte: $enduranceLt
          dexterity_gte: $dexterityGt
          dexterity_lte: $dexterityLt
        }
      ) {
        ...heroAttributes
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, userOptions)

  const userHeroes: { [index: string]: object } = {}

  for (const i in result.heros) {
    const heroRaw = result.heros[i]
    userHeroes[heroRaw.id] = buildGraphHero(heroRaw, heroRaw.owner)
  }

  // Also get the user's own on sale heroes.
  const userSaleAuctionsQuery = gql`
    query getUserSaleAuctions($owner: String!) {
      saleAuctions(where: { seller: $owner, open: true }) {
        id
        open
        startedAt
        startingPrice
        endingPrice
        seller {
          name
          id
          picId
        }
        tokenId {
          ...heroAttributes
        }
        winner {
          id
          name
        }
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const saleAuctionResult = await request(GRAPHQL_ENDPOINT[chainId], userSaleAuctionsQuery, userOptions)

  for (const i in saleAuctionResult.saleAuctions) {
    const heroRaw = saleAuctionResult.saleAuctions[i]
    heroRaw.tokenId.salePrice = heroRaw.startingPrice
    heroRaw.tokenId.winner = heroRaw.winner && heroRaw.winner.id
    userHeroes[heroRaw.tokenId.id] = buildGraphHero(heroRaw.tokenId, heroRaw.seller)
  }

  // Also get the user's own for hire heroes.
  const userAssistingAuctionsQuest = gql`
    query getUserSaleAuctions($owner: String!) {
      assistingAuctions(where: { seller: $owner, open: true }) {
        id
        open
        startedAt
        startingPrice
        endingPrice
        seller {
          name
          id
          picId
        }
        tokenId {
          ...heroAttributes
        }
        winner {
          id
          name
        }
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const assistingAuctionResult = await request(GRAPHQL_ENDPOINT[chainId], userAssistingAuctionsQuest, userOptions)

  for (const i in assistingAuctionResult.assistingAuctions) {
    const heroRaw = assistingAuctionResult.assistingAuctions[i]
    heroRaw.tokenId.summoningPrice = heroRaw.startingPrice
    heroRaw.tokenId.winner = heroRaw.winner && heroRaw.winner.id
    userHeroes[heroRaw.tokenId.id] = buildGraphHero(heroRaw.tokenId, heroRaw.seller)
  }

  const heroesArray = []
  for (const i in userHeroes) {
    heroesArray.push(userHeroes[i])
  }

  dispatch(setTotalUserHeroes(heroesArray.length))

  // Client-side filtering user for sale / hired heroes
  const filteredHeroesArray = clientSideFilters(heroesArray, filtersObject)
  const sortedHeroesArray = _.orderBy(filteredHeroesArray, [sortBy, 'generation', 'id'], [sortDirection])
  return sortedHeroesArray
}

export async function getHeroCatalog(
  chainId: ChainId,
  owner: String,
  allFilters: any,
  cardsPerPage: number,
  currentPage: number,
  sortBy: string,
  sortDirection: any
) {
  // Generate query filters
  const mainClassFilter = generateKeyValueQuery(allFilters.basic.heroClasses, true)
  const subClassFilter = generateKeyValueQuery(allFilters.basic.heroSubClasses, true)
  const elementsFilter = generateKeyValueQuery(allFilters.basic.elements)
  const backgroundsFilter = generateKeyValueQuery(allFilters.basic.backgrounds)
  const rarityFilter = generateSliderQuery(allFilters.basic.rarity)
  const generationFilter = generateSliderQuery(allFilters.basic.generation)
  const genderFilter = generateKeyValueQuery(allFilters.basic.gender)
  const shinyFilter = generateBooleanQuery(allFilters.basic.shiny)
  const professionFilter = generateKeyValueQuery(allFilters.attributes.professions)
  const statboostFilter = generateStatBoostMappedQuery(allFilters.attributes.statBoost1)
  const hpFilter = generateStatsValue(allFilters.stats.stats.hp)
  const mpFilter = generateStatsValue(allFilters.stats.stats.mp)
  const staminaFilter = generateStatsValue(allFilters.stats.stats.stamina)
  const strengthFilter = generateStatsValue(allFilters.stats.stats.strength)
  const intelligenceFilter = generateStatsValue(allFilters.stats.stats.intelligence)
  const wisdomFilter = generateStatsValue(allFilters.stats.stats.wisdom)
  const luckFilter = generateStatsValue(allFilters.stats.stats.luck)
  const agilityFilter = generateStatsValue(allFilters.stats.stats.agility)
  const vitalityFilter = generateStatsValue(allFilters.stats.stats.vitality)
  const enduranceFilter = generateStatsValue(allFilters.stats.stats.endurance)
  const dexterityFilter = generateStatsValue(allFilters.stats.stats.dexterity)

  const userOptions = {
    first: cardsPerPage,
    skip:
      typeof currentPage === 'undefined' || typeof cardsPerPage === 'undefined' ? 0 : (currentPage - 1) * cardsPerPage,
    owner: owner.toLowerCase(),
    mainClass: mainClassFilter,
    subClass: subClassFilter,
    elements: elementsFilter,
    backgrounds: backgroundsFilter,
    rarity: rarityFilter,
    generation: generationFilter,
    gender: genderFilter,
    shiny: shinyFilter,
    profession: professionFilter,
    statboost: statboostFilter,
    hpGt: hpFilter[0],
    hpLt: hpFilter[1],
    mpGt: mpFilter[0],
    mpLt: mpFilter[1],
    staminaGt: staminaFilter[0],
    staminaLt: staminaFilter[1],
    strengthGt: strengthFilter[0],
    strengthLt: strengthFilter[1],
    intelligenceGt: intelligenceFilter[0],
    intelligenceLt: intelligenceFilter[1],
    wisdomGt: wisdomFilter[0],
    wisdomLt: wisdomFilter[1],
    luckGt: luckFilter[0],
    luckLt: luckFilter[1],
    agilityGt: agilityFilter[0],
    agilityLt: agilityFilter[1],
    vitalityGt: vitalityFilter[0],
    vitalityLt: vitalityFilter[1],
    enduranceGt: enduranceFilter[0],
    enduranceLt: enduranceFilter[1],
    dexterityGt: dexterityFilter[0],
    dexterityLt: dexterityFilter[1],
    orderBy: orderByFilter(sortBy),
    orderDirection: sortDirection
  }

  const query = gql`
    query getHeroCatalog(
      $first: Int
      $skip: Int
      $owner: String!
      $mainClass: [String!]!
      $subClass: [String!]!
      $elements: [String!]!
      $backgrounds: [String!]!
      $rarity: [Int!]!
      $generation: [Int!]!
      $gender: [String!]!
      $shiny: [Boolean!]!
      $profession: [String!]!
      $statboost: [String!]!
      $hpGt: Int!
      $hpLt: Int!
      $mpGt: Int!
      $mpLt: Int!
      $staminaGt: Int!
      $staminaLt: Int!
      $strengthGt: Int!
      $strengthLt: Int!
      $intelligenceGt: Int!
      $intelligenceLt: Int!
      $wisdomGt: Int!
      $wisdomLt: Int!
      $luckGt: Int!
      $luckLt: Int!
      $agilityGt: Int!
      $agilityLt: Int!
      $vitalityGt: Int!
      $vitalityLt: Int!
      $enduranceGt: Int!
      $enduranceLt: Int!
      $dexterityGt: Int!
      $dexterityLt: Int!
      $orderBy: Hero_orderBy
      $orderDirection: OrderDirection
    ) {
      heros(
        skip: $skip
        first: $first
        where: {
          id_gt: 0
          mainClass_in: $mainClass
          subClass_in: $subClass
          element_in: $elements
          background_in: $backgrounds
          rarity_in: $rarity
          generation_in: $generation
          profession_in: $profession
          gender_in: $gender
          shiny_in: $shiny
          statBoost1_in: $statboost
          hp_gte: $hpGt
          hp_lte: $hpLt
          mp_gte: $mpGt
          mp_lte: $mpLt
          stamina_gte: $staminaGt
          stamina_lte: $staminaLt
          strength_gte: $strengthGt
          strength_lte: $strengthLt
          intelligence_gte: $intelligenceGt
          intelligence_lte: $intelligenceLt
          wisdom_gte: $wisdomGt
          wisdom_lte: $wisdomLt
          luck_gte: $luckGt
          luck_lte: $luckLt
          agility_gte: $agilityGt
          agility_lte: $agilityLt
          vitality_gte: $vitalityGt
          vitality_lte: $vitalityLt
          endurance_gte: $enduranceGt
          endurance_lte: $enduranceLt
          dexterity_gte: $dexterityGt
          dexterity_lte: $dexterityLt
        }
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        ...heroAttributes
      }
    }
    ${HERO_ATTRIBUTES}
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, userOptions)

  const catalogHeroes: { [index: string]: object } = {}

  for (const i in result.heros) {
    const heroRaw = result.heros[i]
    catalogHeroes[heroRaw.id] = buildGraphHero(heroRaw, heroRaw.owner)
  }

  const heroesArray = []
  for (const i in catalogHeroes) {
    heroesArray.push(catalogHeroes[i])
  }

  dispatch(setTotalHeroCatalog(heroesArray.length))

  const sortedHerosArray = _.orderBy(heroesArray, [sortBy, 'generation'], [sortDirection])

  return sortedHerosArray
}

export async function getHeroSaleHistory(chainId: ChainId, tokenId: String, owner: String) {
  const query = gql`
    query getHeroSaleHistory($tokenId: String, $orderBy: String, $orderDirection: String) {
      saleAuctions(where: { tokenId: $tokenId }, orderBy: $orderBy, orderDirection: $orderDirection) {
        id
        seller {
          id
          name
        }
        tokenId {
          id
        }
        endingPrice
        endedAt
        winner {
          id
          name
        }
      }
    }
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, {
    allowedAddresses: [owner.toLowerCase(), ZERO_ADDRESS],
    tokenId,
    orderBy: 'endedAt',
    orderDirection: 'desc'
  })
  const saleHistory = result.saleAuctions || []

  return saleHistory
}

export async function getHeroLineage(chainId: ChainId, id: String, owner: String) {
  const query = gql`
    query lineage($id: ID) {
      heros(where: { id: $id }) {
        id
        summonerId {
          id
          mainClass
          generation
          gender
          background
          visualGenes
          rarity
          summonerId {
            id
            mainClass
            generation
            gender
            background
            visualGenes
            rarity
          }
          assistantId {
            id
            mainClass
            generation
            gender
            background
            visualGenes
            rarity
          }
        }
        assistantId {
          id
          mainClass
          generation
          gender
          background
          visualGenes
          rarity
          summonerId {
            id
            mainClass
            generation
            gender
            background
            visualGenes
            rarity
          }
          assistantId {
            id
            mainClass
            generation
            gender
            background
            visualGenes
            rarity
          }
        }
      }
    }
  `

  const result = await request(GRAPHQL_ENDPOINT[chainId], query, {
    allowedAddresses: [owner.toLowerCase(), ZERO_ADDRESS],
    id
  })

  const lineage = result.heros?.[0]
    ? {
        ...result.heros[0],
        summonerId: {
          ...buildLineageHero(result.heros[0].summonerId),
          summonerId: {
            ...buildLineageHero(result.heros[0].summonerId?.summonerId)
          },
          assistantId: {
            ...buildLineageHero(result.heros[0].summonerId?.assistantId)
          }
        },
        assistantId: {
          ...buildLineageHero(result.heros[0].assistantId),
          summonerId: {
            ...buildLineageHero(result.heros[0].assistantId?.summonerId)
          },
          assistantId: {
            ...buildLineageHero(result.heros[0].assistantId?.assistantId)
          }
        }
      }
    : null

  return lineage
}
