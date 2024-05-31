import { createSelector } from '@reduxjs/toolkit'
import { getLoading, getProfileOfAddress, getState } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../reducer'
import { enhancedFetchProfileRequest } from './action'

export const isLoadingProfile = createSelector([getLoading, (_state, address) => address], (loadingState, address) =>
  loadingState.some(action => action.type === enhancedFetchProfileRequest.type && action.payload === address.toLowerCase())
)

export const getProfileWithName = createSelector(
  [getState, (_state, name: string) => name.toLowerCase()],
  (state, name) =>
    Object.entries(state.data).find(
      ([_address, profile]) => profile.avatars[0]?.hasClaimedName && profile.avatars[0]?.name.toLowerCase() === name
    )?.[1]
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

export const getErrorLoadingProfile = (state: RootState, address: string) => state.profile.enhancedProfileFetchErrors[address] ?? null
