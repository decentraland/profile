import { RootState } from '../reducer'
import { fetchFriendRequestsEventsRequest, fetchFriendsRequest } from './actions'
import { buildInitialState } from './reducer'
import {
  getError,
  getFriends,
  getFriendshipStatus,
  getIncomingEvents,
  getOutgoingEvents,
  isLoadingFriendRequestEvents,
  isLoadingFriends
} from './selectors'
import { FriendshipStatus } from './types'

let state: RootState

beforeEach(() => {
  state = {
    social: buildInitialState()
  } as RootState
})

describe('when selecting the friendship status', () => {
  let address: string
  beforeEach(() => {
    address = '0x1'
  })

  describe('and the user is a friend', () => {
    beforeEach(() => {
      state.social.data.friends = [address]
    })

    it('should return the friendship status as friend', () => {
      expect(getFriendshipStatus(state, address)).toBe(FriendshipStatus.FRIEND)
    })
  })

  describe('and the user has requested to be a friend', () => {
    beforeEach(() => {
      state.social.data.events.incoming[address] = {
        address,
        createdAt: Date.now()
      }
    })

    it('should return the friendship status as pending response', () => {
      expect(getFriendshipStatus(state, address)).toBe(FriendshipStatus.PENDING_RESPONSE)
    })
  })

  describe('and the user has been requested to be a friend', () => {
    beforeEach(() => {
      state.social.data.events.outgoing[address] = {
        address,
        createdAt: Date.now()
      }
    })

    it('should return the friendship status as pending request', () => {
      expect(getFriendshipStatus(state, address)).toBe(FriendshipStatus.PENDING_REQUEST)
    })
  })

  describe('and the user is not a friend', () => {
    beforeEach(() => {
      state.social.data.friends = []
    })

    it('should return the friendship status as not friend', () => {
      expect(getFriendshipStatus(state, address)).toBe(FriendshipStatus.NOT_FRIEND)
    })
  })
})

describe('when getting the error from the state', () => {
  beforeEach(() => {
    state.social.error = 'error'
  })

  it('should return the error', () => {
    expect(getError(state)).toBe(state.social.error)
  })
})

describe("when getting the user's friends", () => {
  beforeEach(() => {
    state.social.data.friends = ['0x1', '0x2', '0x3']
  })

  it('should return the friends', () => {
    expect(getFriends(state)).toBe(state.social.data.friends)
  })
})

describe('when getting the incoming events', () => {
  beforeEach(() => {
    state.social.data.events.incoming = {
      anAddress: {
        address: 'anAddress',
        createdAt: Date.now()
      }
    }
  })

  it('should return the incoming events', () => {
    expect(getIncomingEvents(state)).toBe(state.social.data.events.incoming)
  })
})

describe('when getting the outgoing events', () => {
  beforeEach(() => {
    state.social.data.events.outgoing = {
      anAddress: {
        address: 'anAddress',
        createdAt: Date.now()
      }
    }
  })

  it('should return the outgoing events', () => {
    expect(getOutgoingEvents(state)).toBe(state.social.data.events.outgoing)
  })
})

describe('when getting if the friends are being loaded', () => {
  describe('and the friends are not being loaded', () => {
    beforeEach(() => {
      state.social.loading = []
    })

    it('should return false', () => {
      expect(isLoadingFriends(state)).toBe(false)
    })
  })

  describe('and the friends are being loaded', () => {
    beforeEach(() => {
      state.social.loading = [fetchFriendsRequest()]
    })

    it('should return true', () => {
      expect(isLoadingFriends(state)).toBe(true)
    })
  })
})

describe('when getting if the friend requests events are being loaded', () => {
  describe('and the friend requests events are not being loaded', () => {
    beforeEach(() => {
      state.social.loading = []
    })

    it('should return false', () => {
      expect(isLoadingFriendRequestEvents(state)).toBe(false)
    })
  })

  describe('and the friend requests events are being loaded', () => {
    beforeEach(() => {
      state.social.loading = [fetchFriendRequestsEventsRequest()]
    })

    it('should return true', () => {
      expect(isLoadingFriendRequestEvents(state)).toBe(true)
    })
  })
})
