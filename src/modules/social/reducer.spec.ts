import {
  acceptFriendshipFailure,
  acceptFriendshipRequest,
  acceptFriendshipSuccess,
  fetchFriendRequestsEventsFailure,
  fetchFriendRequestsEventsRequest,
  fetchFriendRequestsEventsSuccess,
  fetchFriendsFailure,
  fetchFriendsRequest,
  fetchFriendsSuccess,
  initializeSocialClientFailure,
  initializeSocialClientRequest,
  initializeSocialClientSuccess,
  rejectFriendshipFailure,
  rejectFriendshipRequest,
  rejectFriendshipSuccess
} from './actions'
import { buildInitialState, SocialState, socialReducer } from './reducer'
import { RequestEvent } from './types'

let state: SocialState

beforeEach(() => {
  state = buildInitialState()
})

describe('when reducing the request action to fetch friends', () => {
  beforeEach(() => {
    state.data.friends = ['0x1']
  })

  it('should return a state with the error nulled, the loading state set and the friends cleared', () => {
    expect(socialReducer(state, fetchFriendsRequest())).toEqual({
      ...state,
      loading: [fetchFriendsRequest()],
      error: null,
      data: { ...state.data, friends: [] }
    })
  })
})

describe('when reducing the success action to fetch friends', () => {
  beforeEach(() => {
    state.loading = [fetchFriendsRequest()]
  })

  it('should return a state with the friends set and the loading state cleared', () => {
    expect(socialReducer(state, fetchFriendsSuccess(['0x1', '0x2']))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        friends: ['0x1', '0x2']
      }
    })
  })
})

describe('when reducing the failure action to fetch friends', () => {
  beforeEach(() => {
    state.loading = [fetchFriendsRequest()]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(socialReducer(state, fetchFriendsFailure('anErrorMessage'))).toEqual({
      ...state,
      loading: [],
      error: 'anErrorMessage'
    })
  })
})

describe('when reducing the request action to fetch friend request events', () => {
  beforeEach(() => {
    state.error = 'anError'
  })

  it('should return a state with the error nulled, the loading state set and the friends cleared', () => {
    expect(socialReducer(state, fetchFriendRequestsEventsRequest())).toEqual({
      ...state,
      loading: [fetchFriendRequestsEventsRequest()],
      error: null
    })
  })
})

describe('when reducing the success action to fetch friend request events', () => {
  let incoming: RequestEvent[]
  let outgoing: RequestEvent[]

  beforeEach(() => {
    state.loading = [fetchFriendRequestsEventsRequest()]
    incoming = [
      {
        address: 'anAddress',
        createdAt: Date.now()
      }
    ]
    outgoing = [
      {
        address: 'anotherAddress',
        createdAt: Date.now()
      }
    ]
  })

  it('should return a state with the friend request set and the loading state cleared', () => {
    expect(socialReducer(state, fetchFriendRequestsEventsSuccess({ incoming, outgoing }))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        events: {
          incoming: {
            [incoming[0].address]: incoming[0]
          },
          outgoing: {
            [outgoing[0].address]: outgoing[0]
          }
        }
      }
    })
  })
})

describe('when reducing the failure action to fetch friend request events', () => {
  beforeEach(() => {
    state.loading = [fetchFriendRequestsEventsRequest()]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(socialReducer(state, fetchFriendRequestsEventsFailure('anErrorMessage'))).toEqual({
      ...state,
      loading: [],
      error: 'anErrorMessage'
    })
  })
})

describe('when reducing the request action to initialize the social client', () => {
  beforeEach(() => {
    state.error = 'anError'
  })

  it('should return a state with the error nulled and the loading state set', () => {
    expect(socialReducer(state, initializeSocialClientRequest())).toEqual({
      ...state,
      loading: [initializeSocialClientRequest()],
      error: null
    })
  })
})

describe('when reducing the success action to initialize the social client', () => {
  beforeEach(() => {
    state.loading = [initializeSocialClientRequest()]
  })

  it('should return a state with the initialized flag set and the loading state cleared', () => {
    expect(socialReducer(state, initializeSocialClientSuccess())).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        initialized: true
      }
    })
  })
})

describe('when reducing the failure action to initialize the social client', () => {
  beforeEach(() => {
    state.loading = [initializeSocialClientRequest()]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(socialReducer(state, initializeSocialClientFailure('anError'))).toEqual({
      ...state,
      loading: [],
      error: 'anError'
    })
  })
})

describe('when reducing the request action of accepting a friend', () => {
  beforeEach(() => {
    state.error = 'anError'
  })

  it('should return a state with the error nulled and the loading state set', () => {
    expect(socialReducer(state, acceptFriendshipRequest('anAddress'))).toEqual({
      ...state,
      loading: [acceptFriendshipRequest('anAddress')],
      error: null
    })
  })
})

describe('when reducing the success action of accepting a friend', () => {
  beforeEach(() => {
    state.loading = [acceptFriendshipRequest('anAddress')]
  })

  it('should return a state with the new friend added to the friends list, the request removed and the loading state cleared', () => {
    expect(socialReducer(state, acceptFriendshipSuccess('anAddress'))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        friends: [...state.data.friends, 'anAddress'],
        events: {
          ...state.data.events,
          incoming: {
            ...state.data.events.incoming,
            anAddress: undefined
          }
        }
      }
    })
  })
})

describe('when reducing the failure action of accepting a friend', () => {
  beforeEach(() => {
    state.loading = [acceptFriendshipRequest('anAddress')]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(socialReducer(state, acceptFriendshipFailure('anError'))).toEqual({
      ...state,
      loading: [],
      error: 'anError'
    })
  })
})

describe('when reducing the request action of rejecting a friend', () => {
  beforeEach(() => {
    state.error = 'anError'
  })

  it('should return a state with the error nulled and the loading state set', () => {
    expect(socialReducer(state, rejectFriendshipRequest('anAddress'))).toEqual({
      ...state,
      loading: [rejectFriendshipRequest('anAddress')],
      error: null
    })
  })
})

describe('when reducing the success action of rejecting a friend', () => {
  beforeEach(() => {
    state.loading = [rejectFriendshipRequest('anAddress')]
    state.data.events.incoming = {
      anAddress: {} as RequestEvent
    }
  })

  it('should return a state with the request removed and the loading state cleared', () => {
    expect(socialReducer(state, rejectFriendshipSuccess('anAddress'))).toEqual({
      ...state,
      loading: [],
      data: {
        ...state.data,
        events: {
          ...state.data.events,
          incoming: {}
        }
      }
    })
  })
})

describe('when reducing the failure action of rejecting a friend', () => {
  beforeEach(() => {
    state.loading = [rejectFriendshipRequest('anAddress')]
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(socialReducer(state, rejectFriendshipFailure('anError'))).toEqual({
      ...state,
      loading: [],
      error: 'anError'
    })
  })
})
