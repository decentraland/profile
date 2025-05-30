import { Env } from '@dcl/ui-env'
import { config } from '../config'
import { World } from '../world/types'
import { AccountTabs } from './types'

export const locations = {
  root: () => '/',
  account: (address: string, tab?: AccountTabs) => `/accounts/${address}${tab ? `/${tab}` : ''}`,
  signIn: (redirectTo?: string) => `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  twitter: (title: string, url: string) => `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
}

export const isTabValid = (tab: string | undefined) => {
  return tab === undefined || Object.values(AccountTabs).includes(tab as AccountTabs)
}

export const getJumpToWorldUrl = (world: World) => {
  const EXPLORER_URL = config.get('EXPLORER_URL')
  const WORLDS_CONTENT_SERVER_URL = config.get('WORLDS_CONTENT_SERVER_URL')

  return config.is(Env.DEVELOPMENT)
    ? `${EXPLORER_URL}/?realm=${WORLDS_CONTENT_SERVER_URL}/world/${world.domain}&NETWORK=sepolia`
    : `${EXPLORER_URL}/world/${world.domain}`
}

export const getEditAvatarUrl = () => {
  const EXPLORER_URL = config.get('EXPLORER_URL')
  return `${EXPLORER_URL}?OPEN_AVATAR_EDITOR${config.is(Env.DEVELOPMENT) ? '&NETWORK=sepolia' : ''}`
}

export const getMarketplaceNFTDetailUrl = (contractAddress: string, tokenId: string) => {
  const MARKETPLACE_URL = config.get('MARKETPLACE_URL')
  return `${MARKETPLACE_URL}/contracts/${contractAddress}/tokens/${tokenId}`
}
