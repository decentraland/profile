import { loadProfileFailure, loadProfileRequest, loadProfileSuccess } from 'decentraland-dapps/dist/modules/profile/actions'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'
import { enhancedFetchProfileFailure, enhancedFetchProfileRequest, enhancedFetchProfileSuccess } from './action'
import { buildInitialState, profileReducer } from './reducer'
import { ProfileState } from './types'

let state: ProfileState
let initialState: ProfileState
let address: string

beforeEach(() => {
  state = buildInitialState()
  address = '0x0'
})

describe('when reducing the enhanced fetch profile request action', () => {
  beforeEach(() => {
    initialState = { ...state, enhancedProfileFetchErrors: { [address]: 'anError' } }
  })

  it('should return a state with the loading state set and the error cleared', () => {
    expect(profileReducer(initialState, enhancedFetchProfileRequest(address))).toEqual({
      ...state,
      loading: [enhancedFetchProfileRequest(address)],
      enhancedProfileFetchErrors: {}
    })
  })
})

describe('when reducing the enhanced fetch profile success action', () => {
  let profile: Profile

  beforeEach(() => {
    initialState = { ...state, loading: [enhancedFetchProfileRequest(address)] }
    profile = { avatars: [] }
  })

  it('should return a state with the profile set and the loading state cleared', () => {
    expect(profileReducer(initialState, enhancedFetchProfileSuccess({ address, profile }))).toEqual({
      ...state,
      data: { [address]: profile },
      loading: [],
      enhancedProfileFetchErrors: {}
    })
  })
})

describe('when reducing the enhanced fetch profile failure action', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [enhancedFetchProfileRequest(address)] }
    error = 'anError'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(profileReducer(initialState, enhancedFetchProfileFailure({ address, error }))).toEqual({
      ...state,
      loading: [],
      enhancedProfileFetchErrors: { [address]: error }
    })
  })
})

describe('when reducing the request action to load a profile', () => {
  it('should return a state with the loading state set', () => {
    expect(profileReducer(state, loadProfileRequest(address))).toEqual({
      ...state,
      loading: [loadProfileRequest(address)]
    })
  })
})

describe('when reducing the success action to load a profile', () => {
  let profile: Profile

  beforeEach(() => {
    initialState = { ...state, loading: [loadProfileRequest(address)] }
    profile = { avatars: [] }
  })

  it('should return a state with the profile set and the loading state cleared', () => {
    expect(profileReducer(state, loadProfileSuccess(address, profile))).toEqual({
      ...state,
      data: { [address]: profile },
      loading: []
    })
  })
})

describe('when reducing the failure action to load a profile', () => {
  let error: string

  beforeEach(() => {
    initialState = { ...state, loading: [loadProfileRequest(address)] }
    error = 'anError'
  })

  it('should return a state with the error set and the loading state cleared', () => {
    expect(profileReducer(initialState, loadProfileFailure(address, error))).toEqual({
      ...state,
      loading: [],
      error
    })
  })
})
