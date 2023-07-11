import { Avatar } from '@dcl/schemas'

export const getAvatarName = (avatar?: Avatar): { name: string; lastPart?: string } => {
  if (!avatar) {
    return { name: 'Unnamed' }
  }

  if (avatar.hasClaimedName) {
    return { name: avatar.name }
  }

  const lastPart = `#${avatar?.userId.slice(-4)}`
  const name = avatar.name.endsWith(lastPart) ? avatar.name.substring(0, avatar.name.length - lastPart.length) : avatar.name

  return { name: name, lastPart: lastPart }
}
