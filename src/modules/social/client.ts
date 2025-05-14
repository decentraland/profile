import { AuthIdentity } from '@dcl/crypto'
import { createSocialClientV2 } from '@dcl/social-rpc-client'
import { config } from '../config'
import { SocialClient } from './types'

const SOCIAL_RPC_URL = config.get('SOCIAL_RPC_URL')

// Social client singleton
let socialClient: SocialClient

export const initiateSocialClient = async (identity: AuthIdentity): Promise<SocialClient> => {
  socialClient = await createSocialClientV2(SOCIAL_RPC_URL, identity)
  return socialClient
}

export const getClient = (): SocialClient => {
  if (!socialClient) {
    throw new Error('Social client not initialized')
  }
  return socialClient
}

export const getFriends = async (): Promise<string[]> => {
  const allFriends: string[] = []

  while (true) {
    const { friends, paginationData } = await getClient().getFriends({
      limit: 50,
      offset: 0
    })
  }
  data.forEach(user => friends.push(user.address))
  // for await (const users of getClient().getFriends()) {
  //   users.forEach(user => friends.push(user.address))
  // }
  return friends
}

export const getMutualFriends = async (address: string): Promise<string[]> => {
  const friends: string[] = []
  for await (const users of getClient().getMutualFriends(address)) {
    users.forEach(user => friends.push(user.address))
  }
  return friends
}
