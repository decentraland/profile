import { createAction } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas'

export const fetchItemsByUrnRequest = createAction<string[]>('[Request] Fetch Items By Urn')
export const fetchItemsByUrnSuccess = createAction<Item[]>('[Success] Fetch Items By Urn')
export const fetchItemsByUrnFailure = createAction<string>('[Failure] Fetch Items By Urn')

export type FetchItemsByUrnRequestAction = ReturnType<typeof fetchItemsByUrnRequest>
export type FetchItemsByUrnSuccessAction = ReturnType<typeof fetchItemsByUrnSuccess>
export type FetchItemsByUrnFailureAction = ReturnType<typeof fetchItemsByUrnFailure>
