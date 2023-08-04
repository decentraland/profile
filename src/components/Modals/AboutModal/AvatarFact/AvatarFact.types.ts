import { AvatarFacts } from '../../../../modules/profile/types'

export type Props = {
  title: keyof AvatarFacts | 'description'
  value: string | number
}

export type SpecialFormatByFact = {
  [key in keyof AvatarFacts]?: (value: string | number) => React.ReactNode
}
