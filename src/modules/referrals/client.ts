import { BaseClient, BaseClientConfig } from 'decentraland-dapps/dist/lib/BaseClient'
import { ReferralProgressResponse } from './types'

export class ReferralsClient extends BaseClient {
  constructor(baseUrl: string, config?: BaseClientConfig) {
    super(baseUrl, config)
  }

  async getReferralProgress(): Promise<ReferralProgressResponse> {
    return this.fetch<ReferralProgressResponse>('/v1/referral-progress')
  }

  async setReferralEmail(email: string): Promise<void> {
    return this.fetch<void>('/v1/referral-email', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }
}
