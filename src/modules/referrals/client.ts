import { AuthIdentity } from '@dcl/crypto'
import { BaseClient, BaseClientConfig } from 'decentraland-dapps/dist/lib/BaseClient'
import { ReferralProgressResponse } from './types'

export class ReferralsClient extends BaseClient {
  constructor(baseUrl: string, config?: BaseClientConfig) {
    super(baseUrl, config)
  }

  async getReferralProgress(identity: AuthIdentity): Promise<ReferralProgressResponse> {
    return this.fetch<ReferralProgressResponse>('/v1/referral-progress', {
      method: 'GET',
      identity
    })
  }
}
