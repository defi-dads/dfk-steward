export const generateBooleanQuery = (filters: any) => {
  const filterQuery: Array<any> = []
  if (filters.all) {
    filterQuery.push(true)
    filterQuery.push(false)
  } else {
    filterQuery.push(filters.yes)
  }
  return filterQuery
}

export const generateKeyValueQuery = (filters: any, capitalize?: boolean) => {
  const filterQuery: Array<any> = []

  if (filters.all) {
    filterQuery.push(
      ...Object.keys(filters)
        .filter(f => f !== 'all')
        .map(f => (capitalize ? f[0].toUpperCase() + f.slice(1) : f))
    )
    filterQuery.push('T1')
  } else {
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key == 'dreadKnight') {
          filterQuery.push('T1')
        }
        filterQuery.push(capitalize ? key[0].toUpperCase() + key.slice(1) : key)
      }
    }
  }

  return filterQuery
}

export const generateSliderQuery = (filterArray: Array<number>) => {
  const filterQuery: Array<number> = []
  if (filterArray.length <= 0) return filterQuery
  if (filterArray.length > 1) {
    const sortedArray = [...filterArray].sort((a, b) => a - b)
    for (let i = sortedArray[0]; i <= sortedArray[1]; i++) {
      filterQuery.push(i)
    }
    return filterQuery
  } else {
    return filterArray
  }
}

const mapStatBoosts = (key: string) => {
  const statsObject: any = {
    agility: 'AGI',
    dexterity: 'DEX',
    endurance: 'END',
    intelligence: 'INT',
    luck: 'LCK',
    strength: 'STR',
    vitality: 'VIT',
    wisdom: 'WIS'
  }

  return statsObject[key]
}

export const generateStatBoostMappedQuery = (statBoosts: any) => {
  const boostQuery: Array<any> = []

  if (statBoosts.all) {
    boostQuery.push(
      ...Object.keys(statBoosts)
        .filter(f => f !== 'all')
        .map(mapStatBoosts)
    )
  } else {
    for (const [key, value] of Object.entries(statBoosts)) {
      if (value) {
        const mappedKey = mapStatBoosts(key)
        boostQuery.push(mappedKey)
      }
    }
  }

  return boostQuery
}

export const generateStatsValue = (stats: any) => {
  if (Array.isArray(stats) && stats.length >= 1) {
    return stats
  } else {
    return [0, 999999]
  }
}

export const orderByFilter = (orderByTag: string, context?: string) => {
  switch (orderByTag) {
    case 'price':
      return context === 'sales' ? 'salePrice' : 'assistingPrice'
    case 'rarityNum':
      return 'rarity'
    case 'id':
      return 'numberId'
    case 'staminaFullAt':
      return 'staminaFullAt'
    default:
      return orderByTag
  }
}

export const generateStatsMap = (stats: any) => {
  const statsMap: Array<any> = []

  for (const [key, value] of Object.entries(stats)) {
    if (Array.isArray(value) && value.length >= 1) {
      const gtValue = value[0]
      const ltValue = value[1]
      const finalMappings = [
        {
          variable: `$${key}: Int!`,
          query: `${key}_gt`,
          value: gtValue
        },
        {
          variable: `$${key}: Int!`,
          query: `${key}_gt`,
          value: ltValue
        }
      ]

      statsMap.push(...finalMappings)
    }
  }

  return statsMap
}

export const clientSideFilters = (heroesArray: object[], filtersObject: any) => {
  return heroesArray.filter((hero: any) => {
    const mainClass = hero.class[0].toUpperCase() + hero.class.slice(1)
    const subClass = hero.subClass[0].toUpperCase() + hero.subClass.slice(1)
    const element = hero.element
    const background = hero.background
    const rarity = hero.rarityNum
    const generation = hero.generation
    const gender = hero.gender
    const shiny = hero.shiny
    const profession = hero.statGenes?.profession
    const statBoost = hero.statGenes?.statBoost1
    const hp = hero.stats?.hp
    const mp = hero.stats?.mp
    const stamina = hero.stats?.stamina
    const strength = hero.stats?.strength
    const intelligence = hero.stats?.intelligence
    const wisdom = hero.stats?.wisdom
    const luck = hero.stats?.luck
    const agility = hero.stats?.agility
    const vitality = hero.stats?.vitality
    const endurance = hero.stats?.endurance
    const dexterity = hero.stats?.dexterity

    return (
      filtersObject.mainClass.includes(mainClass) &&
      filtersObject.subClass.includes(subClass) &&
      filtersObject.elements.includes(element) &&
      filtersObject.backgrounds.includes(background) &&
      filtersObject.rarity.includes(rarity) &&
      filtersObject.generation.includes(generation) &&
      filtersObject.gender.includes(gender) &&
      filtersObject.shiny.includes(shiny) &&
      filtersObject.profession.includes(profession) &&
      filtersObject.statboost.includes(statBoost) &&
      hp >= filtersObject.hpGt &&
      hp <= filtersObject.hpLt &&
      mp >= filtersObject.mpGt &&
      mp <= filtersObject.mpLt &&
      stamina >= filtersObject.staminaGt &&
      stamina <= filtersObject.staminaLt &&
      strength >= filtersObject.strengthGt &&
      strength <= filtersObject.strengthLt &&
      intelligence >= filtersObject.intelligenceGt &&
      intelligence <= filtersObject.intelligenceLt &&
      wisdom >= filtersObject.wisdomGt &&
      wisdom <= filtersObject.wisdomLt &&
      luck >= filtersObject.luckGt &&
      luck <= filtersObject.luckLt &&
      agility >= filtersObject.agilityGt &&
      agility <= filtersObject.agilityLt &&
      vitality >= filtersObject.vitalityGt &&
      vitality <= filtersObject.vitalityLt &&
      endurance >= filtersObject.enduranceGt &&
      endurance <= filtersObject.enduranceLt &&
      dexterity >= filtersObject.dexterityGt &&
      dexterity <= filtersObject.dexterityLt
    )
  })
}
