import { AuthIdentity } from '@dcl/crypto'
import { createSocialClientV2 } from '@dcl/social-rpc-client'
import {
  FriendProfile,
  FriendshipRequestResponse
} from '@dcl/social-rpc-client/dist/protobuff-types/decentraland/social_service/v2/social_service_v2.gen'
import { createProfileSocialClient, ProfileSocialClient } from './client'
import { SocialClient } from './types'

// Mock the config module
jest.mock('../config', () => ({
  config: {
    get: jest.fn()
  }
}))

// Mock the social client creation
jest.mock('@dcl/social-rpc-client', () => ({
  createSocialClientV2: jest.fn()
}))

// const mockConfig = config as jest.Mocked<typeof config>
const mockCreateSocialClientV2 = createSocialClientV2 as jest.MockedFunction<typeof createSocialClientV2>

let mockSocialClient: jest.Mocked<SocialClient>
let mockIdentity: AuthIdentity
let profileSocialClient: ProfileSocialClient

beforeEach(() => {
  jest.clearAllMocks()

  // mockConfig.get.mockReturnValue('https://social-rpc.test.com')
  mockIdentity = {} as AuthIdentity

  // Create a mock social client with minimal required methods
  mockSocialClient = {
    connect: jest.fn(),
    getFriends: jest.fn(),
    getMutualFriends: jest.fn(),
    getPendingFriendshipRequests: jest.fn(),
    getSentFriendshipRequests: jest.fn()
  } as unknown as jest.Mocked<SocialClient>

  mockCreateSocialClientV2.mockReturnValue(mockSocialClient)
  profileSocialClient = createProfileSocialClient()
})

describe('when fetching friends', () => {
  beforeEach(() => {
    profileSocialClient.connect(mockIdentity)
  })

  describe('and the user has no friends', () => {
    beforeEach(() => {
      mockSocialClient.getFriends.mockResolvedValue({
        friends: [],
        paginationData: { total: 0, page: 1 }
      })
    })

    it('should resolve with an empty array', async () => {
      const result = await profileSocialClient.getFriends()

      expect(result).toEqual([])
      expect(mockSocialClient.getFriends).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there is a single page of friends', () => {
    let friends: FriendProfile[]

    beforeEach(() => {
      friends = [
        { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
        { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]

      mockSocialClient.getFriends.mockResolvedValue({
        friends,
        paginationData: { total: 2, page: 1 }
      })
    })

    it('should resolve with the friends from the single page', async () => {
      const result = await profileSocialClient.getFriends()

      expect(result).toEqual(friends.map(friend => friend.address))
      expect(mockSocialClient.getFriends).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there are multiple pages of friends', () => {
    let fstFriends: FriendProfile[]
    let sndFriends: FriendProfile[]

    beforeEach(() => {
      fstFriends = [
        { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
        { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]
      sndFriends = [
        { address: '0x3', name: 'Friend 3', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]

      mockSocialClient.getFriends
        .mockResolvedValueOnce({
          friends: fstFriends,
          paginationData: { total: 3, page: 1 }
        })
        .mockResolvedValueOnce({
          friends: sndFriends,
          paginationData: { total: 3, page: 2 }
        })
    })

    it('should resolve with all friends from the paginated responses', async () => {
      const result = await profileSocialClient.getFriends()

      expect(result).toEqual([...fstFriends.map(friend => friend.address), ...sndFriends.map(friend => friend.address)])
      expect(mockSocialClient.getFriends).toHaveBeenCalledTimes(2)
      expect(mockSocialClient.getFriends).toHaveBeenNthCalledWith(1, {
        limit: 30,
        offset: 0
      })
      expect(mockSocialClient.getFriends).toHaveBeenNthCalledWith(2, {
        limit: 30,
        offset: 30
      })
    })
  })
})

describe('when fetching mutual friends', () => {
  const testAddress = '0x123'

  beforeEach(() => {
    profileSocialClient.connect(mockIdentity)
  })

  describe('and the user has no mutual friends', () => {
    beforeEach(() => {
      mockSocialClient.getMutualFriends.mockResolvedValue({
        friends: [],
        paginationData: { total: 0, page: 1 }
      })
    })

    it('should resolve with an empty array', async () => {
      const result = await profileSocialClient.getMutualFriends(testAddress)

      expect(result).toEqual([])
      expect(mockSocialClient.getMutualFriends).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there is a single page of mutual friends', () => {
    let friends: FriendProfile[]

    beforeEach(() => {
      friends = [
        { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
        { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]

      mockSocialClient.getMutualFriends.mockResolvedValue({
        friends,
        paginationData: { total: 2, page: 1 }
      })
    })

    it('should resolve with the mutual friends from the single page', async () => {
      const result = await profileSocialClient.getMutualFriends(testAddress)

      expect(result).toEqual(friends.map(friend => friend.address))
      expect(mockSocialClient.getMutualFriends).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there are multiple pages of mutual friends', () => {
    let fstFriends: FriendProfile[]
    let sndFriends: FriendProfile[]

    beforeEach(() => {
      fstFriends = [
        { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
        { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]
      sndFriends = [
        { address: '0x3', name: 'Friend 3', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' }
      ]

      mockSocialClient.getMutualFriends
        .mockResolvedValueOnce({
          friends: fstFriends,
          paginationData: { total: 3, page: 1 }
        })
        .mockResolvedValueOnce({
          friends: sndFriends,
          paginationData: { total: 3, page: 2 }
        })
    })

    it('should resolve with all mutual friends from the paginated responses', async () => {
      const result = await profileSocialClient.getMutualFriends(testAddress)

      expect(result).toEqual([...fstFriends.map(friend => friend.address), ...sndFriends.map(friend => friend.address)])
      expect(mockSocialClient.getMutualFriends).toHaveBeenCalledTimes(2)
      expect(mockSocialClient.getMutualFriends).toHaveBeenNthCalledWith(1, testAddress, {
        limit: 30,
        offset: 0
      })
      expect(mockSocialClient.getMutualFriends).toHaveBeenNthCalledWith(2, testAddress, {
        limit: 30,
        offset: 30
      })
    })
  })
})

describe('when fetching pending incoming friendship requests', () => {
  beforeEach(() => {
    profileSocialClient.connect(mockIdentity)
  })

  describe('and the user has no pending incoming friendship requests', () => {
    beforeEach(() => {
      mockSocialClient.getPendingFriendshipRequests.mockResolvedValue({
        requests: [],
        paginationData: { total: 0, page: 1 }
      })
    })

    it('should resolve with an empty array', async () => {
      const result = await profileSocialClient.getPendingIncomingFriendshipRequests()

      expect(result).toEqual([])
      expect(mockSocialClient.getPendingFriendshipRequests).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there is a single page of pending incoming friendship requests', () => {
    let requests: FriendshipRequestResponse[]

    beforeEach(() => {
      requests = [
        {
          id: '1',
          friend: { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456789,
          message: 'Hello'
        }
      ]

      mockSocialClient.getPendingFriendshipRequests.mockResolvedValue({
        requests,
        paginationData: { total: 1, page: 1 }
      })
    })

    it('should resolve with the pending incoming friendship requests from the single page', async () => {
      const result = await profileSocialClient.getPendingIncomingFriendshipRequests()

      expect(result).toEqual(requests)
      expect(mockSocialClient.getPendingFriendshipRequests).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there are multiple pages of pending incoming friendship requests', () => {
    let fstRequests: FriendshipRequestResponse[]
    let sndRequests: FriendshipRequestResponse[]

    beforeEach(() => {
      fstRequests = [
        {
          id: '1',
          friend: { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456789,
          message: 'Hello'
        },
        {
          id: '2',
          friend: { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456790,
          message: undefined
        }
      ]
      sndRequests = [
        {
          id: '3',
          friend: { address: '0x3', name: 'Friend 3', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456791,
          message: 'Hi there'
        }
      ]

      mockSocialClient.getPendingFriendshipRequests
        .mockResolvedValueOnce({
          requests: fstRequests,
          paginationData: { total: 3, page: 1 }
        })
        .mockResolvedValueOnce({
          requests: sndRequests,
          paginationData: { total: 3, page: 2 }
        })
    })

    it('should resolve with all pending incoming friendship requests from the paginated responses', async () => {
      const result = await profileSocialClient.getPendingIncomingFriendshipRequests()

      expect(result).toEqual([...fstRequests, ...sndRequests])
      expect(mockSocialClient.getPendingFriendshipRequests).toHaveBeenCalledTimes(2)
      expect(mockSocialClient.getPendingFriendshipRequests).toHaveBeenNthCalledWith(1, {
        limit: 30,
        offset: 0
      })
      expect(mockSocialClient.getPendingFriendshipRequests).toHaveBeenNthCalledWith(2, {
        limit: 30,
        offset: 30
      })
    })
  })
})

describe('when fetching pending outgoing friendship requests', () => {
  beforeEach(() => {
    profileSocialClient.connect(mockIdentity)
  })

  describe('and the user has no pending outgoing friendship requests', () => {
    beforeEach(() => {
      mockSocialClient.getSentFriendshipRequests.mockResolvedValue({
        requests: [],
        paginationData: { total: 0, page: 1 }
      })
    })

    it('should resolve with an empty array', async () => {
      const result = await profileSocialClient.getPendingOutgoingFriendshipRequests()

      expect(result).toEqual([])
      expect(mockSocialClient.getSentFriendshipRequests).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there is a single page of pending outgoing friendship requests', () => {
    let requests: FriendshipRequestResponse[]

    beforeEach(() => {
      requests = [
        {
          id: '1',
          friend: { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456789,
          message: 'Hello'
        }
      ]

      mockSocialClient.getSentFriendshipRequests.mockResolvedValue({
        requests,
        paginationData: { total: 1, page: 1 }
      })
    })

    it('should resolve with the pending outgoing friendship requests from the single page', async () => {
      const result = await profileSocialClient.getPendingOutgoingFriendshipRequests()

      expect(result).toEqual(requests)
      expect(mockSocialClient.getSentFriendshipRequests).toHaveBeenCalledTimes(1)
    })
  })

  describe('and there are multiple pages of pending outgoing friendship requests', () => {
    let fstRequests: FriendshipRequestResponse[]
    let sndRequests: FriendshipRequestResponse[]

    beforeEach(() => {
      fstRequests = [
        {
          id: '1',
          friend: { address: '0x1', name: 'Friend 1', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456789,
          message: 'Hello'
        },
        {
          id: '2',
          friend: { address: '0x2', name: 'Friend 2', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456790,
          message: undefined
        }
      ]
      sndRequests = [
        {
          id: '3',
          friend: { address: '0x3', name: 'Friend 3', hasClaimedName: false, profilePictureUrl: 'https://example.com/profile-picture.png' },
          createdAt: 123456791,
          message: 'Hi there'
        }
      ]

      mockSocialClient.getSentFriendshipRequests
        .mockResolvedValueOnce({
          requests: fstRequests,
          paginationData: { total: 3, page: 1 }
        })
        .mockResolvedValueOnce({
          requests: sndRequests,
          paginationData: { total: 3, page: 2 }
        })
    })

    it('should resolve with all pending outgoing friendship requests from the paginated responses', async () => {
      const result = await profileSocialClient.getPendingOutgoingFriendshipRequests()

      expect(result).toEqual([...fstRequests, ...sndRequests])
      expect(mockSocialClient.getSentFriendshipRequests).toHaveBeenCalledTimes(2)
      expect(mockSocialClient.getSentFriendshipRequests).toHaveBeenNthCalledWith(1, {
        limit: 30,
        offset: 0
      })
      expect(mockSocialClient.getSentFriendshipRequests).toHaveBeenNthCalledWith(2, {
        limit: 30,
        offset: 30
      })
    })
  })
})
