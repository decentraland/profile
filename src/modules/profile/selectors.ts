import { createSelector } from '@reduxjs/toolkit'
import { LOAD_PROFILE_REQUEST } from 'decentraland-dapps/dist/modules/profile/actions'
import { getLoading, getProfileOfAddress } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'

export const isLoadingProfile = createSelector([getLoading, (_state, address) => address], (loadingState, address) =>
  loadingState.some(action => action.type === LOAD_PROFILE_REQUEST && action.payload.address === address.toLowerCase())
)

const getBlockedAddressesOfProfile = createSelector(
  [(state, address?: string) => (address ? getProfileOfAddress(state, address) : null)],
  profile => profile?.avatars[0]?.blocked?.map(address => address.toLowerCase()) ?? []
)

// TODO: should we check that the logged user is not blocked by themselves?
export const isBlockedByLoggedUser = createSelector(
  [(_state, profileAddress: string) => profileAddress.toLowerCase(), state => getBlockedAddressesOfProfile(state, getAddress(state))],
  (addressFromPath, blockedAddresses) => {
    return blockedAddresses.includes(addressFromPath.toLowerCase())
  }
)

export const hasBlockedLoggedUser = createSelector(
  [getAddress, (state, profileAddress: string) => getBlockedAddressesOfProfile(state, profileAddress)],
  (loggedAddress, blockedAddresses) => {
    return !!loggedAddress && blockedAddresses.includes(loggedAddress.toLowerCase())
  }
)
