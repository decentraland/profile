import { createAction } from '@reduxjs/toolkit'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export const enhancedFetchProfileRequest = createAction<string>('[Request] Enhanced fetch profile')
export const enhancedFetchProfileSuccess = createAction<{ address: string; profile: Profile }>('[Success] Enhanced fetch profile')
export const enhancedFetchProfileFailure = createAction<{ address: string; error: string }>('[Failure] Enhanced fetch profile')

export type EnhancedFetchProfileRequestAction = ReturnType<typeof enhancedFetchProfileRequest>
