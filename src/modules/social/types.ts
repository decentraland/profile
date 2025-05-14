import type { createSocialClientV2 } from '@dcl/social-rpc-client'

export enum FriendshipStatus {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PENDING_RESPONSE = 'pending_response',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FRIEND = 'friend',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PENDING_REQUEST = 'pending_request',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_FRIEND = 'not_friend',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BLOCKED = 'blocked'
}

export type RequestEvent = {
  address: string
  createdAt: number
  message?: string
}

export type SocialClient = Awaited<ReturnType<typeof createSocialClientV2>>
