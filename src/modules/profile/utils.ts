import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Avatar, AvatarFacts } from './types'

export const getAvatarName = (avatar?: Avatar): { name: string; lastPart?: string } => {
  if (!avatar) {
    return { name: t('profile_information.default_name') }
  }

  if (avatar.hasClaimedName) {
    return { name: avatar.name }
  }

  const lastPart = `#${avatar?.userId.slice(-4)}`
  const name = avatar.name.endsWith(lastPart) ? avatar.name.substring(0, avatar.name.length - lastPart.length) : avatar.name

  return { name: name, lastPart: lastPart }
}

export const getAvatarFacts = ({
  gender,
  country,
  birthdate,
  pronouns,
  relationshipStatus,
  sexualOrientation,
  language,
  employmentStatus,
  profession,
  hobbies,
  realName
}: Avatar): AvatarFacts => ({
  gender,
  country,
  birthdate,
  pronouns,
  relationshipStatus,
  sexualOrientation,
  language,
  employmentStatus,
  profession,
  hobbies,
  realName
})

export const hasAboutInformation = (avatar?: Avatar) => {
  if (!avatar) return false

  const { description, links } = avatar
  return !!(description || Object.values(getAvatarFacts(avatar)).some(fact => !!fact) || links?.some(link => !!link.url))
}
