import { createAction } from '@reduxjs/toolkit'
import { Item } from '@dcl/schemas'

export const fetchItemsRequest = createAction<string[]>('[Request] Fetch Items')
export const fetchItemsSuccess = createAction<Item[]>('[Success] Fetch Items')
export const fetchItemsFailure = createAction<string>('[Failure] Fetch Items')

export type FetchItemsRequestAction = ReturnType<typeof fetchItemsRequest>
export type FetchItemsSuccessAction = ReturnType<typeof fetchItemsSuccess>
export type FetchItemsFailureAction = ReturnType<typeof fetchItemsFailure>
