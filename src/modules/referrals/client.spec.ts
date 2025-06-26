import { ReferralsClient } from './client'
import { ReferralProgressResponse } from './types'

let client: ReferralsClient
let referralProgress: ReferralProgressResponse
let mockFetch: jest.Mock

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
    const response = await client.getReferralProgress()

    expect(mockFetch).toHaveBeenCalledWith('/v1/referral-progress')
    expect(response).toEqual(referralProgress)
  })
})

describe('when the API returns an error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 500'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress()).rejects.toThrow('HTTP error! status: 500')
  })
})

describe('when the API returns a 400 error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 400'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress()).rejects.toThrow('HTTP error! status: 400')
  })
})

describe('when the API returns a 503 error', () => {
  beforeEach(() => {
    mockFetch.mockRejectedValue(new Error('HTTP error! status: 503'))
  })

  it('should throw an error with the HTTP status', async () => {
    await expect(client.getReferralProgress()).rejects.toThrow('HTTP error! status: 503')
  })
})

describe('when setting referral email', () => {
  let testEmail: string
  beforeEach(() => {
    testEmail = 'test@example.com'
  })

  describe('and the request is successful', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue(undefined)
    })

    it('should make a POST request to the referral email endpoint', async () => {
      await client.setReferralEmail(testEmail)

      expect(mockFetch).toHaveBeenCalledWith('/v1/referral-email', {
        method: 'POST',
        body: JSON.stringify({ email: testEmail })
      })
    })

    it('should return void when successful', async () => {
      const response = await client.setReferralEmail(testEmail)

      expect(response).toBeUndefined()
    })
  })

  describe('and the request fails with 400 (InvalidRequestError)', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue(new Error('HTTP error! status: 400'))
    })

    it('should throw an error with the HTTP status', async () => {
      await expect(client.setReferralEmail(testEmail)).rejects.toThrow('HTTP error! status: 400')
    })
  })

  describe('and the request fails with 400 (ReferralInvalidInputError)', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue(new Error('HTTP error! status: 400'))
    })

    it('should throw an error with the HTTP status', async () => {
      await expect(client.setReferralEmail(testEmail)).rejects.toThrow('HTTP error! status: 400')
    })
  })

  describe('and the request fails with 500', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue(new Error('HTTP error! status: 500'))
    })

    it('should throw an error with the HTTP status', async () => {
      await expect(client.setReferralEmail(testEmail)).rejects.toThrow('HTTP error! status: 500')
    })
  })

  describe('and the request fails with 503', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue(new Error('HTTP error! status: 503'))
    })

    it('should throw an error with the HTTP status', async () => {
      await expect(client.setReferralEmail(testEmail)).rejects.toThrow('HTTP error! status: 503')
    })
  })

  describe('and the request fails with network error', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValue(new Error('Network error'))
    })

    it('should throw the network error', async () => {
      await expect(client.setReferralEmail(testEmail)).rejects.toThrow('Network error')
    })
  })
})
