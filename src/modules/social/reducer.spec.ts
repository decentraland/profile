import { fetchFriendsFailure, fetchFriendsRequest, fetchFriendsSuccess } from './actions'
import { buildInitialState, SocialState, socialReducer } from './reducer'

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
