import { AuthIdentity } from '@dcl/crypto'
import { createSocialClient } from '@dcl/social-rpc-client'
import { config } from '../config'
import { SocialClient } from './types'

const SYNAPSE_URL = config.get('SYNAPSE_URL')
const SOCIAL_RPC_URL = config.get('SOCIAL_RPC_URL')

// Social client singleton
let socialClient: SocialClient | undefined

export const initiateSocialClient = async (address: string, identity: AuthIdentity): Promise<SocialClient> => {
  socialClient = await createSocialClient(SYNAPSE_URL, SOCIAL_RPC_URL, address.toLowerCase(), identity)
  return socialClient
}

export const getClient = (): SocialClient => {
  if (!socialClient) {
    throw new Error('Social client not initialized')
  }
  return socialClient
}

export const getFriends = async (): Promise<string[]> => {
  const friends: string[] = []
  for await (const users of getClient().getFriends()) {
    users.forEach(user => friends.push(user.address))
  }
  return friends
}

export const getMutualFriends = async (address: string): Promise<string[]> => {
  const friends: string[] = []
  for await (const users of getClient().getMutualFriends(address)) {
    users.forEach(user => friends.push(user.address))
  }
  return friends
}
