import { graphql } from 'decentraland-dapps/dist/lib/graph'
import { MarketplaceGraphClient } from './MarketplaceGraphClient'

jest.mock('decentraland-dapps/dist/lib/graph')

const mockGraphql = graphql as jest.MockedFunction<typeof graphql>

describe('when fetching an ens name owner', () => {
  let url: string
  let name: string

  beforeEach(() => {
    url = 'https://some-graph.com'
    name = 'some-name'
  })

  it('should call the graph providing the ens name as parameter in the query', async () => {
    const client = new MarketplaceGraphClient(url)
    mockGraphql.mockResolvedValueOnce({ nfts: [] })
    await client.fetchENSNameOwner(name)

    expect(mockGraphql).toHaveBeenCalledWith(
      url,
      expect.stringContaining(`name_starts_with_nocase: "${name}", name_ends_with_nocase: "${name}"`)
    )
  })
})
