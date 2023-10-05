import { createAction } from '@reduxjs/toolkit'
import { NFTOptions, NFTResult } from './types'

export const fetchNFTsRequest = createAction<NFTOptions>('[Request] Fetch NFTs')
export const fetchNFTsSuccess = createAction<{ nfts: NFTResult[]; total: number }>('[Success] Fetch NFTs')
export const fetchNFTsFailure = createAction<string>('[Failure] Fetch NFTs')

export type FetchNFTsRequestAction = ReturnType<typeof fetchNFTsRequest>
export type FetchNFTsSuccessAction = ReturnType<typeof fetchNFTsSuccess>
export type FetchNFTsFailureAction = ReturnType<typeof fetchNFTsFailure>
