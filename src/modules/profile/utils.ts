import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

export const getAvatarName = (avatar?: Profile['avatars'][0]): { name: string; lastPart?: string } => {
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
