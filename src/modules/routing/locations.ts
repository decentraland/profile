import { Env } from '@dcl/ui-env'
import { config } from '../config'
import { World } from '../world/types'

export const locations = {
  root: () => '/',
  account: (address: string) => `/accounts/${address}`,
  signIn: (redirectTo?: string) => {
    return `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
  }
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
