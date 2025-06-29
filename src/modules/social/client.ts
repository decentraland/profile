import { AuthIdentity } from '@dcl/crypto'
import { createSocialClientV2 } from '@dcl/social-rpc-client'
import { FriendshipRequestResponse } from '@dcl/social-rpc-client/dist/protobuff-types/decentraland/social_service/v2/social_service_v2.gen'
import { config } from '../config'
import { SocialClient } from './types'

const SOCIAL_RPC_URL = config.get('SOCIAL_RPC_URL')
const PAGINATION_LIMIT = 30

// Social client singleton
let socialClient: SocialClient

export const initiateSocialClient = async (identity: AuthIdentity): Promise<SocialClient> => {
  socialClient = await createSocialClientV2(SOCIAL_RPC_URL, identity)
  await socialClient.connect()
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

  let offset = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { friends, paginationData } = await getClient().getFriends({
      limit: PAGINATION_LIMIT,
      offset
    })
    friends.forEach(user => allFriends.push(user.address))

    if (paginationData?.total === allFriends.length || !friends.length) {
      break
    }
    offset += PAGINATION_LIMIT
  }

  return allFriends
}

export const getMutualFriends = async (address: string): Promise<string[]> => {
  let offset = 0
  const mutualFriends: string[] = []
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { friends, paginationData } = await getClient().getMutualFriends(address, {
      limit: PAGINATION_LIMIT,
      offset
    })
    friends.forEach(user => mutualFriends.push(user.address))

    if (paginationData?.total === mutualFriends.length || !friends.length) {
      break
    }
    offset += PAGINATION_LIMIT
  }

  return mutualFriends
}

export const getPendingIncomingFriendshipRequests = async (): Promise<FriendshipRequestResponse[]> => {
  let offset = 0
  const pendingFriendshipRequests: FriendshipRequestResponse[] = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { requests, paginationData } = await getClient().getPendingFriendshipRequests({
      limit: PAGINATION_LIMIT,
      offset
    })
    requests.forEach(request => pendingFriendshipRequests.push(request))
    if (paginationData?.total === pendingFriendshipRequests.length || !requests?.length) {
      break
    }
    offset += PAGINATION_LIMIT
  }

  return pendingFriendshipRequests
}

export const getPendingOutgoingFriendshipRequests = async (): Promise<FriendshipRequestResponse[]> => {
  let offset = 0
  const pendingFriendshipRequests: FriendshipRequestResponse[] = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { requests, paginationData } = await getClient().getPendingFriendshipRequests({
      limit: PAGINATION_LIMIT,
      offset
    })
    requests.forEach(request => pendingFriendshipRequests.push(request))

    if (paginationData?.total === pendingFriendshipRequests.length || !requests.length) {
      break
    }
    offset += PAGINATION_LIMIT
  }

  return pendingFriendshipRequests
}
