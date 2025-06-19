import { AuthIdentity } from '@dcl/crypto'
import { signedFetchFactory } from 'decentraland-crypto-fetch'
import { ReferralProgressResponse } from './types'

export class ReferralsClient {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async getReferralProgress(identity: AuthIdentity): Promise<ReferralProgressResponse> {
    const url = `${this.url}/referral-progress`
    const signedFetch = signedFetchFactory()

    const response = await signedFetch(url, {
      identity
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}
