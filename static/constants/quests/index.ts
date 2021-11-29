import fishingNPC from 'assets/images/professions/profile-tom.png'
import fishingScene from 'assets/images/professions/quest-fishing.gif'
import foragingNPC from 'assets/images/professions/profile-aurum.png'
import foragingScene from 'assets/images/professions/quest-foraging.gif'
import gardeningNPC from 'assets/images/professions/profile-lam.png'
import gardeningScene from 'assets/images/professions/quest-gardening.gif'
import miningNPC from 'assets/images/professions/profile-gren.png'
import miningScene from 'assets/images/professions/quest-mining.gif'
import { ChainId } from '@defikingdoms/sdk'
import { ZERO_ONE_ADDRESS } from 'constants/index'
import { getAddressFromKey } from 'utils/getAddressFromKey'
import { getObjectFromAddress } from 'utils/getObjectFromAddress'

export enum QuestType {
  AttemptBased,
  TimeBased,
  Well
}

export enum QuestKeys {
  FISHING_0 = 'fishing-0',
  FORAGING_0 = 'foraging-0',
  GARDENING_0 = 'gardening-0',
  MINING_0 = 'mining-0',
  WISHING_WELL_0 = 'wishing-well-0'
}

export enum Professions {
  FISHING = 'fishing',
  FORAGING = 'foraging',
  GARDENING = 'gardening',
  MINING = 'mining',
  WISHING_WELL = 'well'
}

export enum QuestStatus {
  ACTIVE = 1,
  COMPLETED = 2
}

export enum QuestEventTypes {
  XP = 'QuestXP',
  SKILL = 'QuestSkillUp',
  REWARD = 'QuestReward',
  STAMINA = 'QuestStaminaSpent',
  STARTED = 'QuestStarted',
  COMPLETE = 'QuestCompleted',
  CANCELED = 'QuestCanceled'
}

export type RewardsDialogueMap = {
  noRewardMessage: string
  questFailedMessage: string
  tearsComboMessage: string
  runesComboMessage: string
  tearsOrRunesOnlyMessage: string
  eggMessage: string
}

export type NPC = {
  name: string
  description: string
  title: string
  npcImage?: string
  sceneImage?: string
}

export type Quest = {
  title: string
  profession: Professions
  hmnAddress: string
  htnAddress: string
  type: QuestType
  level: number
  duration: number
  baseStaminaCost: number
  proficientStaminaCost: number
  proficiencyType?: Professions
  minHeroes: number
  maxHeroes: number
  tooltipText: string
  rewardsDialogueMap?: RewardsDialogueMap
  prompts: string[]
  npc: NPC
  baseOnly?: boolean
  disabled?: boolean
  disabledDescription?: string
}

export type QuestMap = {
  [key in QuestKeys]: Quest
}

export const questMap: QuestMap = {
  [QuestKeys.FISHING_0]: {
    title: 'Fishing Quests',
    profession: Professions.FISHING,
    hmnAddress: '0xE259e8386d38467f0E7fFEdB69c3c9C935dfaeFc',
    htnAddress: '0x6499E23D00092bcf8d9F0A9eEae5b823bD1a5E69',
    type: QuestType.AttemptBased,
    level: 0,
    duration: 20,
    baseStaminaCost: 7,
    proficientStaminaCost: 5,
    proficiencyType: Professions.FISHING,
    minHeroes: 1,
    maxHeroes: 6,
    tooltipText:
      '<p><strong>Fishing Quests</strong> may yield a variety of rewards including various fish, special items, experience toward the Fishing skill, and experience toward your Hero’s next level. Heroes with higher Fishing, Agility, and Luck scores tend to be more successful on Fishing Quests, and Heroes who have Fishing as their main skill expend a reduced amount of Stamina to complete the Quest.</p><p>The main Quest window displays the amount of Stamina that each Hero will expend on this Quest. The total number of attempts defaults to the highest possible number based on the available Stamina of the selected Heroes. It also displays the minimum time required to complete the Quest, which increases as multiple Heroes join the Quest together. The amount of experience gained decreases as Heroes surpass the suggested level of the Quest.</p>',
    rewardsDialogueMap: {
      noRewardMessage:
        'Just junk and litter, eh? Sometimes I wonder if being so near to the mines has an impact on this water.',
      questFailedMessage:
        'Well, you may have lost your line and broken your rod in two, but tomorrow’s a new day! Don’t worry, I’m sure the fish will be biting better by then.',
      tearsComboMessage: 'Wait, is there something caught in between the scales there? Is that...Gaia’s Tear?',
      runesComboMessage: 'Hold on, I think there’s something in its mouth. Let me take a look...that’s a Shvās Rune!',
      tearsOrRunesOnlyMessage: 'Well, no fish, but at least you found something good!',
      eggMessage:
        'Now how in the world did you catch an egg? No matter. This is an amazing find! Soon you’ll be able to hatch this egg to find an aquatic pet of some kind.'
    },
    prompts: [
      'This pond is a great place for new fishermen to...get their feet wet. Why don’t you go ahead and see what you can catch?',
      'Ready to dip your toes into fishing? A moment to learn, a lifetime to master, as they say. Give it a try!',
      'Despite its small size, sometimes you can catch some pretty nice fish in this pond. Let’s see what kind of luck you’ll have today.',
      'I love fishing! It’s a relaxing way to pass the time, enjoy Gaia’s bounty, and earn some JEWEL, too. Want to join me?'
    ],
    npc: {
      name: 'Fisher Tom',
      description:
        'Have a sit. Got some drinks here if you want. It’s a fine day for some company—besides the fish that is. They’re always biting at this spot.',
      title: 'Fishing Quests',
      npcImage: fishingNPC,
      sceneImage: fishingScene
    }
  },
  [QuestKeys.FORAGING_0]: {
    title: 'Foraging Quests',
    profession: Professions.FORAGING,
    hmnAddress: '0x3132c76acF2217646fB8391918D28a16bD8A8Ef4',
    htnAddress: '0x91b4a64958e632b8da517CD4754Ec8fc40417207',
    type: QuestType.AttemptBased,
    level: 0,
    duration: 20,
    baseStaminaCost: 7,
    proficientStaminaCost: 5,
    proficiencyType: Professions.FORAGING,
    minHeroes: 1,
    maxHeroes: 6,
    tooltipText:
      '<p><strong>Foraging Quests</strong> may yield a variety of rewards including various plants, special items, experience toward the Foraging skill, and experience toward your Hero’s next level. Heroes with higher Foraging, Dexterity, and Intelligence scores tend to be more successful on Foraging Quests, and Heroes who have Foraging as their main skill expend a reduced amount of Stamina to complete the Quest.</p><p>The main Quest window displays the amount of Stamina that each Hero will expend on this Quest. The total number of attempts defaults to the highest possible number based on the available Stamina of the selected Heroes. It also displays the minimum time required to complete the Quest, which increases as multiple Heroes join the Quest together. The amount of experience gained decreases as Heroes surpass the suggested level of the Quest.</p>',
    rewardsDialogueMap: {
      noRewardMessage:
        'Just trash and litter, huh? Well, at least we cleaned up the forest a little bit. When will people learn to be more respectful of the environment?',
      questFailedMessage:
        'I’m glad I found you out here before the wild animals did. Dusk is approaching and the forest can be unforgiving. Don’t worry though, there’s always tomorrow.',
      tearsComboMessage:
        'Oh, look at the shimmering! Gaia’s love is still impacting the world today. Heroes coming from the Portal! I still remember the dark days before...',
      runesComboMessage:
        'Oh, and you found a special rock, too! I hear these are very useful, but I never cared much for the minerals, myself. It’s the living things I like!',
      tearsOrRunesOnlyMessage: 'No plants, but you found something even better!',
      eggMessage:
        'Ah, you found yourself an egg! Soon enough, you’ll be able to hatch that. I wonder what forest creature will appear? I’m hoping for a snake, myself.'
    },
    prompts: [
      'If you’re searching for something to do, why not search these woods and see if you can find anything useful?',
      'You look like you’ve got a keen eye and an observant mind. Why not have a look through the forest and see what you find?',
      'Contrary to what the Druids would have you believe, not all valuable plants can be grown in a Garden. Let’s see if we can find some out here.',
      'This forest is full of ragweed, but sometimes I find more valuable plants. Would you like to join me?'
    ],
    npc: {
      name: 'Woodsman Aurum',
      description:
        'Many useful plants out in the wild hide themselves from the untrained eye. Do you have the knack for finding the medicinal ones…or the deadly ones? Both have their uses…',
      title: 'Foraging Quests',
      npcImage: foragingNPC,
      sceneImage: foragingScene
    }
  },
  [QuestKeys.GARDENING_0]: {
    title: 'Gardening Quests',
    profession: Professions.GARDENING,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    type: QuestType.TimeBased,
    level: 0,
    duration: 20,
    baseStaminaCost: 7,
    proficientStaminaCost: 5,
    proficiencyType: Professions.GARDENING,
    minHeroes: 1,
    maxHeroes: 1,
    tooltipText:
      '<p><strong>The Wishing Well</strong> is a Quest that can be undertaken by any Hero of any level and any main profession. The Hero may expend 5 Stamina per attempt and has a chance to receive Gaia’s Tears and a variable amount of experience on each attempt. The maximum number of attempts defaults to the highest possible number based on the available Stamina of the selected Heroes, and the time requirement shown will increase as multiple Heroes and multiple attempts are selected.</p>',
    rewardsDialogueMap: {
      noRewardMessage:
        'Just trash and litter, huh? Well, at least we cleaned up the forest a little bit. When will people learn to be more respectful of the environment?',
      questFailedMessage:
        'I’m glad I found you out here before the wild animals did. Dusk is approaching and the forest can be unforgiving. Don’t worry though, there’s always tomorrow.',
      tearsComboMessage:
        'Oh, look at the shimmering! Gaia’s love is still impacting the world today. Heroes coming from the Portal! I still remember the dark days before...',
      runesComboMessage:
        'Oh, and you found a special rock, too! I hear these are very useful, but I never cared much for the minerals, myself. It’s the living things I like!',
      tearsOrRunesOnlyMessage: 'No plants, but you found something even better!',
      eggMessage:
        'Ah, you found yourself an egg! Soon enough, you’ll be able to hatch that. I wonder what forest creature will appear? I’m hoping for a snake, myself.'
    },
    prompts: [
      'The Gardener is looking to grow plants of a certain species. We need your help to grow them for the kingdom!'
    ],
    npc: {
      name: 'Druid Lam',
      description:
        'You have gained trust among some of the druids, I have heard. I will show you to some of our special gardens. Let’s go see what’s in season and ripe for the picking.',
      title: 'Gardening Quests',
      npcImage: gardeningNPC,
      sceneImage: gardeningScene
    },
    disabled: true,
    disabledDescription:
      'My people can be very distrustful of outsiders. You will have to gain their confidence before they show you to the most bountiful gardens in the valley.'
  },
  [QuestKeys.MINING_0]: {
    title: 'Mining Quests',
    profession: Professions.MINING,
    hmnAddress: ZERO_ONE_ADDRESS,
    htnAddress: ZERO_ONE_ADDRESS,
    type: QuestType.TimeBased,
    level: 0,
    duration: 20,
    baseStaminaCost: 7,
    proficientStaminaCost: 5,
    proficiencyType: Professions.MINING,
    minHeroes: 1,
    maxHeroes: 1,
    tooltipText:
      '<p><strong>The Wishing Well</strong> is a Quest that can be undertaken by any Hero of any level and any main profession. The Hero may expend 5 Stamina per attempt and has a chance to receive Gaia’s Tears and a variable amount of experience on each attempt. The maximum number of attempts defaults to the highest possible number based on the available Stamina of the selected Heroes, and the time requirement shown will increase as multiple Heroes and multiple attempts are selected.</p>',
    rewardsDialogueMap: {
      noRewardMessage:
        'Just trash and litter, huh? Well, at least we cleaned up the forest a little bit. When will people learn to be more respectful of the environment?',
      questFailedMessage:
        'I’m glad I found you out here before the wild animals did. Dusk is approaching and the forest can be unforgiving. Don’t worry though, there’s always tomorrow.',
      tearsComboMessage:
        'Oh, look at the shimmering! Gaia’s love is still impacting the world today. Heroes coming from the Portal! I still remember the dark days before...',
      runesComboMessage:
        'Oh, and you found a special rock, too! I hear these are very useful, but I never cared much for the minerals, myself. It’s the living things I like!',
      tearsOrRunesOnlyMessage: 'No plants, but you found something even better!',
      eggMessage:
        'Ah, you found yourself an egg! Soon enough, you’ll be able to hatch that. I wonder what forest creature will appear? I’m hoping for a snake, myself.'
    },
    prompts: ['Mining is hard work in dangerous conditions, but the rewards are well worth it!'],
    npc: {
      name: 'Quarrysmith Gren',

      description:
        'The tunnels run deep in Hollowberry Mines. Careful you mind your path or you’ll be lost in the dark for good.',
      title: 'Mining Quests',
      npcImage: miningNPC,
      sceneImage: miningScene
    },
    disabled: true,
    disabledDescription:
      'The Hollowberry Mines have been closed for months now after the south tunnel collapsed. We have men working day and night to open it back up.'
  },
  [QuestKeys.WISHING_WELL_0]: {
    title: 'Wishing Well',
    profession: Professions.WISHING_WELL,
    hmnAddress: '0x0548214A0760a897aF53656F4b69DbAD688D8f29',
    htnAddress: '0x7f1da8b8F43986a655eb05bbd139b763BDE8B135',
    type: QuestType.AttemptBased,
    level: 0,
    duration: 20,
    baseStaminaCost: 5,
    proficientStaminaCost: 5,
    minHeroes: 1,
    maxHeroes: 6,
    tooltipText:
      '<p><strong>The Wishing Well</strong> is a Quest that can be undertaken by Heroes of any level and any main profession. The Hero may expend 5 Stamina per attempt and has a chance to receive Gaia’s Tears and a variable amount of experience on each attempt. The maximum number of attempts defaults to the highest possible number based on the available Stamina of the selected Heroes, and the time requirement shown will increase as multiple Heroes and multiple attempts are selected.</p>',
    rewardsDialogueMap: undefined,
    prompts: ['The Wishing Well grants at least 1 XP per quest, plus offers a chance to get Tears'],
    npc: {
      name: 'Wishing Well',
      description:
        'It is said that the sparkling waters of this well hold a magical connection to Gaia’s will. At times, her Tears spring forth from the depths, and Heroes who commune here slowly grow in power...',
      title: 'Wishing Well',
      npcImage: undefined,
      sceneImage: undefined
    },
    baseOnly: true
  }
}

export function getQuestAddressFromKey(questKey: QuestKeys, chainId: ChainId | undefined) {
  return getAddressFromKey(questMap, questKey, chainId)
}

export function getQuestFromAddress(address: string, chainId: ChainId | undefined) {
  return getObjectFromAddress<QuestMap, Quest>(address, chainId, questMap)
}
