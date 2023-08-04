import { SemanticICONS } from 'decentraland-ui'
import { AvatarFacts } from '../../../../modules/profile/types'
import { SpecialFormatByFact } from './AvatarFact.types'

const iconByFact: Record<keyof AvatarFacts, SemanticICONS> = {
  gender: 'transgender',
  country: 'world',
  birthdate: 'birthday cake',
  pronouns: 'circle outline',
  relationshipStatus: 'heart outline',
  sexualOrientation: 'transgender alternate',
  language: 'language',
  employmentStatus: 'suitcase',
  profession: 'briefcase',
  hobbies: 'gamepad',
  realName: 'user outline'
}

export const getFactIcon = (fact: keyof AvatarFacts) => iconByFact[fact]

const specialFormatByFact: SpecialFormatByFact = {
  birthdate: (value: string | number) => new Date(value).toLocaleDateString()
}

export const formatFact = (fact: keyof AvatarFacts, value: string | number) => {
  const specialFormat = specialFormatByFact[fact]
  return specialFormat ? specialFormat(value) : value
}

export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
