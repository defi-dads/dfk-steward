import { ChainId } from '@defikingdoms/sdk'
import INVENTORYITEM_ABI from 'constants/abis/heroes/InventoryItem.json'
import ambertaffy from 'assets/images/items/ambertaffy.png'
import antipoisonPotion from 'assets/images/items/antipoison-potion.png'
import blindnessPotion from 'assets/images/items/blindness-potion.png'
import bloater from 'assets/images/items/bloater.png'
import bluestem from 'assets/images/items/bluestem.png'
import breatheRune from 'assets/images/items/breathe-rune.png'
import courageRune from 'assets/images/items/courage-rune.png'
import crystalBlue from 'assets/images/items/crystal-blue.png'
import crystalGreen from 'assets/images/items/crystal-green.png'
import darkweed from 'assets/images/items/darkweed.png'
import defiagra from 'assets/images/items/defiagra.png'
import defiagraPlus from 'assets/images/items/defiagra-plus.png'
import energyRune from 'assets/images/items/energy-rune.png'
import gaiasTears from 'assets/images/items/gaias-tear.png'
import goldBag from 'assets/images/items/gold-bag.png'
import goldIngot from 'assets/images/items/gold-ingot.png'
import goldNuggetRaw from 'assets/images/items/gold-nugget-raw.png'
import goldPile from 'assets/images/items/gold-pile.png'
import goldvein from 'assets/images/items/goldvein.png'
import healthPotion from 'assets/images/items/health-potion.png'
import healthPotionLarge from 'assets/images/items/health-potion-large.png'
import heroEgg from 'assets/images/items/hero-egg.png'
import hopeRune from 'assets/images/items/hope-rune.png'
import ironIngot from 'assets/images/items/iron-ingot.png'
import ironNuggetRaw from 'assets/images/items/iron-nugget-raw.png'
import ironscale from 'assets/images/items/ironscale.png'
import jewelBag from 'assets/images/items/jewel-bag.png'
import lanterneye from 'assets/images/items/lanterneye.png'
import liberationRune from 'assets/images/items/liberation-rune.png'
import lightRune from 'assets/images/items/light-rune.png'
import magicResistPotion from 'assets/images/items/magic-resist-potion.png'
import manaPotion from 'assets/images/items/mana-potion.png'
import manaPotionLarge from 'assets/images/items/mana-potion-large.png'
import milkweed from 'assets/images/items/milkweed.png'
import omRune from 'assets/images/items/om-rune.png'
import petEggBlack from 'assets/images/items/pet-egg-black.png'
import petEggBlue from 'assets/images/items/pet-egg-blue.png'
import petEggGolden from 'assets/images/items/pet-egg-golden.gif'
import petEggGreen from 'assets/images/items/pet-egg-green.png'
import petEggGrey from 'assets/images/items/pet-egg-grey.png'
import petEggYellow from 'assets/images/items/pet-egg-yellow.png'
import pureRune from 'assets/images/items/pure-rune.png'
import ragweed from 'assets/images/items/ragweed.png'
import redgill from 'assets/images/items/redgill.png'
import redleaf from 'assets/images/items/redleaf.png'
import rock from 'assets/images/items/rock.png'
import rockroot from 'assets/images/items/rockroot.png'
import sailfish from 'assets/images/items/sailfish.png'
import shimmerscale from 'assets/images/items/shimmerskin.png'
import shvasRune from 'assets/images/items/shvas-rune.gif'
import silverfin from 'assets/images/items/silverfin.png'
import soulRune from 'assets/images/items/soul-rune.png'
import spiderFruit from 'assets/images/items/spider-fruit.png'
import staminaPotion from 'assets/images/items/stamina-potion.png'
import staminaPotionLarge from 'assets/images/items/stamina-potion-large.gif'
import stoneBlockChiseled from 'assets/images/items/stone-block-chiseled.png'
import swiftnessPotion from 'assets/images/items/swiftness-potion.png'
import swiftThistle from 'assets/images/items/swift-thistle.png'
import toughnessPotion from 'assets/images/items/toughness-potion.png'
import wisdomRune from 'assets/images/items/wisdom-rune.png'
import woodBeamRefined from 'assets/images/items/wood-beam-refined.png'
import woodPlankRefined from 'assets/images/items/wood-plank-refined.png'
import { ZERO_ONE_ADDRESS } from 'constants/index'
import { getObjectFromAddress } from 'utils/getObjectFromAddress'
import { getAddressFromKey } from 'utils/getAddressFromKey'

/* --- Item Keys --- */
export enum ItemKeys {
  AMBERTAFFY = 'ambertaffy',
  ANTIPOISON_POTION = 'antipoisonPotion',
  BLINDNESS_POTION = 'blindnessPotion',
  BLOATER = 'bloater',
  BLUESTEM = 'bluestem',
  BREATHE_RUNE = 'breatheRune',
  COURAGE_RUNE = 'courageRune',
  CRYSTAL_BLUE = 'crystalBlue',
  CRYSTAL_GREEN = 'crystalGreen',
  DARKWEED = 'darkweed',
  DEFIAGRA = 'defiagra',
  DEFIAGRA_PLUS = 'defiagraPlus',
  GAIASTEARS = 'gaiasTears',
  GOLD_BAG = 'goldBag',
  GOLD_INGOT = 'goldIngot',
  GOLD_NUGGET_RAW = 'goldNuggetRaw',
  GOLD_PILE = 'goldPile',
  GOLDVEIN = 'goldvein',
  ENERGY_RUNE = 'energyRune',
  HEALTH_POTION = 'healthPotion',
  HEALTH_POTION_LARGE = 'healthPotionLarge',
  HERO_EGG = 'heroEgg',
  HOPE_RUNE = 'hopeRune',
  IRON_INGOT = 'ironIngot',
  IRON_NUGGET_RAW = 'ironNuggetRaw',
  IRONSCALE = 'ironscale',
  JEWEL_BAG = 'jewelBag',
  LANTERNEYE = 'lanterneye',
  LIBERATION_RUNE = 'liberationRune',
  LIGHT_RUNE = 'lightRune',
  MAGIC_RESIST_POTION = 'magicResistPotion',
  MANA_POTION = 'manaPotion',
  MANA_POTION_LARGE = 'manaPotionLarge',
  MILKWEED = 'milkweed',
  OM_RUNE = 'omRune',
  PET_EGG_BLACK = 'petEggBlack',
  PET_EGG_BLUE = 'petEggBlue',
  PET_EGG_GOLDEN = 'petEggGolden',
  PET_EGG_GREEN = 'petEggGreen',
  PET_EGG_GREY = 'petEggGrey',
  PET_EGG_YELLOW = 'petEggYellow',
  PURE_RUNE = 'pureRune',
  RAGWEED = 'ragweed',
  REDGILL = 'redgill',
  REDLEAF = 'redleaf',
  ROCK = 'rock',
  ROCKROOT = 'rockroot',
  SAILFISH = 'sailfish',
  SHIMMERSCALE = 'shimmerscale',
  SHVAS_RUNE = 'shvasRune',
  SILVERFIN = 'silverfin',
  SOUL_RUNE = 'soulRune',
  SPIDER_FRUIT = 'spiderFruit',
  STAMINA_POTION_LARGE = 'staminaPotionLarge',
  STAMINA_POTION = 'staminaPotion',
  STONE_BLOCK_CHISELED = 'stoneBlockChiseled',
  SWIFTNESS_POTION = 'swiftnessPotion',
  SWIFT_THISTLE = 'swiftThistle',
  TOUGHNESS_POTION = 'toughnessPotion',
  WISDOM_RUNE = 'wisdomRune',
  WOOD_PLANK_REFINED = 'woodPlankRefined',
  WOOD_BEAM_REFINED = 'woodBeamRefined'
}

export enum ItemType {
  SUMMON = 'summon',
  FISH = 'fish',
  RUNE = 'rune',
  POTION = 'potion',
  INGREDIENT = 'ingredient',
  PLANT = 'plant',
  MATERIAL = 'material',
  PET = 'pet',
  SCRAP = 'scrap'
}

export type Item = {
  name: string
  description: string
  image: string
  type: ItemType
  hmnAddress: string
  htnAddress: string
  abi: any[]
  discoveryBonus?: number
  discoveryDialogue?: string
  marketPrice?: number
  salesPrice?: number
  quantity?: number
  key?: string
}

export type ItemMap = {
  [key in ItemKeys]: Item
}

/* --- Item Mapping --- */
const itemMap: ItemMap = {
  [ItemKeys.AMBERTAFFY]: {
    name: 'Ambertaffy',
    description: 'It bends but it doesn’t break. Doesn’t taste great, though.',
    discoveryBonus: 7,
    discoveryDialogue:
      'See how tough the stem on this plant is? Golden and flexible but hard to break, that’s why they call it ambertaffy. Zada will take it off your hands, but it’s also linked to toughness.',
    image: ambertaffy,
    type: ItemType.PLANT,
    salesPrice: 12.5,
    hmnAddress: '0x6e1bC01Cc52D165B357c42042cF608159A2B81c1',
    htnAddress: '0xf644bc484724f964531242992178BC6C5B33C4a3',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.ANTIPOISON_POTION]: {
    name: 'Antipoison Potion',
    description: 'A truly astounding item.',
    image: antipoisonPotion,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.BLINDNESS_POTION]: {
    name: 'Blindness',
    description: 'A truly astounding item.',
    image: blindnessPotion,
    type: ItemType.POTION,
    marketPrice: 10,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.BLOATER]: {
    name: 'Bloater',
    description: 'This plump fish sells for its weight in gold...but it’s mostly hot air.',
    discoveryBonus: 1,
    discoveryDialogue: 'Not bad! You’re still learning, but these little guys sell for a little bit of gold.',
    image: bloater,
    type: ItemType.FISH,
    salesPrice: 2.5,
    hmnAddress: '0x78aED65A2Cc40C7D8B0dF1554Da60b38AD351432',
    htnAddress: '0x87543cC8E5120fe9494B09d4908cAe7dADB7C90a',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.BLUESTEM]: {
    name: 'Bluestem',
    description: 'Beautiful leaves. Why does blue always remind you of mana?',
    discoveryDialogue:
      'Note the bluish tints when you hold it up to the sun. Bluestem is highly sought after for its connection to magical energies. Or, I suppose, you could just sell it for gold.',
    image: bluestem,
    type: ItemType.PLANT,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.BREATHE_RUNE]: {
    name: 'Breathe Rune',
    description: 'A truly astounding item.',
    image: breatheRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.COURAGE_RUNE]: {
    name: 'Courage Rune',
    description: 'A truly astounding item.',
    image: courageRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.CRYSTAL_BLUE]: {
    name: 'Blue Crystal',
    description: 'A truly astounding item.',
    image: crystalBlue,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.CRYSTAL_GREEN]: {
    name: 'Green Crystal',
    description: 'A truly astounding item.',
    image: crystalGreen,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.DARKWEED]: {
    name: 'Darkweed',
    description: 'A root, always found in dark places, that can deliver others from darkness.',
    discoveryBonus: 5,
    discoveryDialogue:
      'This is exactly why you have to search in the shady spots as well! Darkweed thrives without sunlight, and it can even help if you’re blinded.',
    image: darkweed,
    type: ItemType.PLANT,
    salesPrice: 10,
    hmnAddress: '0x68EA4640C5ce6cC0c9A1F17B7b882cB1cBEACcd7',
    htnAddress: '0x70E1EF5418448EA3f2AfCd8D22CBC1cb53988A9a',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.DEFIAGRA]: {
    name: 'Defiagra',
    description: 'A truly astounding item.',
    image: defiagra,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.DEFIAGRA_PLUS]: {
    name: 'Defiagra Plus',
    description: 'A truly astounding item.',
    image: defiagraPlus,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.ENERGY_RUNE]: {
    name: 'Energy Rune ',
    description: 'A truly astounding item.',
    image: energyRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GAIASTEARS]: {
    name: 'Gaia’s Tears',
    description: 'A crystal that, when attuned properly, can summon heroes from faraway lands.',
    discoveryBonus: 10,
    image: gaiasTears,
    type: ItemType.SUMMON,
    hmnAddress: '0x24eA0D436d3c2602fbfEfBe6a16bBc304C963D04',
    htnAddress: '0xf0e28E7c46F307954490fB1134c8D437e23D55fb',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GOLD_BAG]: {
    name: 'Gold Bag',
    description: 'A truly astounding item.',
    image: goldBag,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GOLD_INGOT]: {
    name: 'Gold Ingot',
    description: 'A truly astounding item.',
    image: goldIngot,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GOLD_NUGGET_RAW]: {
    name: 'Raw Gold Nugget',
    description: 'A truly astounding item.',
    image: goldNuggetRaw,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GOLD_PILE]: {
    name: 'Gold Pile',
    description: 'A truly astounding item.',
    image: goldPile,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.GOLDVEIN]: {
    name: 'Goldvein',
    description: 'Brings a whole new level to variegated leaves. Quite valuable.',
    discoveryBonus: 30,
    discoveryDialogue:
      'What a find! Looks like Gaia was watching out for you today. They named goldvein aptly; this is a valuable plant that will earn you plenty at the market.',
    image: goldvein,
    type: ItemType.PLANT,
    salesPrice: 100,
    hmnAddress: '0x600541aD6Ce0a8b5dae68f086D46361534D20E80',
    htnAddress: '0xCDDbE7Aeb5a87C5b815abDf07e25D0aA024C9E68',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.HEALTH_POTION]: {
    name: 'Health Vial',
    description: 'Restores a wee bit of health.',
    image: healthPotion,
    type: ItemType.POTION,
    marketPrice: 10,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.HEALTH_POTION_LARGE]: {
    name: 'Health Pot',
    description: 'Restores a good amount of health.',
    image: healthPotionLarge,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.HERO_EGG]: {
    name: 'Hero Egg',
    description: 'You can feel power seeping from this egg.',
    image: heroEgg,
    type: ItemType.SUMMON,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.HOPE_RUNE]: {
    name: 'Hope Rune',
    description: 'A truly astounding item.',
    image: hopeRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.IRON_INGOT]: {
    name: 'Iron Ingot',
    description: 'A truly astounding item.',
    image: ironIngot,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.IRON_NUGGET_RAW]: {
    name: 'RawIron Nugget',
    description: 'A truly astounding item.',
    image: ironNuggetRaw,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.IRONSCALE]: {
    name: 'Ironscale',
    description: 'The Knight of the Lake. Its scales are as hard as armor.',
    discoveryBonus: 7,
    discoveryDialogue:
      'Ah, an Ironscale! You can sell that at market, but I’ve also heard that their tough scales can be used in other ways…',
    image: ironscale,
    type: ItemType.FISH,
    salesPrice: 5,
    hmnAddress: '0xe4Cfee5bF05CeF3418DA74CFB89727D8E4fEE9FA',
    htnAddress: '0x9578C39Dd4B56407C36aF3718D90a54e8422a706',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.JEWEL_BAG]: {
    name: 'Jewel Bag',
    description: 'You find yourself subconsciously shaking this bag, just to hear the jingle and jangle.',
    image: jewelBag,
    type: ItemType.SUMMON,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.LANTERNEYE]: {
    name: 'Lanterneye',
    description: 'Known to have a connection to magic. Don’t go toward the light...',
    discoveryBonus: 7,
    discoveryDialogue:
      'The creepiest fish of them all, the Lanterneye! Well, he’ll sell for a bit of gold, but these fish have some connection to magic as well…',
    image: lanterneye,
    type: ItemType.FISH,
    salesPrice: 5,
    hmnAddress: '0x8Bf4A0888451C6b5412bCaD3D9dA3DCf5c6CA7BE',
    htnAddress: '0x555174F89aF046F3972607b1a39dE8949d26c4E0',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.LIBERATION_RUNE]: {
    name: 'Liberation Rune',
    description: 'A truly astounding item.',
    image: liberationRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.LIGHT_RUNE]: {
    name: 'Light Rune',
    description: 'A truly astounding item.',
    image: lightRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.MAGIC_RESIST_POTION]: {
    name: 'Magic Resist',
    description: 'A truly astounding item.',
    image: magicResistPotion,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.MANA_POTION]: {
    name: 'Mana Vial',
    description: 'Restores some mana.',
    image: manaPotion,
    type: ItemType.POTION,
    marketPrice: 10,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.MANA_POTION_LARGE]: {
    name: 'Mana Pot',
    description: 'Restores a good chunk of mana.',
    image: manaPotionLarge,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.MILKWEED]: {
    name: 'Milkweed',
    description: 'Pure white, like its namesake. Feeder of butterflies and provider of magic resistance.',
    discoveryDialogue:
      'You can always tell there’s milkweed around if there are butterflies near. I’m not sure why butterflies would need resistance to magic, though…?',
    image: milkweed,
    type: ItemType.PLANT,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.OM_RUNE]: {
    name: 'Om Rune',
    description: 'A truly astounding item.',
    image: omRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_BLACK]: {
    name: 'Black Pet Egg',
    description: 'You think this egg might have been incubated too long.',
    image: petEggBlack,
    type: ItemType.PET,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_BLUE]: {
    name: 'Blue Pet Egg',
    description: 'An aquatic-looking egg.',
    image: petEggBlue,
    type: ItemType.PET,
    hmnAddress: '0x9678518e04Fe02FB30b55e2D0e554E26306d0892',
    htnAddress: '0x9D9675170946eAffb3A750DB75AB4B559cC91668',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_GOLDEN]: {
    name: 'Golden Pet Egg',
    description: 'Looks like real gold. Is it though?',
    image: petEggGolden,
    type: ItemType.PET,
    marketPrice: 1000,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_GREEN]: {
    name: 'Green Pet Egg',
    description: 'If you put your ear against it, you can hear a soft noise.',
    image: petEggGreen,
    type: ItemType.PET,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_GREY]: {
    name: 'Grey Pet Egg',
    description: 'An egg that reminds you of the forest.',
    discoveryBonus: 100,
    discoveryDialogue:
      'Ah, you found yourself an egg! Soon enough, you’ll be able to hatch that. I wonder what forest creature will appear? I’m hoping for a snake, myself.',
    image: petEggGrey,
    type: ItemType.PET,
    hmnAddress: '0x95d02C1Dc58F05A015275eB49E107137D9Ee81Dc',
    htnAddress: '0x2dd97351F41411B2fAf0FbEb4235737815c7857b',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PET_EGG_YELLOW]: {
    name: 'Yellow Pet Egg',
    description: 'You sense something slumbers inside.',
    image: petEggYellow,
    type: ItemType.PET,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.PURE_RUNE]: {
    name: 'Pure Rune',
    description: 'A truly astounding item.',
    image: pureRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.RAGWEED]: {
    name: 'Ragweed',
    description: 'A lousy allergen and irritant. Highly invasive. Sells for a bounty.',
    discoveryBonus: 1,
    discoveryDialogue:
      'Keep that ragweed away from your nose! It’s the main cause of seasonal allergies here in the Kingdom, so you can turn it in for a bounty at the market. One day we’ll eradicate it!',
    image: ragweed,
    type: ItemType.PLANT,
    salesPrice: 2.5,
    hmnAddress: '0x043F9bd9Bb17dFc90dE3D416422695Dd8fa44486',
    htnAddress: '0xa81D367C63F3e737688337fcbF4236Ce91f05347',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.REDGILL]: {
    name: 'Redgill',
    description: 'Fetches a decent price in gold. A staple in Adelyn fish chowder.',
    discoveryBonus: 5,
    discoveryDialogue:
      'Wow! It’s not very common for a novice like you to catch a Redgill! It’ll fetch a decent price at market.',
    image: redgill,
    type: ItemType.FISH,
    salesPrice: 15,
    hmnAddress: '0xc5891912718ccFFcC9732D1942cCD98d5934C2e1',
    htnAddress: '0x59d94005ea7E8E5d44c265Fa64de7A5A34BD6F13',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.REDLEAF]: {
    name: 'Redleaf',
    description: 'A popular decoration, there’s a reasonable market demand for these.',
    discoveryBonus: 5,
    discoveryDialogue:
      'Good eye! There’s a pretty good demand for those flowers in town. You can probably get a fair amount of gold for those.',
    image: redleaf,
    type: ItemType.PLANT,
    salesPrice: 15,
    hmnAddress: '0x094243DfABfBB3E6F71814618ace53f07362a84c',
    htnAddress: '0x219f1576Ff3CaD0Eb12FC9C52E66656Db164b330',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.ROCK]: {
    name: 'Rock',
    description: 'You are overcome with the desire to paint some eyes on it.',
    image: rock,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.ROCKROOT]: {
    name: 'Rockroot',
    description: 'Linked to healing. Its ability to grow in such inhospitable conditions is remarkable.',
    discoveryBonus: 4,
    discoveryDialogue:
      'Oh, that’s rockroot! It sells for a little gold, but the old wives say it can accelerate healing if it’s used properly…',
    image: rockroot,
    type: ItemType.PLANT,
    salesPrice: 5,
    hmnAddress: '0x6B10Ad6E3b99090De20bF9f95F960addC35eF3E2',
    htnAddress: '0x449C417faB9a54e9343Bb48667CB7A495fC7ac25',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SAILFISH]: {
    name: 'Sailfish',
    description: 'Its dorsal fin resembles a sail, and it’s an incredibly fast swimmer.',
    discoveryBonus: 30,
    discoveryDialogue:
      'Oh, isn’t it beautiful? Sailfish are so majestic and so fast. Speaking of which, do you know anything about how to make Swiftness Potions?',
    image: sailfish,
    type: ItemType.FISH,
    salesPrice: 50,
    hmnAddress: '0xb80A07e13240C31ec6dc0B5D72Af79d461dA3A70',
    htnAddress: '0x9b794f8a2E89Ad6954ACe9454E832d467121F48a',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SHIMMERSCALE]: {
    name: 'Shimmerscale',
    description: 'The iridescent beauty of its scales hints at great power.',
    discoveryBonus: 35,
    discoveryDialogue:
      'This is the rarest fish of all, the Shimmerscale! I’ve never even caught one myself. I hear they’re highly prized by Alchemists, but for what purpose, I don’t know.',
    image: shimmerscale,
    type: ItemType.FISH,
    salesPrice: 60,
    hmnAddress: '0x372CaF681353758f985597A35266f7b330a2A44D',
    htnAddress: '0xced132D80E18c8553aF415E27e9f79f32f3E4De3',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SHVAS_RUNE]: {
    name: 'Shvas Rune',
    description: 'This rune pulses with power. Watching it, you begin to breathe in its rhythm...',
    discoveryBonus: 30,
    image: shvasRune,
    type: ItemType.RUNE,
    hmnAddress: '0x66F5BfD910cd83d3766c4B39d13730C911b2D286',
    htnAddress: '0x457A99042D3ba3b61A036f3dC801243670c87c51',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SILVERFIN]: {
    name: 'Silverfin',
    description: 'High market price. Prized for its meat. Pan-sear and flavor with cinnamon.',
    discoveryBonus: 30,
    discoveryDialogue:
      'Amazing! Gaia must be looking down on you today. A novice, catching a silverfin, in this little pond? Its fins might be silver but it’s worth a chunk of gold!',
    image: silverfin,
    type: ItemType.FISH,
    salesPrice: 100,
    hmnAddress: '0x2493cfDAcc0f9c07240B5B1C4BE08c62b8eEff69',
    htnAddress: '0xD6a6fc0279f915BCA59bf9BCf6F8619aa9eda756',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SOUL_RUNE]: {
    name: 'Soul Rune',
    description: 'A truly astounding item.',
    image: soulRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SPIDER_FRUIT]: {
    name: 'Spiderfruit',
    description: 'Might look like poison, but it can actually save you from it.',
    discoveryDialogue:
      'Creepy name, and a creepy use. Spiderfruit’s good for treating poisons. I once used it myself when I got bitten on a foraging expedition.',
    image: spiderFruit,
    type: ItemType.PLANT,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.STAMINA_POTION]: {
    name: 'Stamina Vial',
    description: 'Restores some stamina.',
    image: staminaPotion,
    type: ItemType.POTION,
    marketPrice: 10,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.STAMINA_POTION_LARGE]: {
    name: 'Stamina Pot',
    description: 'Restores a great amount of stamina.',
    image: staminaPotionLarge,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.STONE_BLOCK_CHISELED]: {
    name: 'Chiseled Stone Block',
    description: 'A truly astounding item.',
    image: stoneBlockChiseled,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SWIFTNESS_POTION]: {
    name: 'Swiftness',
    description: 'Adds an extra bounce in your step.',
    image: swiftnessPotion,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.SWIFT_THISTLE]: {
    name: 'Swift-Thistle',
    description: 'The purple flowers are known to enhance speed when used correctly, hence the name.',
    discoveryBonus: 30,
    discoveryDialogue:
      'I’m a huge fan of whoever named this plant. Swift-Thistle. It’ll make you...hustle swiftly. I never learned how to make the potion, though.',
    image: swiftThistle,
    type: ItemType.PLANT,
    salesPrice: 75,
    hmnAddress: '0xCdfFe898E687E941b124dfB7d24983266492eF1d',
    htnAddress: '0x3dc5DbE4eB979762Bbed0C559D0bfB4778582357',
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.TOUGHNESS_POTION]: {
    name: 'Toughness',
    description: 'I think someone sprinkled something in this...',
    image: toughnessPotion,
    type: ItemType.POTION,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.WISDOM_RUNE]: {
    name: 'Wisdom Rune',
    description: 'Opens your mind and expands your senses.',
    image: wisdomRune,
    type: ItemType.RUNE,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.WOOD_BEAM_REFINED]: {
    name: 'Refined Wood Beam',
    description: 'A truly astounding item.',
    image: woodBeamRefined,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  },
  [ItemKeys.WOOD_PLANK_REFINED]: {
    name: 'Refined Wood Plank',
    description: 'A truly astounding item.',
    image: woodPlankRefined,
    type: ItemType.MATERIAL,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    abi: INVENTORYITEM_ABI
  }
}

/* --- Get item Harmony address via key --- */
export const getItemAddress = (itemKey: ItemKeys, chainId: ChainId | undefined) => {
  return getAddressFromKey(itemMap, itemKey, chainId)
}

/* --- Retrieve item via Harmony address --- */
export const getItemFromAddress = (address: string, chainId: ChainId | undefined) => {
  return getObjectFromAddress<ItemMap, Item>(address, chainId, itemMap)
}

export default itemMap
