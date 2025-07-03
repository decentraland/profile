import { createSocialClientV2 } from '@dcl/social-rpc-client'
import { FriendshipRequestResponse } from '@dcl/social-rpc-client/dist/protobuff-types/decentraland/social_service/v2/social_service_v2.gen'
import { config } from '../config'
import { SocialClient } from './types'

const SOCIAL_RPC_URL = config.get('SOCIAL_RPC_URL')
const PAGINATION_LIMIT = 30

export type ProfileSocialClient = Omit<
  SocialClient,
  'getFriends' | 'getMutualFriends' | 'getPendingFriendshipRequests' | 'getSentFriendshipRequests'
> & {
  getFriends: () => Promise<string[]>
  getMutualFriends: (address: string) => Promise<string[]>
  getPendingIncomingFriendshipRequests: () => Promise<FriendshipRequestResponse[]>
  getPendingOutgoingFriendshipRequests: () => Promise<FriendshipRequestResponse[]>
}

export const createProfileSocialClient = (): ProfileSocialClient => {
  const socialClient = createSocialClientV2(SOCIAL_RPC_URL)

  const getFriends = async (): Promise<string[]> => {
    const allFriends: string[] = []

    let offset = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { friends, paginationData } = await socialClient.getFriends({
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

  const getMutualFriends = async (address: string): Promise<string[]> => {
    let offset = 0
    const mutualFriends: string[] = []
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { friends, paginationData } = await socialClient.getMutualFriends(address, {
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

  const getPendingIncomingFriendshipRequests = async (): Promise<FriendshipRequestResponse[]> => {
    let offset = 0
    const pendingFriendshipRequests: FriendshipRequestResponse[] = []

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { requests, paginationData } = await socialClient.getPendingFriendshipRequests({
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

  const getPendingOutgoingFriendshipRequests = async (): Promise<FriendshipRequestResponse[]> => {
    let offset = 0
    const pendingFriendshipRequests: FriendshipRequestResponse[] = []

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { requests, paginationData } = await socialClient.getSentFriendshipRequests({
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

  return {
    ...socialClient,
    getFriends,
    getMutualFriends,
    getPendingIncomingFriendshipRequests,
    getPendingOutgoingFriendshipRequests
  }
}
