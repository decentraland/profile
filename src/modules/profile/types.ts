import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Avatar = Profile['avatars'][0]

export type AvatarFacts = Pick<
  Avatar,
  | 'gender'
  | 'country'
  | 'birthdate'
  | 'pronouns'
  | 'relationshipStatus'
  | 'sexualOrientation'
  | 'language'
  | 'employmentStatus'
  | 'profession'
  | 'hobbies'
  | 'realName'
>
