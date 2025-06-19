import { disableNetConnect } from 'nock'
import { AuthIdentity } from '@dcl/crypto'
import { signedFetchFactory } from 'decentraland-crypto-fetch'
import { createTestIdentity } from '../../tests/createTestIdentity'
import { ReferralsClient } from './client'
import { ReferralProgressResponse } from './types'

// Mock signedFetch
jest.mock('decentraland-crypto-fetch', () => ({
  signedFetchFactory: jest.fn(() => jest.fn())
}))

let client: ReferralsClient
let mockIdentity: AuthIdentity
let referralProgress: ReferralProgressResponse
let mockSignedFetch: jest.Mock

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

  // Setup mock signedFetch
  mockSignedFetch = jest.fn()
  ;(signedFetchFactory as jest.Mock).mockReturnValue(mockSignedFetch)
})

describe('when requesting referral progress', () => {
  beforeEach(() => {
    mockSignedFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(referralProgress)
    })
  })

  it('should request the API and return the referral progress', async () => {
    const response = await client.getReferralProgress(mockIdentity)

    expect(mockSignedFetch).toHaveBeenCalledWith('https://example.com/referral-progress', { identity: mockIdentity })
    expect(response).toEqual(referralProgress)
  })
})

describe('when the API returns an error', () => {
  beforeEach(() => {
    mockSignedFetch.mockResolvedValue({
      ok: false,
      status: 500
    })
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 500')
  })
})

describe('when the API returns a 404 error', () => {
  beforeEach(() => {
    mockSignedFetch.mockResolvedValue({
      ok: false,
      status: 404
    })
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 404')
  })
})

describe('when the API returns a 400 error', () => {
  beforeEach(() => {
    mockSignedFetch.mockResolvedValue({
      ok: false,
      status: 400
    })
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 400')
  })
})

describe('when the API returns a 503 error', () => {
  beforeEach(() => {
    mockSignedFetch.mockResolvedValue({
      ok: false,
      status: 503
    })
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress(mockIdentity)).rejects.toThrow('HTTP error! status: 503')
  })
})
