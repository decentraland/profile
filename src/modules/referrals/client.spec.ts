import { disableNetConnect } from 'nock'
import { AuthIdentity } from '@dcl/crypto'
import { createTestIdentity } from '../../tests/createTestIdentity'
import { ReferralsClient } from './client'
import { ReferralProgressResponse } from './types'

let client: ReferralsClient
let mockIdentity: AuthIdentity
let referralProgress: ReferralProgressResponse
let mockFetch: jest.Mock

disableNetConnect()

beforeAll(async () => {
  const testIdentity = await createTestIdentity()
  mockIdentity = testIdentity.authChain
})

beforeEach(() => {
  client = new ReferralsClient('https://example.com')
  referralProgress = {
    invitedUsersAccepted: 5,
    invitedUsersAcceptedViewed: 3
  }

  // Setup mock fetch
  mockFetch = jest.fn()
  ;(client as any).fetch = mockFetch
})

describe('when requesting referral progress', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue(referralProgress)
  })

  it('should request the API and return the referral progress', async () => {
    const response = await client.getReferralProgress(mockIdentity)

    expect(mockFetch).toHaveBeenCalledWith('/v1/referral-progress', {
      method: 'GET',
      identity: mockIdentity
    })
    expect(response).toEqual(referralProgress)
  })
})

describe('when the API returns an error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 500'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 500')
  })
})

describe('when the API returns a 404 error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 404'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 404')
  })
})

describe('when the API returns a 400 error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 400'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 400')
  })
})

describe('when the API returns a 503 error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 503'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 503')
  })
})
