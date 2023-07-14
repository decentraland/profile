import { createAction } from '@reduxjs/toolkit'
import { World } from './types'

export const fetchWorldsRequest = createAction<string>('[Request] Fetch Worlds')
export const fetchWorldsSuccess = createAction<World[]>('[Success] Fetch Worlds')
export const fetchWorldsFailure = createAction<string>('[Failure] Fetch Worlds')

export type FetchWorldsRequestAction = ReturnType<typeof fetchWorldsRequest>
export type FetchWorldsSuccessAction = ReturnType<typeof fetchWorldsSuccess>
export type FetchWorldsFailureAction = ReturnType<typeof fetchWorldsFailure>
