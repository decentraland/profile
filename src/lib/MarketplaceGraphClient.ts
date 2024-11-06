import { graphql } from 'decentraland-dapps/dist/lib/graph'

const BATCH_SIZE = 1000

const getSubdomainByNameQuery = (name: string) => `{
    nfts(where:{ name_starts_with_nocase: "${name}", name_ends_with_nocase: "${name}" }) {
      owner {
        address
      }
    }
}`

const getSubdomainQuery = (owner: string, offset: number) => `{
    nfts(first: ${BATCH_SIZE}, skip: ${offset}, where: { owner_: { address:"${owner}" }, category: ens }) {
      ens {
        subdomain
      }
    }
}`

type SubdomainByNameQueryResult = {
  nfts: SubdomainOwner[]
}

type SubdomainOwner = {
  owner: {
    address: string
  }
}

type SubdomainTuple = {
  ens: {
    subdomain: string[]
  }
}

type SubdomainQueryResult = {
  nfts: SubdomainTuple[]
}

export class MarketplaceGraphClient {
  constructor(private readonly _graphUrl: string) {}

  fetchENSNameOwner = async (name: string): Promise<string | null> => {
    const { nfts } = await graphql<SubdomainByNameQueryResult>(this._graphUrl, getSubdomainByNameQuery(name))
    return nfts[0]?.owner.address ?? null
  }

  fetchENSList = async (address: string | undefined): Promise<string[]> => {
    if (!address) {
      return []
    }

    const owner: string = address.toLowerCase()
    let results: string[] = []
    let page: string[] = []
    let offset = 0
    let nextPage = true

    while (nextPage) {
      const { nfts } = await graphql<SubdomainQueryResult>(this._graphUrl, getSubdomainQuery(owner, offset))

      page = nfts.map(ntf => ntf.ens.subdomain.toString())
      results = [...results, ...page]
      if (page.length === BATCH_SIZE) {
        offset += BATCH_SIZE
      } else {
        nextPage = false
      }
    }
    return results
  }
}
