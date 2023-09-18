import { createAction } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas'
import { CreationsFetchOptions } from './types'

export const fetchItemsByUrnRequest = createAction<string[]>('[Request] Fetch Items By Urn')
export const fetchItemsByUrnSuccess = createAction<Item[]>('[Success] Fetch Items By Urn')
export const fetchItemsByUrnFailure = createAction<string>('[Failure] Fetch Items By Urn')

export type FetchItemsByUrnRequestAction = ReturnType<typeof fetchItemsByUrnRequest>
export type FetchItemsByUrnSuccessAction = ReturnType<typeof fetchItemsByUrnSuccess>
export type FetchItemsByUrnFailureAction = ReturnType<typeof fetchItemsByUrnFailure>

export const fetchCreationsRequest = createAction<CreationsFetchOptions>('[Request] Fetch Creations')
export const fetchCreationsSuccess = createAction<Item[]>('[Success] Fetch Creations')
export const fetchCreationsFailure = createAction<string>('[Failure] Fetch Creations')

export type FetchCreationsRequestAction = ReturnType<typeof fetchCreationsRequest>
export type FetchCreationsSuccessAction = ReturnType<typeof fetchCreationsSuccess>
export type FetchCreationsFailureAction = ReturnType<typeof fetchCreationsFailure>
