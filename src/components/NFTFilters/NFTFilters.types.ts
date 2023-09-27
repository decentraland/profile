import { NFTOptions } from "../../modules/nfts/types"

export type Props = {
  filters: Pick<NFTOptions, 'category' | 'itemRarities'>
  onChange: (filters: NFTOptions) => void
}
