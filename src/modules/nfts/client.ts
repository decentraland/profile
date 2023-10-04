import { NFTOptions, NFTResult } from './types'
import { buildNftQueryString } from './utils'

export class NFTClient {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async get(options: NFTOptions = {}): Promise<{ data: NFTResult[]; total: number }> {
    const queryParams = buildNftQueryString(options)
    const url = new URL(this.url)
    url.pathname = '/v1/nfts'
    url.search = queryParams.toString()
    const response = await fetch(url.toString())
    return response.json()
  }
}
